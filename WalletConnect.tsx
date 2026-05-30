"use client";

import { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Wallet, LogOut, Copy, Check, ChevronDown } from "lucide-react";

export default function WalletConnect() {
  const { publicKey, disconnect, connected, connecting } = useWallet();
  const { connection } = useConnection();
  const { setVisible } = useWalletModal();
  const [balance, setBalance] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (publicKey) {
      connection.getBalance(publicKey).then((bal) => {
        setBalance(bal / LAMPORTS_PER_SOL);
      });
    } else {
      setBalance(null);
    }
  }, [publicKey, connection]);

  const handleConnect = () => {
    setVisible(true);
  };

  const handleCopy = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (connecting) {
    return (
      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl font-orbitron text-sm animate-pulse">
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        Connecting...
      </button>
    );
  }

  if (connected && publicKey) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-3 px-4 py-2 glass-card hover:border-[#14F195] transition-all duration-300 rounded-xl"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-400 font-rajdhani">Balance</p>
              <p className="text-sm font-bold text-[#14F195] font-space">
                {balance !== null ? `${balance.toFixed(4)} SOL` : "..."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <span className="text-xs font-mono">
              {formatAddress(publicKey.toString())}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        {showDropdown && (
          <div className="absolute top-full right-0 mt-2 w-48 glass-card rounded-xl overflow-hidden z-50">
            <button
              onClick={handleCopy}
              className="w-full flex items-center gap-2 px-4 py-3 hover:bg-white/5 transition-colors text-left"
            >
              {copied ? (
                <Check className="w-4 h-4 text-[#14F195]" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
              <span className="text-sm">{copied ? "Copied!" : "Copy Address"}</span>
            </button>
            <button
              onClick={() => {
                disconnect();
                setShowDropdown(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-3 hover:bg-white/5 transition-colors text-left text-[#FF2D9B]"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Disconnect</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#9945FF] to-[#7C3AED] rounded-xl font-orbitron text-sm uppercase tracking-wider hover:shadow-[0_0_30px_rgba(153,69,255,0.5)] transition-all duration-300 hover:-translate-y-0.5"
    >
      <Wallet className="w-5 h-5" />
      <span className="hidden sm:inline">Connect Wallet</span>
      <span className="sm:hidden">Connect</span>
    </button>
  );
}
