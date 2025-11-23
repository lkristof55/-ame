// Configuration file for $SAME website
// Update these values with your actual links and information

export const CONFIG = {
  // Contract Address
  CONTRACT_ADDRESS: '6JKmwbRog2t5AoxihVyJ8bqwgvq3QzsQsFC2RT57pump',
  
  // Helius API Key - loaded from .env
  HELIUS_API_KEY: import.meta.env.VITE_HELIUS_API_KEY || '7ef7af02-aa9d-4f5c-9c98-d5fa303d1f04', // Fallback for testing
  
  // Pump.fun link
  PUMP_FUN_LINK: 'https://pump.fun/coin/6JKmwbRog2t5AoxihVyJ8bqwgvq3QzsQsFC2RT57pump',
  
  // Social links
  TWITTER_LINK: 'https://x.com/samecoinonx',
  TELEGRAM_LINK: 'https://t.me/yourgroup', // Optional
  DISCORD_LINK: 'https://discord.gg/yourinvite', // Optional
} as const;

// Helper function to format numbers
export const formatNumber = (num: number): string => {
  if (!num || isNaN(num) || num === 0) return '$0.00';
  
  // Handle very large numbers (trillions)
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
};

// Simple function to format market cap in thousands (K)
export const formatMarketCap = (num: number): string => {
  if (!num || isNaN(num) || num === 0) return '$0.00K';
  // Always divide by 1000 and add K
  return `$${(num / 1000).toFixed(2)}K`;
};

export const formatPrice = (num: number): string => {
  if (num < 0.01) return `$${num.toFixed(6)}`;
  if (num < 1) return `$${num.toFixed(4)}`;
  return `$${num.toFixed(2)}`;
};

