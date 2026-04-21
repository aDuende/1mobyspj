import { useEffect, useState } from "react";
import logo from "./assets/1Moby-Logo (white).png";

interface LoadingPageProps {
  onLoadingComplete: () => void;
}

function LoadingPage({ onLoadingComplete }: LoadingPageProps) {
  const [hasEntered, setHasEntered] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Reveal from Black
    const entranceTimer = setTimeout(() => {
      setHasEntered(true);
    }, 100);

    // Start the Slide-Up Exit after a showcase delay
    const exitTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2800);

    // Complete transition to main application
    const completeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 3500);

    return () => {
      clearTimeout(entranceTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen flex items-center justify-center transition-all duration-800 ease-in-out z-[9999]"
      style={{
        background: `linear-gradient(135deg, #006BFF 0%, #006BFF 55%, #0047AB 70%, #FC4C02 88%, #FFA400 100%)`,
        transform: fadeOut ? "translateY(-100%)" : "translateY(0%)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
      }}
    >
      {/* Fades out to reveal the vibrant colors */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-[1500ms] ease-in-out pointer-events-none"
        style={{
          opacity: hasEntered ? 0 : 1,
        }}
      />

      {/* Fades in & scales up subtly */}
      <div
        className="flex flex-col items-center space-y-8 relative z-10 transition-all duration-[1200ms] ease-out"
        style={{
          opacity: hasEntered ? 1 : 0,
          transform: hasEntered ? "scale(1)" : "scale(0.95)",
        }}
      >
        <img
          src={logo}
          alt="1Moby Logo"
          className="w-96 h-auto"
          style={{
            filter:
              "drop-shadow(0 6px 10px rgba(0, 0, 0, 0.7)) drop-shadow(0 12px 25px rgba(0, 0, 0, 0.3))",
          }}
        />
      </div>
    </div>
  );
}

export default LoadingPage;
