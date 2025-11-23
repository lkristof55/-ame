import React, { useEffect, useState } from 'react';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { CONFIG, formatNumber, formatPrice, formatMarketCap } from '../config';

interface TokenStats {
  price: number;
  marketCap: number;
  holders: number;
  volume24h: number;
  priceChange24h: number;
}

const StatCard = ({ icon: Icon, label, value, change, color }: {
  icon: any;
  label: string;
  value: string;
  change?: number;
  color: string;
}) => (
  <div className="glass-card p-6 rounded-xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300 melting-hover">
    <div className="absolute inset-0 blob-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-500 animate-blob-morph pointer-events-none" 
      style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} 
    />
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-black/40 rounded-full border border-white/10 group-hover:border-cyan-400/30 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all">
          <Icon size={24} className={color} />
        </div>
        {change !== undefined && (
          <span className={`text-sm font-bold ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change >= 0 ? '+' : ''}{change.toFixed(2)}%
          </span>
        )}
      </div>
      <h3 className="text-2xl font-display font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
        {value}
      </h3>
      <p className="text-gray-400 text-sm font-mono">{label}</p>
    </div>
  </div>
);

const Stats: React.FC = () => {
  const [stats, setStats] = useState<TokenStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      // Debug logging (only in development)
      if (import.meta.env.DEV) {
        console.log('Fetching stats for:', CONFIG.CONTRACT_ADDRESS);
      }
      
      if (!CONFIG.CONTRACT_ADDRESS) {
        setError('Contract address not configured');
        setLoading(false);
        return;
      }

      // Try to use API key from env or config
      const apiKey = CONFIG.HELIUS_API_KEY || import.meta.env.VITE_HELIUS_API_KEY;
      
      if (!apiKey) {
        setError('Helius API key not configured. Please check .env file.');
        setLoading(false);
        return;
      }

      try {
        const apiKey = CONFIG.HELIUS_API_KEY || import.meta.env.VITE_HELIUS_API_KEY;
        let price = 0;
        let priceChange24h = 0;
        let volume24h = 0;
        let holders = 0;
        let marketCap = 0;

        // Get token supply using Helius RPC
        try {
          const supplyResponse = await fetch(
            `https://mainnet.helius-rpc.com/?api-key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getTokenSupply',
                params: [CONFIG.CONTRACT_ADDRESS],
              }),
            }
          );
          const supplyData = await supplyResponse.json();
          if (supplyData?.result?.value) {
            // uiAmount is already in human-readable format (not in smallest units)
            holders = supplyData.result.value.uiAmount || 0;
            if (import.meta.env.DEV) {
              console.log('Token supply:', holders);
            }
          }
        } catch (supplyError) {
          console.log('Token supply fetch failed:', supplyError);
        }

        // Get token metadata from Helius DAS API
        try {
          const heliusResponse = await fetch(
            `https://mainnet.helius-rpc.com/?api-key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'my-id',
                method: 'getAsset',
                params: {
                  id: CONFIG.CONTRACT_ADDRESS,
                },
              }),
            }
          );
          const heliusData = await heliusResponse.json();
          
          if (import.meta.env.DEV) {
            console.log('Helius data:', heliusData);
          }
          
          // Parse Helius response for token info
          if (heliusData?.result) {
            const result = heliusData.result;
            // Token supply might be in token_info
            if (result.token_info) {
              const supply = result.token_info.supply;
              if (supply) {
                holders = parseFloat(supply) || holders;
              }
            }
            
            // Check for price data in content or metadata
            // Note: Helius DAS API might not have price directly, but we can get it from other sources
          }
        } catch (heliusError) {
          console.log('Helius API error:', heliusError);
        }

        // Get price from DexScreener API (works from browser, no CORS issues)
        if (price === 0) {
          try {
            const dexScreenerResponse = await fetch(
              `https://api.dexscreener.com/latest/dex/tokens/${CONFIG.CONTRACT_ADDRESS}`,
              {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
              }
            );
            const dexData = await dexScreenerResponse.json();
            
            if (dexData?.pairs && dexData.pairs.length > 0) {
              const pair = dexData.pairs[0];
              price = parseFloat(pair.priceUsd) || 0;
              priceChange24h = parseFloat(pair.priceChange?.h24) || 0;
              volume24h = parseFloat(pair.volume?.h24) || 0;
              
              // Use market cap from DexScreener if available (most accurate)
              if (pair.marketCap) {
                marketCap = parseFloat(pair.marketCap) || 0;
              } else if (pair.fdv) {
                // Fallback to FDV if market cap not available
                marketCap = parseFloat(pair.fdv) || 0;
              } else if (price > 0 && holders > 0) {
                // Last resort: calculate from price * supply
                marketCap = price * holders;
              }
              
              if (import.meta.env.DEV) {
                console.log('DexScreener data:', { 
                  price, 
                  marketCap, 
                  marketCapFromAPI: pair.marketCap,
                  fdv: pair.fdv,
                  holders,
                  calculated: price * holders 
                });
              }
            }
          } catch (dexError) {
            console.log('DexScreener API not available:', dexError);
          }
        }

        // If market cap still not set, calculate it
        if (marketCap === 0 && price > 0 && holders > 0) {
          marketCap = price * holders;
        }

        if (import.meta.env.DEV) {
          console.log('Stats calculated:', { price, marketCap, holders, volume24h });
        }

        setStats({
          price,
          marketCap,
          holders,
          volume24h,
          priceChange24h,
        });
        
        setLastUpdate(new Date());
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load stats');
        setLoading(false);
      }
    };

    fetchStats();
    // Refresh every 15 seconds
    const interval = setInterval(() => {
      fetchStats();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section id="stats" className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Stats</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto rounded-full animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass-card p-6 rounded-xl animate-pulse">
              <div className="h-16 bg-white/10 rounded mb-4" />
              <div className="h-8 bg-white/10 rounded mb-2" />
              <div className="h-4 bg-white/10 rounded w-2/3" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error || !stats) {
    return (
      <section id="stats" className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Stats</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto rounded-full animate-pulse" />
        </div>
        <div className="text-center text-gray-400 glass-card p-8 rounded-xl">
          <p className="text-lg mb-2">{error || 'Stats will be available after token launch'}</p>
          <p className="text-sm text-gray-500">Contract: {CONFIG.CONTRACT_ADDRESS.slice(0, 8)}...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="stats" className="container mx-auto px-6 py-20 relative">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
          Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Stats</span>
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto rounded-full animate-pulse mb-2" />
        {lastUpdate && (
          <p className="text-xs text-gray-500 font-mono">
            Last updated: {lastUpdate.toLocaleTimeString()} • Auto-refresh every 15s
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={DollarSign}
          label="Price"
          value={formatPrice(stats.price)}
          change={stats.priceChange24h}
          color="text-yellow-400"
        />
        <StatCard
          icon={TrendingUp}
          label="Market Cap"
          value={formatMarketCap(stats.marketCap)}
          color="text-cyan-400"
        />
        <StatCard
          icon={Activity}
          label="24h Volume"
          value={formatNumber(stats.volume24h)}
          color="text-pink-400"
        />
      </div>
    </section>
  );
};

export default Stats;

