"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[300] bg-black flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 mx-auto mb-8 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(153, 69, 255, 0.3) 0%, transparent 70%)" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-orbitron text-3xl md:text-5xl font-black gradient-text-solana mb-4"
        >
          MYSTERY WHEEL
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-[#14F195] text-sm tracking-[0.3em] font-orbitron"
        >
          LOADING...
        </motion.div>
        <motion.div className="w-48 h-1 bg-gray-900 rounded-full mx-auto mt-8 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full rounded-full bg-gradient-to-r from-[#9945FF] to-[#FF2D9B]"
          />
        </motion.div>
      </div>
    </div>
  );
}
