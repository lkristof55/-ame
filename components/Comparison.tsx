import React from 'react';
import { Check, X } from 'lucide-react';

interface CoinProps {
  name: string;
  ticker: string;
  desc: string;
  color: string;
  isSame?: boolean;
}

const CoinRow = ({ name, ticker, desc, color, isSame }: CoinProps) => {
  return (
  <div className={`
    relative flex flex-col md:flex-row items-center p-6 rounded-xl border mb-4 transition-all duration-300 melting-hover
    ${isSame 
      ? 'bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-cyan-500/50 shadow-[0_0_30px_rgba(139,92,246,0.2)] scale-[1.02] animate-liquid-morph' 
      : 'bg-white/5 border-white/10 hover:bg-white/10'
    }
  `}>
    {/* Melting blob effect for SAME */}
    {isSame && (
      <>
        <div className="absolute inset-0 blob-gradient opacity-10 animate-blob-morph rounded-xl pointer-events-none" 
          style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} 
        />
        <div className="absolute inset-0 bg-cyan-400/5 mix-blend-overlay animate-pulse rounded-xl pointer-events-none" />
        {/* Dripping effect */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-drip" />
      </>
    )}

    {/* Icon Placeholder with glow */}
    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6 relative z-10">
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-xl shadow-lg border-2 border-white/20 transition-all group-hover:scale-110"
        style={{ 
          backgroundColor: color,
          boxShadow: isSame ? `0 0 20px ${color}, 0 0 40px ${color}40` : `0 0 10px ${color}60`
        }}
      >
        {ticker}
      </div>
      {isSame && (
        <div className="absolute inset-0 w-16 h-16 rounded-full bg-white blur-xl opacity-30 animate-pulse" />
      )}
    </div>

    {/* Content */}
    <div className="flex-grow text-center md:text-left">
      <h3 className={`text-xl font-bold font-display flex items-center justify-center md:justify-start gap-2 ${isSame ? 'text-cyan-300' : 'text-white'}`}>
        {name} 
        {isSame && <span className="text-xs bg-cyan-500 text-black px-2 py-0.5 rounded font-bold uppercase">The One</span>}
      </h3>
      <p className="text-gray-400 text-sm mt-1 font-mono">{desc}</p>
    </div>

    {/* Status */}
    <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-6">
      {isSame ? (
        <div className="flex items-center gap-2 text-green-400 font-bold uppercase tracking-wider text-sm">
          <Check size={18} /> Perfect
        </div>
      ) : (
        <div className="flex items-center gap-2 text-red-400/70 font-bold uppercase tracking-wider text-sm">
          <X size={18} /> Flawed
        </div>
      )}
    </div>
  </div>
  );
};

const Comparison: React.FC = () => {
  const coins = [
    { name: "Bitcoin", ticker: "BTC", color: "#F7931A", desc: "King of the Universe. Expensive to talk to. Moves like a tectonic plate." },
    { name: "Ethereum", ticker: "ETH", color: "#627EEA", desc: "Powerful elven spellbook with gas fees that cost a kidney." },
    { name: "Solana", ticker: "SOL", color: "#14F195", desc: "Fast. Beautiful. Occasionally becomes cheese and stops working." },
    { name: "Dogecoin", ticker: "DOGE", color: "#C2A633", desc: "The purest heart in crypto. But 1 DOGE = 1 DOGE is tautology." },
    { name: "XRP", ticker: "XRP", color: "#23292F", desc: "Uncle's favorite lawsuit simulator. Centralized spreadsheet." },
    { name: "BNB Chain", ticker: "BNB", color: "#F3BA2F", desc: "BNB wanted to join. Solana said 'absolutely not' and honestly? We agree. It's fine. Just... fine." },
    { name: "$SAME", ticker: "SAME", color: "#8b5cf6", desc: "Unity achieved. Drama deleted. The ultimate holographic hedge.", isSame: true },
  ];

  return (
    <section id="comparison" className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-display font-bold mb-10 text-center">
          Market <span className="text-purple-400">Analysis</span>
        </h2>
        
        <div className="space-y-2">
          {coins.map((coin) => (
            <CoinRow 
              key={coin.ticker} 
              name={coin.name}
              ticker={coin.ticker}
              desc={coin.desc}
              color={coin.color}
              isSame={coin.isSame}
            />
          ))}
        </div>

        {/* Honorable Mentions - Coins We Deliberately Excluded */}
        <div className="mt-12 p-6 glass-card rounded-xl border border-yellow-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/5 to-transparent opacity-50" />
          <div className="relative z-10">
            <h3 className="text-xl font-display font-bold mb-4 text-yellow-400/70 flex items-center gap-2">
              <span>Coins We Deliberately Excluded</span>
              <span className="text-xs text-gray-500">(With Love)</span>
            </h3>
            <div className="space-y-3">
              <div className="flex flex-col md:flex-row md:items-center gap-2 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 font-bold">BNB</span>
                  <span className="text-gray-600">—</span>
                </div>
                <span className="italic">"Solana vetoed it. We asked why. 'Trust me bro' was the answer. Fair enough. Also, it's an exchange token cosplaying as a blockchain. Hard pass."</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;