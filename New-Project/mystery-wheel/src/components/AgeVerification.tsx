"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function AgeVerification({ onVerified }: { onVerified: () => void }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("age_verified")) setShow(true);
    else onVerified();
  }, [onVerified]);

  const handleVerify = () => {
    localStorage.setItem("age_verified", "true");
    setShow(false);
    onVerified();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4">
      <div className="glass-card max-w-md w-full p-8 text-center">
        <div className="font-orbitron text-2xl font-black mb-4 gradient-text-solana">MYSTERY WHEEL</div>
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="font-orbitron text-lg font-bold text-white mb-4">AGE VERIFICATION</h2>
        <p className="text-gray-400 mb-6">You must be 18+ to enter.</p>
        <div className="flex gap-4">
          <button onClick={handleVerify} className="flex-1 py-3 rounded-xl font-bold bg-gradient-to-r from-[#9945FF] to-[#FF2D9B] text-white">I AM 18+</button>
          <button onClick={() => window.location.href = "https://google.com"} className="flex-1 py-3 rounded-xl font-bold border border-gray-600 text-gray-400">EXIT</button>
        </div>
      </div>
    </div>
  );
}
