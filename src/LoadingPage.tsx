import { useEffect, useState } from 'react';
import logo from './assets/1Moby-Logo (white).png';

interface LoadingPageProps {
  onLoadingComplete: () => void;
}

function LoadingPage({ onLoadingComplete }: LoadingPageProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // Complete loading after fade out animation (2.5 seconds total)
    const completeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen flex items-center justify-center transition-all duration-700 ease-in-out"
      style={{
        background: 'linear-gradient(135deg, #006BFF 0%, #006BFF 30%, #1D3A72 45%, #2B5876 60%, #4DA0B0 75%, #24B850 85%, #FFE816 95%, #FF0000 100%)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        transform: fadeOut ? 'translateY(-100%)' : 'translateY(0)',
        opacity: fadeOut ? 0 : 1
      }}
    >
      {/* Diagonal overlay effect */}
      <div 
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '150%',
          height: '200%',
          background: 'linear-gradient(135deg, transparent 0%, transparent 35%, rgba(29, 58, 114, 0.6) 50%, rgba(43, 88, 118, 0.5) 65%, rgba(77, 160, 176, 0.4) 80%, transparent 100%)',
          transform: 'rotate(-15deg)',
          pointerEvents: 'none'
        }}
      />
      
      <div className="flex flex-col items-center space-y-8 relative z-10">
        {/* Logo with pulse animation */}
        <div className="animate-pulse">
          <img
            src={logo}
            alt="1Moby Logo"
            className="w-96 h-auto"
            style={{ 
              fontFamily: 'Geometrica, sans-serif',
              filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3)) drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2))'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
