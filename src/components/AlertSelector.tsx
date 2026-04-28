import React, { useState } from "react";
import { Bell } from "lucide-react";

const AlertSelector: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative flex items-center justify-center w-11 h-11 rounded-full 
        transition-all duration-300 active:scale-[0.96] cursor-pointer border-transparent group
        bg-transparent hover:bg-white dark:hover:bg-gray-800 
        text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white 
        hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]
      `}
      title="Notifications"
    >
      {/* Icon with Shake Animation */}
      <div className={`relative ${isHovered ? "animate-alert-ring" : ""}`}>
        <Bell className="w-[20px] h-[20px] transition-colors duration-300 group-hover:text-amber-500" />

        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-800" />
      </div>
    </button>
  );
};

export default AlertSelector;
