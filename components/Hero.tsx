import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { CONFIG } from '../config';

// Crypto symbol components
const CryptoSymbol: React.FC<{ symbol: string; x: number; y: number; delay: number }> = ({ symbol, x, y, delay }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`absolute text-2xl md:text-3xl font-bold opacity-60 transition-opacity duration-1000 ${mounted ? 'opacity-60' : 'opacity-0'}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        animation: `float-slow ${4 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        filter: 'drop-shadow(0 0 8px currentColor)',
        color: symbol === '₿' ? '#F7931A' : symbol === 'Ξ' ? '#627EEA' : symbol === '◎' ? '#14F195' : '#C2A633',
      }}
    >
      {symbol}
    </div>
  );
};

const Hero: React.FC = () => {
  // Crypto symbols positions (relative to blob area)
  const cryptoSymbols = [
    { symbol: '₿', x: 50, y: 20, delay: 0 }, // Bitcoin top-center
    { symbol: 'Ξ', x: 70, y: 25, delay: 0.5 }, // Ethereum top-right
    { symbol: '◎', x: 30, y: 60, delay: 1 }, // Solana bottom-left
    { symbol: '🐕', x: 70, y: 65, delay: 1.5 }, // Dogecoin bottom-right
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-24 px-4 relative overflow-hidden">
      
      {/* Glitchy decorative text background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center opacity-[0.03] text-9xl font-black font-display pointer-events-none select-none">
        UNITY
        <br />
        ACHIEVED
      </div>

      {/* Main Logo Container with Melting Blob */}
      <div className="relative group cursor-pointer mb-8">
        {/* Bright white perimeter glow matching logo */}
        <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 scale-110" />
        
        {/* Melting blob glow effect - matching logo colors */}
        <div 
          className="absolute inset-0 blob-gradient opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-blob-morph blur-3xl"
          style={{
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          }}
        />
        
        {/* Additional colored glows */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-purple-500/30 to-pink-500/30 rounded-full blur-2xl opacity-50 animate-pulse scale-105" />
        
        {/* Logo Image Container */}
        <div className="relative z-10 w-64 md:w-96 lg:w-[450px] mx-auto">
          <img 
            src="/logo.png" 
            alt="$SAME Logo" 
            className="relative w-full drop-shadow-2xl animate-float transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              console.error('Failed to load logo:', e);
              // Fallback to original URL if local file doesn't work
              (e.target as HTMLImageElement).src = 'https://file-service.us-east-1.prod.oz.r.app/file/1605ae8a-1992-462e-b67a-83b5ef6d520f';
            }}
          />
          
          {/* Crypto Symbol Particles floating within blob area */}
          <div className="absolute inset-0 pointer-events-none">
            {cryptoSymbols.map((crypto, idx) => (
              <CryptoSymbol 
                key={idx}
                symbol={crypto.symbol}
                x={crypto.x}
                y={crypto.y}
                delay={crypto.delay}
              />
            ))}
          </div>
        </div>
        
        {/* Rotating holographic circles with melting effect */}
        <div className="absolute inset-0 border-2 border-cyan-400/40 rounded-full scale-110 animate-[spin_10s_linear_infinite] animate-liquid-morph" />
        <div className="absolute inset-0 border-2 border-purple-400/40 rounded-full scale-125 animate-[spin_15s_linear_infinite_reverse] animate-liquid-morph" />
      </div>

      {/* Golden $AME Text with Dripping Effect */}
      <div className="relative z-10 mb-6">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-display tracking-tighter text-center">
          <span className="relative inline-block text-glow-gold animate-golden-glow">
            $AME
            {/* Dripping effect on each letter */}
            <span className="absolute -bottom-2 left-0 w-full h-3 overflow-hidden">
              <span 
                className="absolute left-[5%] w-1 h-3 bg-gradient-to-b from-[#fbbf24] to-transparent rounded-full animate-drip"
                style={{ animationDelay: '0s' }}
              />
              <span 
                className="absolute left-[25%] w-1.5 h-4 bg-gradient-to-b from-[#fbbf24] to-transparent rounded-full animate-drip"
                style={{ animationDelay: '0.2s' }}
              />
              <span 
                className="absolute left-[45%] w-1 h-3 bg-gradient-to-b from-[#fbbf24] to-transparent rounded-full animate-drip"
                style={{ animationDelay: '0.4s' }}
              />
              <span 
                className="absolute left-[65%] w-1.5 h-4 bg-gradient-to-b from-[#fbbf24] to-transparent rounded-full animate-drip"
                style={{ animationDelay: '0.6s' }}
              />
              <span 
                className="absolute left-[85%] w-1 h-3 bg-gradient-to-b from-[#fbbf24] to-transparent rounded-full animate-drip"
                style={{ animationDelay: '0.8s' }}
              />
            </span>
          </span>
          <span className="text-white text-2xl md:text-4xl align-top opacity-50 font-normal ml-2">.coin</span>
        </h1>
      </div>

      {/* Headlines */}
      <div className="text-center z-10 max-w-4xl mx-auto space-y-4">
        <h2 className="text-2xl md:text-3xl font-display text-cyan-300 uppercase tracking-widest text-glow">
          One Coin For Everyone
        </h2>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed border-l-2 border-purple-500 pl-4 bg-purple-900/10 py-2 melting-hover">
          The universal rebrand: all chains, all tribes, one ticker.
          <br />
          <span className="italic text-sm text-gray-500">Stop fighting. Start hodling the same thing.</span>
        </p>
      </div>

      {/* CTA Buttons with Melting Effects */}
      <div className="flex flex-col md:flex-row gap-6 mt-12 z-10">
        <a 
          href={CONFIG.PUMP_FUN_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-sm font-black text-black text-lg uppercase tracking-widest overflow-hidden melting-hover"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
          <span className="relative flex items-center gap-2">
            Buy $SAME <Zap className="fill-black" size={20} />
          </span>
          {/* Dripping effect on hover */}
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-b from-transparent via-yellow-700/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-drip transition-opacity" />
        </a>

        <button className="group px-8 py-4 bg-transparent border-2 border-cyan-500/50 rounded-sm font-bold text-cyan-400 text-lg uppercase tracking-widest hover:bg-cyan-500/10 hover:border-cyan-400 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] melting-hover">
          <span className="flex items-center gap-2">
            Read The Vision <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
      
      {/* Decorative cyber elements with sparkles */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-1 opacity-50 hidden md:flex">
        <div className="w-2 h-2 bg-cyan-400 animate-sparkle" style={{ animationDelay: '0s' }} />
        <div className="w-2 h-2 bg-purple-400 animate-sparkle" style={{ animationDelay: '0.5s' }} />
        <div className="w-2 h-2 bg-yellow-400 animate-sparkle" style={{ animationDelay: '1s' }} />
        <span className="font-mono text-xs text-cyan-400 mt-2">SYS.ONLINE</span>
      </div>

    </section>
  );
};

export default Hero;