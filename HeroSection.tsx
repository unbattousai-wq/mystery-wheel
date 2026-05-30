"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, TrendingUp } from "lucide-react";

interface HeroSectionProps {
  onScrollToWheel: () => void;
}

export default function HeroSection({ onScrollToWheel }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-10 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-[#9945FF]/10 via-transparent to-transparent opacity-50" />

      {/* Animated Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#9945FF]/30 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="w-5 h-5 text-[#FFD700]" />
          <span className="text-sm font-rajdhani uppercase tracking-[0.3em] text-gray-400">
            The Ultimate Solana Gaming Experience
          </span>
          <Sparkles className="w-5 h-5 text-[#FFD700]" />
        </motion.div>

        {/* Main Title - Glitch Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative mb-6"
        >
          <h1 className="font-orbitron text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight">
            <span className="block gradient-text animate-glitch">
              SPIN THE
            </span>
            <span className="block text-white mt-2 relative">
              UNKNOWN
              <motion.span
                className="absolute inset-0 text-[#FF2D9B] opacity-50 blur-sm"
                animate={{
                  x: [0, -2, 2, 0],
                  y: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                UNKNOWN
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-space leading-relaxed"
        >
          The Watcher awaits. Spin the mystery wheel for a chance to multiply your SOL,
          win exclusive tokens, or face the shadow. Your destiny is one spin away.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            onClick={onScrollToWheel}
            className="group relative px-8 py-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-xl font-orbitron text-lg uppercase tracking-wider overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Start Spinning
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#14F195] to-[#9945FF]"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.a
            href="#tokenomics"
            className="px-8 py-4 border-2 border-[#14F195] rounded-xl font-orbitron text-lg uppercase tracking-wider text-[#14F195] hover:bg-[#14F195]/10 transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <TrendingUp className="w-5 h-5" />
            View Tokenomics
          </motion.a>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {[
            { label: "Total Spins", value: "1.2M+", color: "#9945FF" },
            { label: "SOL Won", value: "45,000+", color: "#14F195" },
            { label: "Active Players", value: "12.5K", color: "#00F5FF" },
            { label: "Moon Hits", value: "847", color: "#FFD700" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card p-4 md:p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <p
                className="text-2xl md:text-3xl font-orbitron font-bold mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-gray-500 font-rajdhani uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-[#9945FF]/50 rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-3 bg-[#9945FF] rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
