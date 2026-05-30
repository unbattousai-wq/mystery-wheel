"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-16 border-t border-[#9945FF]/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="font-orbitron text-2xl font-black text-glow-purple mb-2">MYSTERY WHEEL</div>
            <div className="text-sm text-[#9945FF] tracking-widest mb-4">$WHEEL ON SOLANA</div>
            <p className="text-gray-500 text-sm">The most thrilling spin-to-win on Solana.</p>
          </div>
          <div>
            <h4 className="font-orbitron text-sm font-bold text-gray-400 mb-4">NAVIGATION</h4>
            <ul className="space-y-2">
              {["Segments", "Spin", "White Pepper", "Tokenomics"].map((item) => (
                <li key={item}><a href={`#${item.toLowerCase().replace(" ", "")}`} className="text-gray-500 hover:text-[#9945FF]">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-orbitron text-sm font-bold text-gray-400 mb-4">COMMUNITY</h4>
            <div className="flex gap-4">
              <a href="https://twitter.com" className="w-10 h-10 rounded-lg bg-[#9945FF]/20 flex items-center justify-center hover:bg-[#9945FF]/30">
                <svg className="w-5 h-5 text-[#9945FF]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://t.me" className="w-10 h-10 rounded-lg bg-[#00F5FF]/20 flex items-center justify-center hover:bg-[#00F5FF]/30">
                <svg className="w-5 h-5 text-[#00F5FF]" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#9945FF]/10 pt-8">
          <p className="text-xs text-gray-600 text-center max-w-4xl mx-auto">
            $WHEEL is a utility token on Solana blockchain. For entertainment purposes only. Not financial advice. 18+ only.
          </p>
        </div>
      </div>
    </footer>
  );
}
