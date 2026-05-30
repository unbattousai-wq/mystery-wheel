"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Sparkles,
  Skull,
  HelpCircle,
  Gift,
  Coins,
  Moon,
  Flame,
  CircleDollarSign,
  Star
} from "lucide-react";

interface Segment {
  label: string;
  multiplier: string;
  description: string;
  color: string;
  icon: React.ElementType;
  chance: string;
  details: string;
}

const SEGMENTS: Segment[] = [
  {
    label: "2X",
    multiplier: "2x",
    description: "Double Up",
    color: "#FF2D9B",
    icon: Zap,
    chance: "15%",
    details: "Your bet is doubled! A solid win to keep the momentum going.",
  },
  {
    label: "3X",
    multiplier: "3x",
    description: "Triple Threat",
    color: "#00F5FF",
    icon: Sparkles,
    chance: "12%",
    details: "Triple your investment with this cyan beauty.",
  },
  {
    label: "4X",
    multiplier: "4x",
    description: "Quad Power",
    color: "#9945FF",
    icon: Star,
    chance: "10%",
    details: "Four times the fun, four times the gains!",
  },
  {
    label: "5X",
    multiplier: "5x",
    description: "Golden Glory",
    color: "#FFD700",
    icon: Coins,
    chance: "8%",
    details: "The golden segment - 5x your bet awaits!",
  },
  {
    label: "SHADOW",
    multiplier: "0x",
    description: "The Watcher Claims",
    color: "#8B0000",
    icon: Skull,
    chance: "20%",
    details: "The Watcher takes your bet into the void. High risk, high stakes.",
  },
  {
    label: "2X OR 0",
    multiplier: "?",
    description: "Gambler's Fate",
    color: "#FFFFFF",
    icon: HelpCircle,
    chance: "10%",
    details: "50/50 chance to double or lose it all. Pure chaos.",
  },
  {
    label: "EXTRA",
    multiplier: "+1 Spin",
    description: "Bonus Round",
    color: "#8A2BE2",
    icon: Gift,
    chance: "8%",
    details: "Win a free spin! Your current bet stays safe.",
  },
  {
    label: "SOL+",
    multiplier: "+SOL",
    description: "Solana Bonus",
    color: "#14F195",
    icon: CircleDollarSign,
    chance: "7%",
    details: "Direct SOL bonus from the jackpot pool!",
  },
  {
    label: "$WHEEL",
    multiplier: "Tokens",
    description: "Token Drop",
    color: "#00FF41",
    icon: Flame,
    chance: "9%",
    details: "Win $WHEEL tokens - stake them for passive income!",
  },
  {
    label: "MOON",
    multiplier: "100x",
    description: "To The Moon",
    color: "#4169E1",
    icon: Moon,
    chance: "1%",
    details: "The legendary 100x multiplier. Dreams come true here. 🌙",
  },
];

export default function SegmentsSection() {
  return (
    <section id="segments" className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Wheel Segments</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-space">
            Each segment holds a different fate. Study them well, for The Watcher shows no mercy.
          </p>
        </motion.div>

        {/* Segments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {SEGMENTS.map((segment, index) => (
            <motion.div
              key={segment.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="glass-card p-6 rounded-xl relative overflow-hidden group cursor-pointer"
              style={{
                borderColor: `${segment.color}40`,
              }}
            >
              {/* Hover Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${segment.color} 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                {/* Icon & Chance */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${segment.color}20` }}
                  >
                    <segment.icon
                      className="w-7 h-7"
                      style={{ color: segment.color }}
                    />
                  </div>
                  <span
                    className="text-xs font-mono px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: `${segment.color}20`,
                      color: segment.color,
                    }}
                  >
                    {segment.chance}
                  </span>
                </div>

                {/* Label & Multiplier */}
                <h3
                  className="text-xl font-orbitron font-bold mb-1"
                  style={{ color: segment.color }}
                >
                  {segment.label}
                </h3>
                <p className="text-2xl font-bold text-white mb-2">
                  {segment.multiplier}
                </p>
                <p className="text-sm text-gray-400 font-rajdhani uppercase tracking-wider mb-3">
                  {segment.description}
                </p>

                {/* Details */}
                <p className="text-xs text-gray-500 leading-relaxed">
                  {segment.details}
                </p>
              </div>

              {/* Bottom Gradient Line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 opacity-50 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(90deg, transparent, ${segment.color}, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass-card p-6 rounded-xl border-[#8B0000]/50 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Skull className="w-6 h-6 text-[#8B0000]" />
            <span className="font-orbitron text-lg text-[#8B0000]">
              SHADOW WARNING
            </span>
            <Skull className="w-6 h-6 text-[#8B0000]" />
          </div>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            The Shadow segment appears 20% of the time. When The Watcher claims your bet,
            50% goes to the jackpot pool and 50% is burned forever. Spin responsibly.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
