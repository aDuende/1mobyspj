import React from "react";
import { Star } from "lucide-react";

interface ExperiencePointsProps {
  points: number;
}

const ExperiencePoints: React.FC<ExperiencePointsProps> = ({ points }) => {
  return (
    <div
      className="
        flex items-center gap-2.5 px-3.5 py-2 rounded-full 
        transition-all duration-300 cursor-pointer border border-transparent
        bg-transparent hover:bg-white dark:hover:bg-gray-800 
        hover:border-gray-200/60 dark:hover:border-transparent 
        hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]
        active:scale-[0.96] group
      "
    >
      {/* Gold Coin Icon */}
      <div className="relative flex items-center justify-center">
        <div className="w-[22px] h-[22px] rounded-full bg-linear-to-br from-yellow-300 via-orange-400 to-yellow-500 shadow-[0_0_8px_rgba(245,158,11,0.25)] group-hover:scale-110 transition-transform duration-300">
          <div className="absolute inset-[1px] rounded-full border border-yellow-200/50 shadow-inner"></div>
        </div>
        <Star className="absolute w-[13px] h-[13px] text-white fill-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]" />
      </div>

      {/* Points Text */}
      <div className="flex items-baseline gap-1">
        <span
          className="text-[15px] font-bold text-gray-900 dark:text-white tracking-tight"
          style={{ fontFamily: '"Geometrica", sans-serif' }}
        >
          {points.toLocaleString()}
        </span>
        <span
          className="text-[13px] font-medium text-gray-400 dark:text-gray-500 uppercase"
          style={{ fontFamily: '"Geometrica", sans-serif' }}
        >
          P
        </span>
      </div>
    </div>
  );
};

export default ExperiencePoints;
