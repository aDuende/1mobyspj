import React, { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";

interface LanguageDropdownProps {
  currentLang: string;
  onLangChange: (lang: string) => void;
}

const LanguageSelector: React.FC<LanguageDropdownProps> = ({
  currentLang,
  onLangChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clickin' outside
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

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2.5 px-4 py-2.5 rounded-full 
          transition-all duration-300 active:scale-[0.96] cursor-pointer
          ${
            isOpen
              ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-xl translate-y-[-1px]"
              : "bg-transparent hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)]"
          }
        `}
      >
        {/* Animated Globe Icon */}
        <div
          className={`flex items-center justify-center transition-transform duration-500 ${
            isOpen ? "rotate-[315deg] scale-110" : "-rotate-45"
          }`}
        >
          <Globe
            className={`w-[20px] h-[20px] ${
              isOpen
                ? "text-orange-600 dark:text-orange-500"
                : "text-gray-600 dark:text-gray-400"
            }`}
          />
        </div>

        {/* Language Text */}
        <span
          className="text-[14px] font-bold tracking-tight w-[24px] text-center"
          style={{ fontFamily: "Geometrica, sans-serif" }}
        >
          {currentLang}
        </span>
      </button>

      <div
        className={`
          absolute top-full right-0 mt-3 w-40 
          bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-1 z-50 
          transition-all duration-300 origin-top-right
          shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]
          ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }
        `}
      >
        <div className="flex flex-col gap-1">
          {[
            { code: "EN", label: "English" },
            { code: "TH", label: "ภาษาไทย" },
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onLangChange(lang.code);
                setIsOpen(false);
              }}
              className={`
                flex items-center gap-3 w-full px-3 py-2 rounded-xl text-[13px] font-bold 
                transition-all duration-200 cursor-pointer
                ${
                  currentLang === lang.code
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-700/60 hover:text-gray-900 dark:hover:text-white"
                }
              `}
              style={{ fontFamily: "Geometrica, sans-serif" }}
            >
              <span className="flex-1 text-left">{lang.label}</span>
              {currentLang === lang.code && (
                <Check className="w-4 h-4 text-orange-600" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
