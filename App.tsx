import React, { useEffect, useState, useRef } from 'react';
import Hero from './components/Hero';
import WhySame from './components/WhySame';
import Comparison from './components/Comparison';
import Tokenomics from './components/Tokenomics';
import Roadmap from './components/Roadmap';
import Stats from './components/Stats';
import ContractAddress from './components/ContractAddress';
import Footer from './components/Footer';
import Background from './components/Background';
import FloatingCryptoSymbols from './components/FloatingCryptoSymbols';
import { Menu, X } from 'lucide-react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => (
  <a 
    href={href} 
    className="text-gray-300 hover:text-cyan-400 font-display uppercase tracking-widest text-sm transition-colors duration-300 hover:scale-105 transform inline-block melting-hover"
    onClick={onClick}
  >
    {children}
  </a>
);

// Section wrapper for smooth scroll animations (reduced parallax)
const SectionWrapper: React.FC<{ children: React.ReactNode; scrollY: number; offset: number }> = ({ children, scrollY, offset }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Much smaller parallax effect for smoothness
  const parallaxOffset = scrollY * offset * 0.1; // Reduced by 90%

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Random glitch effect on logo
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 200);
      }
    }, 3000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(glitchInterval);
    };
  }, []);

  const handleNavClick = () => setMobileMenuOpen(false);

  return (
    <div className="relative min-h-screen text-white overflow-hidden selection:bg-cyan-500 selection:text-black">
      {/* Global Background Effects */}
      <Background />
      <FloatingCryptoSymbols />
      <div className="scanline-overlay" />
      <div className="scanner-bar" />

      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-[#050510]/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Left side - Logo and $SAME text */}
          <div className="flex items-center gap-3">
            {/* Logo in left corner */}
            <div className="relative w-12 h-12">
              <img 
                src="/logo.png" 
                alt="$SAME Logo" 
                className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(234,179,8,0.5)] hover:drop-shadow-[0_0_20px_rgba(234,179,8,0.8)] transition-all"
                onError={(e) => {
                  console.error('Failed to load logo in navbar:', e);
                  (e.target as HTMLImageElement).src = 'https://file-service.us-east-1.prod.oz.r.app/file/1605ae8a-1992-462e-b67a-83b5ef6d520f';
                }}
              />
            </div>
            <div 
              className={`text-2xl font-display font-black tracking-tighter italic bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-400 transition-all ${glitch ? 'animate-[glitch_0.2s_infinite]' : ''}`}
              style={{ transform: glitch ? 'translate(2px, -2px)' : 'translate(0, 0)' }}
            >
              $SAME
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink href="#why" onClick={handleNavClick}>Why $SAME</NavLink>
            <NavLink href="#comparison" onClick={handleNavClick}>Compare</NavLink>
            <NavLink href="#tokenomics" onClick={handleNavClick}>Tokenomics</NavLink>
            <NavLink href="#roadmap" onClick={handleNavClick}>Roadmap</NavLink>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold uppercase text-xs tracking-wider hover:shadow-[0_0_20px_rgba(124,58,237,0.6)] transition-all transform hover:-translate-y-0.5 border border-white/20 melting-hover relative overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Connect Wallet</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <div className="relative w-10 h-10">
              <img 
                src="/logo.png" 
                alt="$SAME Logo" 
                className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                onError={(e) => {
                  console.error('Failed to load logo in mobile navbar:', e);
                  (e.target as HTMLImageElement).src = 'https://file-service.us-east-1.prod.oz.r.app/file/1605ae8a-1992-462e-b67a-83b5ef6d520f';
                }}
              />
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#0a0a1a]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col space-y-4 shadow-2xl">
            {/* Logo in Mobile Menu */}
            <div className="flex justify-center mb-4">
              <div className="relative w-16 h-16">
                <img 
                  src="/logo.png" 
                  alt="$SAME Logo" 
                  className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                  onError={(e) => {
                    console.error('Failed to load logo in mobile menu:', e);
                    (e.target as HTMLImageElement).src = 'https://file-service.us-east-1.prod.oz.r.app/file/1605ae8a-1992-462e-b67a-83b5ef6d520f';
                  }}
                />
              </div>
            </div>
            <NavLink href="#why" onClick={handleNavClick}>Why $SAME</NavLink>
            <NavLink href="#comparison" onClick={handleNavClick}>Compare</NavLink>
            <NavLink href="#tokenomics" onClick={handleNavClick}>Tokenomics</NavLink>
            <NavLink href="#roadmap" onClick={handleNavClick}>Roadmap</NavLink>
            <button className="w-full py-3 mt-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded font-bold uppercase text-sm">
              Connect Wallet
            </button>
          </div>
        )}
      </nav>

      {/* Main Content with Smooth Scroll Animations */}
      <main className="relative z-10 flex flex-col gap-24 md:gap-32 pb-24">
        <div 
          className="scroll-fade-in transition-opacity duration-500"
          style={{ 
            transform: `translateY(${-scrollY * 0.01}px)`, // Much reduced parallax
            opacity: Math.max(0.3, 1 - scrollY / 800) // Slower fade
          }}
        >
          <Hero />
        </div>
        <SectionWrapper scrollY={scrollY} offset={0.005}>
          <WhySame />
        </SectionWrapper>
        <SectionWrapper scrollY={scrollY} offset={0.003}>
          <Comparison />
        </SectionWrapper>
        <SectionWrapper scrollY={scrollY} offset={0.004}>
          <Tokenomics />
        </SectionWrapper>
        <SectionWrapper scrollY={scrollY} offset={0.003}>
          <Stats />
        </SectionWrapper>
        <SectionWrapper scrollY={scrollY} offset={0.002}>
          <ContractAddress />
        </SectionWrapper>
        <SectionWrapper scrollY={scrollY} offset={0.002}>
          <Roadmap />
        </SectionWrapper>
      </main>

      <Footer />
    </div>
  );
};

export default App;