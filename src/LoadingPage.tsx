import { useEffect, useState } from "react";
import logo from "./assets/1Moby-Logo (white).png";

interface LoadingPageProps {
  onLoadingComplete: () => void;
}

function LoadingPage({ onLoadingComplete }: LoadingPageProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2250);

    const completeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen flex items-center justify-center transition-all duration-800 ease-in-out z-[9999]"
      style={{
        background: `
          linear-gradient(
            135deg,
            #0b78ff 0%,
            #0a5fd6 25%,
            #0b3c9f 50%,
            #1c5fa8 70%,
            #ff932f 90%,
            #ff7a00 100%
          )
        `,
        overflow: 'hidden',
        transform: fadeOut ? 'translateY(-100%)' : 'translateY(0)',
        opacity: fadeOut ? 0 : 1
      }}
    >
      {/* PNG ที่อยู่กับ background */}
      <img
        src="/bg-overlay.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-[1] opacity-100"
      />

      {/* ภาพโผล่ขึ้น */}
      <img
        src="/reveal.webp"
        alt=""
        className={`
          absolute inset-0 w-full h-full object-cover z-[2]
          transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            fadeOut
              ? "opacity-100 blur-0 scale-100 translate-y-0"
              : "opacity-0 blur-md scale-110 translate-y-[80px]"
          }
        `}
      />

      {/* Logo */}
      <div className="flex flex-col items-center space-y-8 relative z-10">
        <div className="animate-pulse">
          <img
            src={logo}
            alt="1Moby Logo"
            className="w-96 h-auto"
            style={{
              filter:
                'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3)) drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2))'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;