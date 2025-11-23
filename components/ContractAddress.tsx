import React, { useState } from 'react';
import { Copy, Check, ExternalLink, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { CONFIG } from '../config';

const ContractAddress: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (CONFIG.CONTRACT_ADDRESS) {
      try {
        await navigator.clipboard.writeText(CONFIG.CONTRACT_ADDRESS);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const solscanUrl = CONFIG.CONTRACT_ADDRESS
    ? `https://solscan.io/token/${CONFIG.CONTRACT_ADDRESS}`
    : '#';

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="glass-card p-8 rounded-xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300 melting-hover">
          <div className="absolute inset-0 blob-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-500 animate-blob-morph pointer-events-none" 
            style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} 
          />
          
          <div className="relative z-10">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">
              Contract <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Address</span>
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* QR Code */}
              <div className="flex-shrink-0 p-4 bg-white rounded-lg">
                {CONFIG.CONTRACT_ADDRESS ? (
                  <QRCodeSVG 
                    value={CONFIG.CONTRACT_ADDRESS}
                    size={120}
                    level="H"
                    includeMargin={true}
                  />
                ) : (
                  <div className="w-[120px] h-[120px] bg-gray-200 flex items-center justify-center rounded">
                    <QrCode size={40} className="text-gray-400" />
                  </div>
                )}
              </div>

              {/* Address and Actions */}
              <div className="flex-1 w-full">
                <div className="mb-4">
                  <label className="text-sm text-gray-400 mb-2 block font-mono">Token Contract</label>
                  <div className="flex items-center gap-2 p-3 bg-black/40 rounded-lg border border-white/10">
                    <code className="flex-1 text-cyan-400 font-mono text-sm break-all">
                      {CONFIG.CONTRACT_ADDRESS || 'Contract address not configured'}
                    </code>
                    <button
                      onClick={handleCopy}
                      className="p-2 bg-white/5 hover:bg-cyan-500/20 rounded transition-all melting-hover flex-shrink-0"
                      disabled={!CONFIG.CONTRACT_ADDRESS}
                      title="Copy address"
                    >
                      {copied ? (
                        <Check size={18} className="text-green-400" />
                      ) : (
                        <Copy size={18} className="text-cyan-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={solscanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 px-4 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 melting-hover ${
                      CONFIG.CONTRACT_ADDRESS
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-[0_0_20px_rgba(124,58,237,0.6)]'
                        : 'bg-gray-600 cursor-not-allowed opacity-50'
                    }`}
                    onClick={(e) => !CONFIG.CONTRACT_ADDRESS && e.preventDefault()}
                  >
                    View on Solscan
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContractAddress;

