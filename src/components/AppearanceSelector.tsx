import React from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeSelectorProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const AppearanceSelector: React.FC<ThemeSelectorProps> = ({
  isDarkMode,
  toggleTheme,
}) => {
  return (
    <button
      onClick={toggleTheme}
      className={`
        flex items-center justify-center w-11 h-11 rounded-full 
        transition-all duration-300 active:scale-[0.96] cursor-pointer border-transparent
        bg-transparent hover:bg-white dark:hover:bg-gray-800 
        text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white 
        hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]
      `}
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div
        className={`flex items-center justify-center transition-all duration-500 transform ${
          isDarkMode ? "rotate-[360deg]" : "rotate-0"
        }`}
      >
        {isDarkMode ? (
          <Sun className="w-[20px] h-[20px] text-orange-500" />
        ) : (
          <Moon className="w-[20px] h-[20px] text-gray-600" />
        )}
      </div>
    </button>
  );
};

export default AppearanceSelector;
