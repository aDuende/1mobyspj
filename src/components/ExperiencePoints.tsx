import React, { useState, useRef, useEffect, useCallback } from "react";
import { Star, AudioLines } from "lucide-react";
import { motion } from "framer-motion";
import { BarVisualizer, type AgentState } from "@/components/ui/bar-visualizer";
import { ShimmeringText } from "@/components/ui/shimmering-text";
import agentAudioSrc from "@/assets/ConteX_Agents.mp3";

// Web Speech API Types
interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    length: number;
    [key: number]: {
      isFinal: boolean;
      [key: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onerror:
    | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void)
    | null;
  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void)
    | null;
}

interface ExperiencePointsProps {
  points: number;
}

const stateLabels: Record<AgentState, string> = {
  connecting: "Connecting",
  initializing: "Initializing",
  listening: "Listening",
  speaking: "Speaking",
  thinking: "Thinking",
};

const STATE_DURATIONS: Record<AgentState, number> = {
  connecting: 1500,
  initializing: 2000,
  listening: 2500,
  thinking: 2500,
  speaking: 0,
};

const stateOrder: AgentState[] = [
  "connecting",
  "initializing",
  "listening",
  "thinking",
  "speaking",
];

const BRAND_COLORS = ["#006BFF", "#FC4C02", "#FFA400"];

const ExperiencePoints: React.FC<ExperiencePointsProps> = ({ points }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [agentState, setAgentState] = useState<AgentState>("connecting");
  const [currentColor, setCurrentColor] = useState("#f97316");
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const stateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const vadFrameRef = useRef<number | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isOpenRef = useRef(false);

  const cleanupAudioRefs = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        //
      }
      recognitionRef.current = null;
    }
    if (stateTimeoutRef.current) {
      clearTimeout(stateTimeoutRef.current);
      stateTimeoutRef.current = null;
    }
    if (vadFrameRef.current) {
      cancelAnimationFrame(vadFrameRef.current);
      vadFrameRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.onended = null;
    }
    // Close AudioContext
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(() => {});
    }
    audioContextRef.current = null;
    mediaStreamRef.current = null;
    // Stop microphone tracks
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }

    audioRef.current = null;
  }, []);

  const createAudioStream = useCallback(() => {
    if (!audioRef.current) return null;
    try {
      const audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(audioRef.current);
      const destination = audioContext.createMediaStreamDestination();
      source.connect(destination);
      source.connect(audioContext.destination);
      audioContextRef.current = audioContext;
      mediaStreamRef.current = destination.stream;
      return destination.stream;
    } catch {
      return null;
    }
  }, []);

  // Voice Activity Detection & Speech Recognition
  const startListeningForVoice = useCallback((onSpeechEnd: () => void) => {
    const w = window as unknown as Record<string, unknown>;
    const SpeechRecognitionConstructor =
      (w.SpeechRecognition as { new (): SpeechRecognition } | undefined) ??
      (w.webkitSpeechRecognition as { new (): SpeechRecognition } | undefined);

    let recognition: SpeechRecognition | null = null;
    let hasFinished = false;

    const finishListening = () => {
      if (hasFinished) return;
      hasFinished = true;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          //
        }
        recognitionRef.current = null;
      }
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((t) => t.stop());
        micStreamRef.current = null;
      }
      onSpeechEnd();
    };

    if (SpeechRecognitionConstructor) {
      recognition = new SpeechRecognitionConstructor();
      if (recognition) {
        recognitionRef.current = recognition;
        recognition.lang = "en-US";
        recognition.continuous = true;
        recognition.interimResults = true;

        const greetings = ["hello", "hi"];

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          if (!isOpenRef.current) return finishListening();

          let interimTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              const text = event.results[i][0].transcript.toLowerCase();
              if (greetings.some((g) => text.includes(g))) {
                finishListening();
                return;
              }
            } else {
              interimTranscript += event.results[i][0].transcript.toLowerCase();
            }
          }
          if (greetings.some((g) => interimTranscript.includes(g))) {
            finishListening();
            return;
          }
        };

        recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
          console.error("Speech recognition error", e);
        };

        try {
          recognition.start();
        } catch {
          //
        }
      }
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((micStream) => {
        if (!isOpenRef.current || hasFinished) {
          micStream.getTracks().forEach((t) => t.stop());
          return;
        }
        micStreamRef.current = micStream;
        setAudioStream(micStream);

        if (!SpeechRecognitionConstructor) {
          const ctx = new AudioContext();
          const micSource = ctx.createMediaStreamSource(micStream);
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 512;
          analyser.smoothingTimeConstant = 0.4;
          micSource.connect(analyser);

          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          let hasSpokeOnce = false;
          let silenceFrames = 0;
          const VOLUME_THRESHOLD = 25;
          const SILENCE_FRAMES_NEEDED = 30;

          const checkVoice = () => {
            if (!isOpenRef.current || hasFinished) {
              ctx.close().catch(() => {});
              return;
            }
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
            const avg = sum / dataArray.length;

            if (avg > VOLUME_THRESHOLD) {
              hasSpokeOnce = true;
              silenceFrames = 0;
            } else if (hasSpokeOnce) {
              silenceFrames++;
            }

            if (hasSpokeOnce && silenceFrames >= SILENCE_FRAMES_NEEDED) {
              ctx.close().catch(() => {});
              finishListening();
              return;
            }

            vadFrameRef.current = requestAnimationFrame(checkVoice);
          };

          vadFrameRef.current = requestAnimationFrame(checkVoice);
        }
      })
      .catch(() => {
        // Mic denied
        if (!isOpenRef.current) return;
        if (!hasFinished) {
          stateTimeoutRef.current = setTimeout(() => {
            if (!isOpenRef.current) return;
            finishListening();
          }, 5000);
        }
      });
  }, []);

  const runStateMachineRef = useRef<(stateIndex: number) => void>(() => {});

  useEffect(() => {
    runStateMachineRef.current = (stateIndex: number) => {
      if (!isOpenRef.current) return;

      const currentState = stateOrder[stateIndex];
      setAgentState(currentState);

      if (currentState === "listening") {
        startListeningForVoice(() => {
          if (!isOpenRef.current) return;
          runStateMachineRef.current(3);
        });
      } else if (currentState === "speaking") {
        if (audioRef.current) {
          if (!mediaStreamRef.current) {
            const stream = createAudioStream();
            if (stream) setAudioStream(stream);
          }

          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});

          audioRef.current.onended = () => {
            if (!isOpenRef.current) return;
            stateTimeoutRef.current = setTimeout(() => {
              if (!isOpenRef.current) return;
              runStateMachineRef.current(2); // Back to listening
            }, 800);
          };
        }
      } else {
        const duration = STATE_DURATIONS[currentState];
        stateTimeoutRef.current = setTimeout(() => {
          if (!isOpenRef.current) return;
          runStateMachineRef.current(stateIndex + 1);
        }, duration);
      }
    };
  }, [createAudioStream, startListeningForVoice]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    isOpenRef.current = isOpen;
    if (!isOpen) {
      cleanupAudioRefs();
      requestAnimationFrame(() => setAudioStream(null));
    }
  }, [isOpen, cleanupAudioRefs]);

  useEffect(() => {
    return () => {
      cleanupAudioRefs();
    };
  }, [cleanupAudioRefs]);

  const handleToggle = useCallback(() => {
    const willOpen = !isOpen;
    setIsOpen(willOpen);
    if (willOpen) {
      setAgentState("connecting");
      const randomColor =
        BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
      setCurrentColor(randomColor);

      const audio = new Audio(agentAudioSrc);
      audio.crossOrigin = "anonymous";

      audio
        .play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
        })
        .catch(() => {});

      audioRef.current = audio;

      isOpenRef.current = true;
      runStateMachineRef.current(0);
    }
  }, [isOpen]);

  const widthTransition = {
    duration: 0.8,
    ease: [0.23, 1, 0.32, 1] as const,
  };

  const flipTransition = {
    duration: isHovered || isOpen ? 0.5 : 0.8,
    delay: isHovered || isOpen ? 0.15 : 0,
    ease:
      isHovered || isOpen
        ? ([0.34, 1.56, 0.64, 1] as const)
        : ([0.23, 1, 0.32, 1] as const),
  };

  const useRealAudio =
    (agentState === "speaking" || agentState === "listening") &&
    audioStream !== null;

  const CapsuleContent = (
    <>
      {/* Icon Wrapper */}
      <div className="relative w-[22px] h-[22px] overflow-hidden rounded-full shrink-0">
        <motion.div
          animate={{
            y: isHovered || isOpen ? -22 : 0.0001,
          }}
          transition={flipTransition}
          className="flex flex-col will-change-transform transform-gpu"
        >
          {/* Coin Icon */}
          <div className="w-[22px] h-[22px] flex items-center justify-center shrink-0">
            <div className="w-[22px] h-[22px] rounded-full bg-linear-to-br from-yellow-300 via-orange-400 to-yellow-500 relative flex items-center justify-center">
              <div className="absolute inset-[1px] rounded-full border border-yellow-200/50 shadow-inner"></div>
              <Star className="w-[13px] h-[13px] text-white fill-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)] relative z-10" />
            </div>
          </div>

          {/* Agents Icon */}
          <div className="w-[22px] h-[22px] relative flex items-center justify-center shrink-0">
            <AudioLines
              className="w-[18px] h-[18px] transition-colors duration-300"
              style={{ color: isOpen ? currentColor : "#08060d" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Text Wrapper */}
      <div className="relative overflow-hidden h-[22px] flex">
        <motion.div
          initial={false}
          animate={{ width: isHovered || isOpen ? 0 : "auto" }}
          transition={widthTransition}
          className="overflow-hidden min-w-0"
        >
          <motion.div
            animate={{ y: isHovered || isOpen ? -22 : 0.0001 }}
            transition={flipTransition}
            className="flex flex-col will-change-transform transform-gpu"
          >
            <div className="h-[22px] flex items-center gap-1 w-max pr-1">
              <span
                className="text-[15px] font-bold text-gray-900 dark:text-white tracking-tight shrink-0 whitespace-nowrap"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                {points.toLocaleString()}
              </span>
              <span
                className="text-[13px] font-medium text-gray-400 dark:text-gray-500 uppercase shrink-0 whitespace-nowrap"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                P
              </span>
            </div>
            <div className="h-[22px]"></div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ width: isHovered || isOpen ? "auto" : 0 }}
          transition={widthTransition}
          className="overflow-hidden min-w-0"
        >
          <motion.div
            animate={{ y: isHovered || isOpen ? -22 : 0.0001 }}
            transition={flipTransition}
            className="flex flex-col will-change-transform transform-gpu"
          >
            <div className="h-[22px]"></div>
            <div className="h-[22px] flex items-center w-max pr-1">
              <span
                className="text-[15px] font-bold text-gray-900 dark:text-white tracking-tight shrink-0 whitespace-nowrap"
                style={{ fontFamily: '"Geometrica", sans-serif' }}
              >
                Agents
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative flex items-center gap-2.5 px-3.5 py-2 rounded-full 
          transition-all duration-300 active:scale-[0.96] cursor-pointer border-transparent
          will-change-transform transform-gpu antialiased
          ${
            isOpen
              ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-xl translate-y-[-1px]"
              : "bg-transparent hover:bg-white dark:hover:bg-gray-800 hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]"
          }
        `}
        style={{ borderRadius: 9999 }}
      >
        {CapsuleContent}
      </button>

      <div
        className={`
          absolute top-full right-0 mt-3 w-[259.5px]
          bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-1.5 z-50 
          transition-all duration-300 origin-top-right overflow-hidden
          shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]
          ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }
        `}
      >
        {/* Visualizer Area */}
        <div className="px-4 pt-3 pb-1">
          <BarVisualizer
            state={agentState}
            barCount={15}
            demo={!useRealAudio}
            mediaStream={useRealAudio ? audioStream : undefined}
            centerAlign={true}
            className="!bg-transparent !h-[83.5px] !rounded-lg !p-0 !gap-[4px]"
            style={
              {
                "--color-primary": currentColor,
                "--color-border": "#f3f4f6",
              } as React.CSSProperties
            }
          />
        </div>

        {/* State Label */}
        <div
          className="flex items-center justify-center pb-2"
          style={{ fontFamily: '"Geometrica", sans-serif' }}
        >
          <ShimmeringText
            key={agentState}
            text={stateLabels[agentState]}
            className="text-[14.27px] font-normal tracking-wide"
            duration={1.5}
            delay={0}
            repeat={true}
            repeatDelay={0.5}
            startOnView={false}
            color="#BBBBBB"
            shimmerColor="#08060d"
          />
        </div>
      </div>
    </div>
  );
};

export default ExperiencePoints;
