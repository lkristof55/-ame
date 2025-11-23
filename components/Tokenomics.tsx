import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Community Vibes', value: 50, color: '#a855f7' }, // Purple
  { name: 'Liquidity', value: 25, color: '#3b82f6' }, // Blue
  { name: 'Marketing', value: 15, color: '#22d3ee' }, // Cyan
  { name: 'Galactic Expansion', value: 10, color: '#eab308' }, // Gold
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0a0a1a] border border-white/20 p-4 rounded-lg shadow-xl backdrop-blur-md">
        <p className="font-display font-bold text-white text-lg">{payload[0].name}</p>
        <p className="text-cyan-400 font-mono">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const Tokenomics: React.FC = () => {
  return (
    <section id="tokenomics" className="container mx-auto px-6 py-20 relative">
      {/* Background Graphic with blob morph */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blob-gradient opacity-20 rounded-full blur-3xl pointer-events-none -z-10 animate-blob-morph"
        style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
      />

      <div className="flex flex-col lg:flex-row items-center gap-16">
        
        {/* Chart Side */}
        <div className="w-full lg:w-1/2 relative" style={{ minWidth: 300, minHeight: 400, height: 400 }}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
             <div className="text-center">
               <span className="block text-6xl font-black font-display text-white/10">100%</span>
               <span className="block text-sm text-white/20 tracking-[0.5em] uppercase">Total Supply</span>
             </div>
          </div>
          
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={100}
                outerRadius={160}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    className="drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:opacity-80 transition-all duration-300 cursor-pointer hover:drop-shadow-[0_0_20px_currentColor]"
                    style={{ filter: `drop-shadow(0 0 8px ${entry.color}80)` }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend Side */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">Tokenomics</span>
            <br />
            Breakdown
          </h2>

          <div className="space-y-6">
            {data.map((item, index) => (
              <div key={index} className="group flex items-center p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-default melting-hover relative overflow-hidden">
                {/* Melting effect on hover */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-drip transition-opacity" style={{ color: item.color }} />
                
                <div 
                  className="w-4 h-full self-stretch rounded-full mr-4 shadow-[0_0_10px_currentColor] transition-all group-hover:scale-110 group-hover:shadow-[0_0_20px_currentColor]" 
                  style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}` }}
                />
                <div className="flex-1 relative z-10">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{item.name}</h3>
                    <span className="text-2xl font-mono font-bold transition-all group-hover:scale-110" style={{ color: item.color }}>{item.value}%</span>
                  </div>
                  <p className="text-sm text-gray-500 font-mono group-hover:text-gray-400 transition-colors">
                    {index === 0 && "For the people. No VCs. No insiders."}
                    {index === 1 && "Locked. Stability... hopefully."}
                    {index === 2 && "Memes, cheese, and paid shills."}
                    {index === 3 && "When we eventually leave Earth."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;