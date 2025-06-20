'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Sparkling points component
const SparklingBackground = () => {
  const [points, setPoints] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    const generatePoints = () => {
      const newPoints = Array.from({ length: 200 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        duration: Math.random() * 4 + 2,
      }));
      setPoints(newPoints);
    };

    generatePoints();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {points.map((point) => (
        <div
          key={point.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            width: `${point.size}px`,
            height: `${point.size}px`,
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            opacity: point.opacity,
            animationDuration: `${point.duration}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

// Animated Product Button Component
const AnimatedProductButton = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    router.push('/products');
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-white font-bold py-4 px-12 rounded-full transform transition-all duration-500 hover:scale-110 hover:rotate-1 shadow-2xl hover:shadow-blue-500/50 animate-bounce-slow"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:animate-shimmer"></div>
      
      {/* Pulsing ring effect */}
      <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping group-hover:border-white/50"></div>
      
      {/* Inner glow */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-400/20 to-blue-600/20 blur-sm group-hover:blur-none transition-all duration-300"></div>
      
      {/* Button text with effects */}
      <span className="relative z-10 flex items-center gap-3 text-lg tracking-wide">
        <span className="group-hover:animate-pulse">🚀</span>
        Explore Products
        <span className={`transform transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`}>→</span>
      </span>
      
      {/* Sparkle effects */}
      <div className="absolute top-2 right-4 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-twinkle"></div>
      <div className="absolute bottom-3 left-6 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-twinkle animation-delay-200"></div>
      <div className="absolute top-1/2 left-2 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-twinkle animation-delay-400"></div>
    </button>
  );
};

// Header Component
const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <nav className="bg-navy-900/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="/next.svg"
                alt="Logo"
                width={120}
                height={25}
                className="brightness-0 invert"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#" className="text-white hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">Home</a>
                <a href="#" className="text-white/70 hover:text-white px-3 py-2 text-sm font-medium transition-colors">About</a>
                <a href="#" className="text-white/70 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Services</a>
                <a href="#" className="text-white/70 hover:text-white px-3 py-2 text-sm font-medium transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-navy-900 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Image
              src="/next.svg"
              alt="Logo"
              width={150}
              height={30}
              className="brightness-0 invert mb-4"
            />
            <p className="text-white/70 text-sm leading-relaxed max-w-md">
              Building the future with cutting-edge technology and innovative solutions. 
              Join us on our journey to transform the digital landscape.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Home</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Products</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Services</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">About</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Email: hello@company.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Tech Street</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-white/50 text-sm">
            © 2025 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white relative overflow-hidden">
      {/* Custom CSS */}
      <style jsx global>{`
        :root {
          --navy-800: #1e1b4b;
          --navy-900: #0f0c29;
        }
        
        .bg-navy-800 { background-color: var(--navy-800); }
        .bg-navy-900 { background-color: var(--navy-900); }
        .from-navy-900 { --tw-gradient-from: var(--navy-900); }
        .via-navy-800 { --tw-gradient-via: var(--navy-800); }
        .to-navy-900 { --tw-gradient-to: var(--navy-900); }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes bounce-slow {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>

      {/* Sparkling background */}
      <SparklingBackground />
      
      {/* Header */}
      <Header />
      
      {/* Main content */}
      <main className="relative z-10 pt-16">
        {/* Hero Banner Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent leading-tight">
          Welcome to the Future of Shopping
        </h1>
        <p className="text-xl sm:text-2xl text-white/80 mb-8 leading-relaxed">
          Discover innovative products that transform your everyday experience.
        </p>
            
            {/* Animated Product Button */}
            <div className="mb-12">
              <AnimatedProductButton />
            </div>
            
            {/* Additional CTA */}
            
          </div>
        </section>

        {/* Professional Content Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
                    Professional Excellence
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    We deliver world-class solutions that drive business growth and innovation. 
                    Our team of experts combines cutting-edge technology with deep industry knowledge 
                    to create exceptional results for our clients.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-bold text-navy-900">500+</div>
                      <div className="text-gray-600">Projects Completed</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-bold text-navy-900">99%</div>
                      <div className="text-gray-600">Client Satisfaction</div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="text-xl font-semibold text-navy-900 mb-4">Key Features</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          Advanced Technology Stack
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          24/7 Professional Support
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          Scalable Solutions
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          Industry Best Practices
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}