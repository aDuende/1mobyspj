import { useEffect, useMemo, useRef, useState } from "react";

export interface AudioAnalyserOptions {
  fftSize?: number;
  smoothingTimeConstant?: number;
  minDecibels?: number;
  maxDecibels?: number;
}

function createAudioAnalyser(
  mediaStream: MediaStream,
  options: AudioAnalyserOptions = {},
) {
  const audioContext = new (
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext
  )();
  const source = audioContext.createMediaStreamSource(mediaStream);
  const analyser = audioContext.createAnalyser();

  if (options.fftSize) analyser.fftSize = options.fftSize;
  if (options.smoothingTimeConstant !== undefined) {
    analyser.smoothingTimeConstant = options.smoothingTimeConstant;
  }
  if (options.minDecibels !== undefined)
    analyser.minDecibels = options.minDecibels;
  if (options.maxDecibels !== undefined)
    analyser.maxDecibels = options.maxDecibels;

  source.connect(analyser);

  const cleanup = () => {
    source.disconnect();
    audioContext.close();
  };

  return { analyser, audioContext, cleanup };
}

/**
 * Hook for tracking the volume of an audio stream - Web Audio API.
 */
export function useAudioVolume(
  mediaStream?: MediaStream | null,
  options: AudioAnalyserOptions = { fftSize: 32, smoothingTimeConstant: 0 },
) {
  const [volume, setVolume] = useState(0);
  const volumeRef = useRef(0);
  const frameId = useRef<number | undefined>(undefined);

  const memoizedOptions = useMemo(
    () => options,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      options.fftSize,
      options.smoothingTimeConstant,
      options.minDecibels,
      options.maxDecibels,
    ],
  );

  useEffect(() => {
    if (!mediaStream) {
      volumeRef.current = 0;
      requestAnimationFrame(() => setVolume(0));
      return;
    }

    const { analyser, cleanup } = createAudioAnalyser(
      mediaStream,
      memoizedOptions,
    );

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    let lastUpdate = 0;
    const updateInterval = 1000 / 30;

    const updateVolume = (timestamp: number) => {
      if (timestamp - lastUpdate >= updateInterval) {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const a = dataArray[i];
          sum += a * a;
        }
        const newVolume = Math.sqrt(sum / dataArray.length) / 255;

        if (Math.abs(newVolume - volumeRef.current) > 0.01) {
          volumeRef.current = newVolume;
          setVolume(newVolume);
        }
        lastUpdate = timestamp;
      }
      frameId.current = requestAnimationFrame(updateVolume);
    };

    frameId.current = requestAnimationFrame(updateVolume);

    return () => {
      cleanup();
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [mediaStream, memoizedOptions]);

  return volume;
}

export interface MultiBandVolumeOptions {
  bands?: number;
  loPass?: number;
  hiPass?: number;
  updateInterval?: number;
  analyserOptions?: AudioAnalyserOptions;
}

const multibandDefaults: MultiBandVolumeOptions = {
  bands: 5,
  loPass: 100,
  hiPass: 600,
  updateInterval: 32,
  analyserOptions: { fftSize: 2048 },
};

const normalizeDb = (value: number) => {
  if (value === -Infinity) return 0;
  const minDb = -100;
  const maxDb = -10;
  const db = 1 - (Math.max(minDb, Math.min(maxDb, value)) * -1) / 100;
  return Math.sqrt(db);
};

/**
 * Hook for tracking volume
 */
export function useMultibandVolume(
  mediaStream?: MediaStream | null,
  options: MultiBandVolumeOptions = {},
) {
  const opts = useMemo(
    () => ({ ...multibandDefaults, ...options }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      options.bands,
      options.loPass,
      options.hiPass,
      options.updateInterval,
      options.analyserOptions?.fftSize,
      options.analyserOptions?.smoothingTimeConstant,
      options.analyserOptions?.minDecibels,
      options.analyserOptions?.maxDecibels,
    ],
  );

  const [frequencyBands, setFrequencyBands] = useState<number[]>(() =>
    new Array(opts.bands).fill(0),
  );
  const bandsRef = useRef<number[]>(new Array(opts.bands).fill(0));
  const frameId = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!mediaStream) {
      const emptyBands = new Array(opts.bands).fill(0);
      bandsRef.current = emptyBands;
      requestAnimationFrame(() => setFrequencyBands(emptyBands));
      return;
    }

    const { analyser, cleanup } = createAudioAnalyser(
      mediaStream,
      opts.analyserOptions,
    );

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);
    const sliceStart = opts.loPass!;
    const sliceEnd = opts.hiPass!;
    const sliceLength = sliceEnd - sliceStart;
    const chunkSize = Math.ceil(sliceLength / opts.bands!);

    let lastUpdate = 0;
    const updateInterval = opts.updateInterval!;

    const updateVolume = (timestamp: number) => {
      if (timestamp - lastUpdate >= updateInterval) {
        analyser.getFloatFrequencyData(dataArray);

        const chunks = new Array(opts.bands!);

        for (let i = 0; i < opts.bands!; i++) {
          let sum = 0;
          let count = 0;
          const startIdx = sliceStart + i * chunkSize;
          const endIdx = Math.min(sliceStart + (i + 1) * chunkSize, sliceEnd);

          for (let j = startIdx; j < endIdx; j++) {
            sum += normalizeDb(dataArray[j]);
            count++;
          }

          chunks[i] = count > 0 ? sum / count : 0;
        }

        let hasChanged = false;
        for (let i = 0; i < chunks.length; i++) {
          if (Math.abs(chunks[i] - bandsRef.current[i]) > 0.01) {
            hasChanged = true;
            break;
          }
        }

        if (hasChanged) {
          bandsRef.current = chunks;
          setFrequencyBands(chunks);
        }

        lastUpdate = timestamp;
      }

      frameId.current = requestAnimationFrame(updateVolume);
    };

    frameId.current = requestAnimationFrame(updateVolume);

    return () => {
      cleanup();
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [mediaStream, opts]);

  return frequencyBands;
}

export type AnimationState =
  | "connecting"
  | "initializing"
  | "listening"
  | "speaking"
  | "thinking"
  | undefined;

export type AgentState =
  | "connecting"
  | "initializing"
  | "listening"
  | "speaking"
  | "thinking";

export const useBarAnimator = (
  state: AnimationState,
  columns: number,
  interval: number,
): number[] => {
  const indexRef = useRef(0);
  const [currentFrame, setCurrentFrame] = useState<number[]>([]);
  const animationFrameId = useRef<number | null>(null);

  const sequence = useMemo(() => {
    if (state === "thinking" || state === "listening") {
      return generateListeningSequenceBar(columns);
    } else if (state === "connecting" || state === "initializing") {
      return generateConnectingSequenceBar(columns);
    } else if (state === undefined || state === "speaking") {
      return [new Array(columns).fill(0).map((_, idx) => idx)];
    } else {
      return [[]];
    }
  }, [state, columns]);

  useEffect(() => {
    indexRef.current = 0;
    requestAnimationFrame(() => setCurrentFrame(sequence[0] || []));
  }, [sequence]);

  useEffect(() => {
    let startTime = performance.now();

    const animate = (time: DOMHighResTimeStamp) => {
      const timeElapsed = time - startTime;

      if (timeElapsed >= interval) {
        indexRef.current = (indexRef.current + 1) % sequence.length;
        setCurrentFrame(sequence[indexRef.current] || []);
        startTime = time;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [interval, sequence]);

  return currentFrame;
};

const generateConnectingSequenceBar = (columns: number): number[][] => {
  const seq = [];
  for (let x = 0; x < columns; x++) {
    seq.push([x, columns - 1 - x]);
  }
  return seq;
};

const generateListeningSequenceBar = (columns: number): number[][] => {
  const center = Math.floor(columns / 2);
  const noIndex = -1;
  return [[center], [noIndex]];
};
