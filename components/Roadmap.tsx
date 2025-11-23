import React from 'react';

const phases = [
  {
    phase: "Phase 1",
    title: "Inception & Peace",
    items: ["Website goes live", "Peace negotiations begin", "First meme generated"]
  },
  {
    phase: "Phase 2",
    title: "Unity Protocol",
    items: ["Stop crypto tribal warfare", "Force Bitcoiners to hug Ethheads", "Merch store"]
  },
  {
    phase: "Phase 3",
    title: "Bridge Humanity",
    items: ["Cross-chain everything", "Bridge humanity", "Listing on CEX (maybe)"]
  },
  {
    phase: "Phase 4",
    title: "Financial Takeover",
    items: ["Replace global financial system", "Replace the dollar with $SAME", "Lambo for everyone"]
  },
  {
    phase: "Phase 5",
    title: "Galactic Pump",
    items: ["Universal pump cycle", "Elon tweets?", "We buy a planet"]
  }
];

const Roadmap: React.FC = () => {
  return (
    <section id="roadmap" className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Master Plan</span></h2>
        <p className="text-gray-400 font-mono text-sm max-w-2xl mx-auto">
          Subject to change based on vibes, market conditions, and how much coffee the dev drinks.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Central Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-cyan-500 to-transparent md:-translate-x-1/2 opacity-30" />

        <div className="space-y-12">
          {phases.map((phase, index) => (
            <div key={index} className={`relative flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Spacer for alignment */}
              <div className="flex-1 hidden md:block" />

              {/* Node on Line with glow */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-cyan-400 rounded-full -translate-x-1.5 md:-translate-x-1/2 mt-6 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10 border-2 border-white animate-pulse" />
              <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-cyan-400/20 rounded-full -translate-x-2 md:-translate-x-1/2 mt-4 blur-md animate-pulse" />

              {/* Content Card */}
              <div className="flex-1 w-full pl-12 md:pl-0 md:px-12">
                <div className="glass-card p-6 rounded-xl border-l-4 border-l-cyan-500 md:border-l-0 md:border-t-4 md:border-t-purple-500 hover:scale-[1.02] transition-all duration-300 melting-hover relative overflow-hidden group">
                  {/* Melting blob background on hover */}
                  <div className="absolute inset-0 blob-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-500 animate-blob-morph pointer-events-none" 
                    style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} 
                  />
                  {/* Dripping effect */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-drip transition-opacity" />
                  
                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-purple-900/50 text-purple-300 rounded text-xs font-bold uppercase tracking-wider mb-2 border border-purple-500/30 group-hover:border-purple-400/60 group-hover:shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-all">
                      {phase.phase}
                    </span>
                    <h3 className="text-2xl font-bold font-display text-white mb-4 group-hover:text-cyan-300 transition-colors">{phase.title}</h3>
                    <ul className="space-y-2">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-center text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                          <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 group-hover:scale-150 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;