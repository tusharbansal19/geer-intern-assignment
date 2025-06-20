import React, { useEffect, useState } from 'react';

const HeroBanner: React.FC = () => {
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, size: number, opacity: number, delay: number}>>([]);

  // Generate random stars
  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 200; i++) {
        starArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.9 + 0.1,
          delay: Math.random() * 4
        });
      }
      setStars(starArray);
    };
    generateStars();
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-1 px-4 max-h-[600px] overflow-hidden">
      {/* Starry Background */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Gradient Overlays for Depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/30 via-transparent to-blue-950/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/20 to-slate-900/40" />

      {/* Premium Glow Effects */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto flex items-center justify-between min-h-[200px]">
        <div className="flex-1 z-10 ml-10">
          <div className="mb-2 ">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                Dangles
              </span>
            </h1>
            <div className="relative">
              <p className="text-3xl md:text-4xl mb-8 font-light tracking-wide">
                Elevate every{' '}
                <span className="italic font-serif bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
                  look
                </span>
              </p>
              {/* Decorative Elements */}
              <div className="absolute -top-2 -left-4 w-8 h-8 border-2 border-yellow-400/30 rounded-full animate-spin" style={{animationDuration: '8s'}} />
              <div className="absolute top-4 right-16 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            </div>
          </div>
          
          <button className="group relative bg-gradient-to-r from-white to-blue-50 text-slate-900 px-10 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            <span className="relative z-10">Shop Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/50 to-blue-400/50 rounded-full blur opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
          </button>
        </div>

        <div className="flex-1 flex justify-end relative z-10">
          <div className="relative">
            {/* Decorative Jewelry Elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 border-2 border-yellow-400/40 rounded-full animate-pulse" />
            <div className="absolute top-12 -right-6 w-8 h-8 bg-gradient-to-r from-yellow-400/60 to-yellow-600/60 rounded-full animate-bounce" style={{animationDelay: '0.5s'}} />
            <div className="absolute bottom-16 -left-12 w-4 h-4 bg-blue-400/80 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
            
            {/* Image Container with Glow */}
            <div className="relative p-8">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 rounded-3xl blur-xl animate-pulse" />
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Diamond Dangles"
                className="relative z-10 max-w-md rounded-2xl shadow-2xl hover:shadow-yellow-400/25 transition-shadow duration-500 transform hover:scale-105"
              />
              {/* Image Glow Border */}
              <div className="absolute inset-4 border-2 border-yellow-400/30 rounded-2xl animate-pulse" style={{animationDelay: '2s'}} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
      
      {/* Floating Particles */}
      <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{animationDelay: '3s'}} />
      <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}} />
      <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: '2.5s'}} />
    </div>
  );
};

export default HeroBanner;