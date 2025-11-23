import React from 'react';
import { Twitter, Send, Github } from 'lucide-react';
import { CONFIG } from '../config';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#02020a] border-t border-white/10 pt-16 pb-8 overflow-hidden">
        
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-2 animate-golden-glow">
              $SAME
            </h2>
            <p className="text-gray-500 text-sm max-w-xs">
              The only ticker you will ever need. Until the next one.
            </p>
          </div>

          <div className="flex gap-6">
            <a 
              href={CONFIG.TWITTER_LINK} 
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all duration-300 melting-hover group relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-cyan-400/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
              <Twitter size={20} className="relative z-10" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all duration-300 melting-hover group relative overflow-hidden">
              <span className="absolute inset-0 bg-purple-500/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
              <Send size={20} className="relative z-10" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 melting-hover group relative overflow-hidden">
              <span className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
              <Github size={20} className="relative z-10" />
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono">
          <p>© 2024 $SAME Coin. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="hover:text-cyan-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-cyan-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
        
        <p className="text-center text-[10px] text-gray-700 mt-8 max-w-2xl mx-auto">
          DISCLAIMER: This is a meme coin. It has no intrinsic value or expectation of financial return. 
          The roadmap is a joke. The logo is a collage. If you buy this, you are buying a piece of internet culture, 
          not a financial instrument. Don't risk money you can't afford to lose.
        </p>
      </div>
    </footer>
  );
};

export default Footer;