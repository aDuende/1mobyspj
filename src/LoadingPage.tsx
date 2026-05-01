import { useEffect, useState } from "react";
import logo from "./assets/1Moby-Logo (white).png";

interface LoadingPageProps {
  onLoadingComplete: () => void;
}

function LoadingPage({ onLoadingComplete }: LoadingPageProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsMounted(true);
    });
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1300);

    const completeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen flex items-center justify-center z-[9999] bg-black"
      style={{
        overflow: "hidden",
        transition: "all 0.7s cubic-bezier(0.3, 0, 0.1, 1)",
        transform: fadeOut ? "translateY(-100%)" : "translateY(0)",
        opacity: fadeOut ? 0.9 : 1,
      }}
    >
      <div
        className="absolute inset-0"
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
          transition: "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: isMounted ? 1 : 0,
        }}
      />

      {/* Background Overlay */}
      <img
        src="/bg-overlay.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-[1]"
        style={{
          transition: "opacity 1.8s ease-in-out",
          opacity: isMounted ? 0.8 : 0,
        }}
      />

      {/* Reveal Image */}
      <img
        src="/reveal.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-[2]"
        style={{
          transition: "all 0.7s cubic-bezier(0.3, 0, 0.1, 1)",
          opacity: fadeOut ? 1 : 0,
          filter: fadeOut ? "blur(0)" : "blur(15px)",
          transform: fadeOut ? "scale(1)" : "scale(1.1)",
        }}
      />

      {/* Logo */}
      <div
        className="flex flex-col items-center space-y-8 relative z-10"
        style={{
          transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: isMounted ? 1 : 0,
          filter: isMounted
            ? fadeOut
              ? "blur(10px) brightness(1.1)"
              : "blur(0) brightness(1)"
            : "blur(5px) brightness(0.2)",
          transform: isMounted ? "scale(1)" : "scale(0.97)",
        }}
      >
        <img
          src={logo}
          alt="1Moby Logo"
          className="w-96 h-auto"
          style={{
            filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.25))",
          }}
        />
      </div>
    </div>
  );
}

export default LoadingPage;
