import React from 'react';
import { Layers, ShieldCheck, Zap, Globe2 } from 'lucide-react';

const Card = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="glass-card p-8 rounded-2xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300 melting-hover animate-liquid-morph">
    {/* Melting blob gradient background on hover */}
    <div className="absolute inset-0 blob-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-500 animate-blob-morph" 
      style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} 
    />
    
    {/* Dripping effect on hover */}
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-drip transition-opacity" />
    
    <div className="relative z-10 flex flex-col h-full">
      <div className="mb-6 p-4 bg-black/40 rounded-full w-fit border border-white/10 group-hover:border-cyan-400/30 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all group-hover:scale-110">
        <Icon size={32} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
      </div>
      <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{title}</h3>
      <p className="text-gray-400 leading-relaxed font-light group-hover:text-gray-300 transition-colors">{desc}</p>
    </div>
    
    {/* Corner accents with glow */}
    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-white/5 rounded-tr-2xl group-hover:border-purple-500/50 group-hover:shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-all" />
    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/5 rounded-bl-2xl group-hover:border-purple-500/50 group-hover:shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-all" />
  </div>
);

const WhySame: React.FC = () => {
  return (
    <section id="why" className="container mx-auto px-6 relative">
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
          Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">$SAME</span> Exists
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto rounded-full animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          icon={Layers} 
          title="Consolidated Logos" 
          desc="We combined every logo so nobody fights anymore. It's a mess, but it's OUR mess." 
        />
        <Card 
          icon={ShieldCheck} 
          title="Anti-Tribal Tech" 
          desc="Stop comparing blockchains. Just choose the same coin. It works on every chain (emotionally)." 
        />
        <Card 
          icon={Globe2} 
          title="Universal Ticker" 
          desc="Why remember BTC, ETH, SOL, PEPE? Just remember SAME. It saves brain space." 
        />
        <Card 
          icon={Zap} 
          title="Zero Drama" 
          desc="No more maxis. No more flippenings. Just eternal, peaceful stagnation (or moon)." 
        />
      </div>
    </section>
  );
};

export default WhySame;