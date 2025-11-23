import React from 'react';

const Background: React.FC = () => {
  // Generate circuit board lines
  const circuitLines = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x1: Math.random() * 100,
    y1: Math.random() * 100,
    x2: Math.random() * 100,
    y2: Math.random() * 100,
    color: ['#00ff88', '#3b82f6', '#a855f7', '#ec4899'][Math.floor(Math.random() * 4)],
    opacity: 0.3 + Math.random() * 0.4,
  }));

  // Generate pixelated clouds
  const pixelClouds = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 20 + Math.random() * 40,
    color: ['#8b5cf6', '#3b82f6', '#6366f1'][Math.floor(Math.random() * 3)],
  }));

  // Generate sparkles
  const sparkles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 3,
  }));

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* Layer 1: Deep Gradient Base - matching logo colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3a] to-[#050510]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#302b63]/30 to-[#24243e]/40" />

      {/* Layer 2: Neon-outlined clouds */}
      <div className="absolute top-[10%] left-[5%] w-[40vw] h-[30vw] rounded-full border-2 border-purple-400/20 blur-xl opacity-30 animate-float-slow" />
      <div className="absolute bottom-[15%] right-[10%] w-[35vw] h-[25vw] rounded-full border-2 border-blue-400/20 blur-xl opacity-25 animate-float" />
      <div className="absolute top-[50%] left-[20%] w-[25vw] h-[20vw] rounded-full border-2 border-cyan-400/15 blur-lg opacity-20 animate-pulse" />

      {/* Layer 3: Circuit Board Lines - neon green, blue, pink/purple */}
      <svg className="absolute inset-0 w-full h-full opacity-40" style={{ mixBlendMode: 'screen' }}>
        {circuitLines.map((line) => (
          <line
            key={line.id}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke={line.color}
            strokeWidth="2"
            opacity={line.opacity}
            style={{
              filter: `blur(0.5px) drop-shadow(0 0 3px ${line.color})`,
              animation: `pulse-glow ${2 + Math.random() * 2}s ease-in-out infinite`,
            }}
          />
        ))}
        {/* Additional horizontal and diagonal lines */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={`${i * 10}%`}
            y1="0%"
            x2={`${(i * 10 + 20) % 100}%`}
            y2="100%"
            stroke={['#00ff88', '#3b82f6', '#a855f7'][i % 3]}
            strokeWidth="1.5"
            opacity={0.2}
            style={{ filter: 'blur(0.5px)' }}
          />
        ))}
      </svg>

      {/* Layer 4: Pixelated Cloud Shapes */}
      <div className="absolute inset-0">
        {pixelClouds.map((cloud) => (
          <div
            key={cloud.id}
            className="absolute"
            style={{
              top: `${cloud.top}%`,
              left: `${cloud.left}%`,
              width: `${cloud.size}px`,
              height: `${cloud.size}px`,
              backgroundColor: cloud.color,
              opacity: 0.4,
              clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
              filter: 'blur(1px)',
              animation: `float-slow ${8 + Math.random() * 4}s ease-in-out infinite`,
            }}
          />
        ))}
        {/* Additional pixel squares */}
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={`pixel-${i}`}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              backgroundColor: ['#8b5cf6', '#3b82f6', '#6366f1'][Math.floor(Math.random() * 3)],
              opacity: 0.5,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Layer 5: Sparkles/Stars */}
      <div className="absolute inset-0">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${sparkle.top}%`,
              left: `${sparkle.left}%`,
              boxShadow: '0 0 4px rgba(255,255,255,0.8), 0 0 8px rgba(139, 92, 246, 0.6)',
              animation: `sparkle ${sparkle.duration}s ease-in-out infinite`,
              animationDelay: `${sparkle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Layer 6: Additional glowing orbs */}
      <div className="absolute top-[20%] right-[15%] w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-[25%] left-[20%] w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-15 animate-float" />
      <div className="absolute top-[60%] right-[30%] w-24 h-24 bg-cyan-400 rounded-full blur-2xl opacity-25 animate-float-slow" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#050510]/60" />
    </div>
  );
};

export default Background;