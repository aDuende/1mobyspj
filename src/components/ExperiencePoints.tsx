import React, { useState, useRef, useEffect } from "react";
import { Star, AudioLines } from "lucide-react";
import { motion } from "framer-motion";

interface ExperiencePointsProps {
  points: number;
}

const ExperiencePoints: React.FC<ExperiencePointsProps> = ({ points }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
            <AudioLines className="w-[18px] h-[18px] text-gray-900 dark:text-white" />
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
        onClick={() => setIsOpen(!isOpen)}
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
          absolute top-full right-0 mt-3 w-56 
          bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-1.5 z-50 
          transition-all duration-300 origin-top-right
          shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]
          ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }
        `}
      >
        <div className="h-32 flex items-center justify-center">
          {/* Box Content */}
        </div>
      </div>
    </div>
  );
};

export default ExperiencePoints;
