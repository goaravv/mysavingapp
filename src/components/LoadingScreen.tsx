import React, { useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2500); // Show for 2.5 seconds

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-md bg-black min-h-screen flex items-center justify-center">
        <div className="animate-pulse-glow">
          {/* Wallet/Card Icon */}
          <div className="relative">
            {/* Back card */}
            <div className="absolute top-2 left-2 w-20 h-14 bg-muted rounded-lg transform rotate-12 animate-fade-in"></div>
            {/* Front card */}
            <div className="relative w-20 h-14 bg-white rounded-lg shadow-lg animate-scale-in">
              {/* Green accent triangle */}
              <div className="absolute top-2 right-2 w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-b-6 border-b-primary"></div>
              {/* Green dot */}
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;