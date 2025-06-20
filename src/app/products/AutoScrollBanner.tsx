import React, { useEffect, useRef, useState } from 'react';

const AutoScrollBanner: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, size: number, opacity: number, delay: number}>>([]);

  // Generate random stars
  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 150; i++) {
        starArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          delay: Math.random() * 3
        });
      }
      setStars(starArray);
    };
    generateStars();
  }, []);

  // Auto scroll functionality
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const scroll = () => {
      if (scrollElement.scrollLeft >= scrollElement.scrollWidth - scrollElement.clientWidth) {
        scrollElement.scrollLeft = 0;
      } else {
        scrollElement.scrollLeft += 0.5;
      }
    };

    const interval = setInterval(scroll, 25);
    return () => clearInterval(interval);
  }, []);

  const bannerItems = [
    "✨ New Arrivals: Exquisite Diamond Collection",
    "💎 Limited Edition: 50% Off Premium Making Charges",
    "👑 Certified Diamonds & Precious Stones",
    "🚚 Complimentary Shipping on Orders Above ₹5,000",
    "💍 Bespoke Bridal & Wedding Collection",
    "⭐ Award-Winning Craftsmanship Since 1985",
    "🔥 Flash Sale: Up to 70% Off Selected Items",
    "💖 Personalized Jewelry Design Services"
  ];

  return (
    <div className="relative w-full h-16 md:h-20 overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
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
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/40 via-transparent to-blue-950/40" />

      {/* Scrolling Content */}
      <div className="relative z-10 h-full flex items-center">
        <div
          ref={scrollRef}
          className="flex items-center space-x-12 px-4"
          style={{ 
            width: 'max-content',
            scrollBehavior: 'auto'
          }}
        >
          {[...bannerItems, ...bannerItems, ...bannerItems].map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 whitespace-nowrap group"
            >
              <span className="text-white/90 text-sm md:text-lg font-light tracking-wide hover:text-yellow-300 transition-colors duration-300 group-hover:drop-shadow-lg">
                {item}
              </span>
              {index < bannerItems.length * 3 - 1 && (
                <div className="w-1 h-1 bg-yellow-400 rounded-full opacity-60 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Elegant Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
      
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse opacity-30" />
      
      {/* Premium Glow Effect */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-yellow-400/20 blur-xl rounded-full animate-pulse" />
    </div>
  );
};

export default AutoScrollBanner;