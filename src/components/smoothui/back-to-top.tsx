import React, { useState } from "react";

const ArrowUpIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 stroke-white stroke-[2.5px]"
  >
    <path
      d="M12 19V5M5 12L12 5L19 12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BackToTop: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleScrollToTop = () => {
    const scrollOptions: ScrollToOptions = { top: 0, behavior: "smooth" };

    window.scrollTo(scrollOptions);
    document.documentElement.scrollTo(scrollOptions);
    document.body.scrollTo(scrollOptions);

    const scrollableElements = document.querySelectorAll(".overflow-y-auto");
    scrollableElements.forEach((element) => {
      element.scrollTo(scrollOptions);
    });
  };

  return (
    <div
      className="fixed bottom-0 right-0 z-[100] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleScrollToTop}
    >
      {/* Invisible corner trigger */}
      <div className="w-10 h-10 bg-transparent absolute bottom-0 right-0 cursor-pointer z-10" />

      {/* Action button */}
      <button
        type="button"
        aria-label="Scroll to top"
        className={`
          relative flex items-center justify-center
          w-11 h-11 bg-[#ffa400]
          border-t border-l border-white/20
          rounded-tl-[24px] shadow-[0_-10px_40px_-15px_rgba(255,164,0,0.5)]
          transition-all duration-500 ease-out
          ${
            isHovered
              ? "translate-x-0 translate-y-0 opacity-100 scale-100"
              : "translate-x-6 translate-y-6 opacity-0 scale-90"
          }
        `}
      >
        <div className="opacity-100">
          <ArrowUpIcon />
        </div>
      </button>
    </div>
  );
};

export default BackToTop;
