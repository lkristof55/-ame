import React, { useEffect, useState } from 'react';

interface FloatingSymbol {
  id: number;
  symbol: string;
  x: number;
  y: number;
  speed: number;
  size: number;
  color: string;
  delay: number;
  opacity?: number;
}

const FloatingCryptoSymbols: React.FC = () => {
  const [symbols, setSymbols] = useState<FloatingSymbol[]>([]);

  useEffect(() => {
    // Generate floating crypto symbols
    const cryptoData = [
      { symbol: '₿', color: '#F7931A', name: 'Bitcoin' },
      { symbol: 'Ξ', color: '#627EEA', name: 'Ethereum' },
      { symbol: '◎', color: '#14F195', name: 'Solana' },
      { symbol: 'X', color: '#0085C3', name: 'XRP' },
      { symbol: 'BNB', color: '#F3BA2F', name: 'BNB', opacity: 0.15 }, // Lower opacity for BNB (we don't really want it)
    ];

    const newSymbols: FloatingSymbol[] = [];
    
    // Create multiple instances of each symbol (more symbols for better coverage)
    // BNB gets fewer instances because we don't really want it
    for (let i = 0; i < 16; i++) {
      // Regular coins (BTC, ETH, SOL, XRP) appear more often
      const crypto = cryptoData[i % 4];
      newSymbols.push({
        id: i,
        symbol: crypto.symbol,
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: 0.2 + Math.random() * 0.3, // Very slow floating speed
        size: 18 + Math.random() * 20,
        color: crypto.color,
        delay: Math.random() * 8,
        opacity: 0.3,
      });
    }
    
    // Add a few BNB symbols but with lower opacity (we don't really want them)
    for (let i = 0; i < 2; i++) {
      const bnb = cryptoData[4];
      newSymbols.push({
        id: 100 + i, // Different ID range
        symbol: bnb.symbol,
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: 0.2 + Math.random() * 0.3,
        size: 16 + Math.random() * 15,
        color: bnb.color,
        delay: Math.random() * 8,
        opacity: 0.15, // Much lower opacity - we don't really want BNB
      });
    }

    setSymbols(newSymbols);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {symbols.map((symbol) => (
        <div
          key={symbol.id}
          className="absolute hover:opacity-60 transition-opacity duration-500"
          style={{
            left: `${symbol.x}%`,
            top: `${symbol.y}%`,
            fontSize: `${symbol.size}px`,
            color: symbol.color,
            opacity: symbol.opacity || 0.3,
            filter: `drop-shadow(0 0 10px ${symbol.color}) drop-shadow(0 0 20px ${symbol.color}60)`,
            animation: `float-slow ${12 + symbol.speed * 15}s ease-in-out infinite`,
            animationDelay: `${symbol.delay}s`,
            transform: 'translate(-50%, -50%)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 'bold',
          }}
        >
          {symbol.symbol}
        </div>
      ))}
    </div>
  );
};

export default FloatingCryptoSymbols;

