"use client";

import { motion } from "framer-motion";
import { Star, Quote, Trophy } from "lucide-react";

interface Winner {
  id: number;
  name: string;
  avatar: string;
  wallet: string;
  amount: string;
  segment: string;
  color: string;
  testimonial: string;
  date: string;
}

const WINNERS: Winner[] = [
  {
    id: 1,
    name: "CryptoKing",
    avatar: "👑",
    wallet: "7xK...9pQ",
    amount: "847.5 SOL",
    segment: "MOON",
    color: "#4169E1",
    testimonial: "Hit the MOON on my first spin! Changed my life forever. The Watcher blessed me that day.",
    date: "2 hours ago",
  },
  {
    id: 2,
    name: "DiamondHands",
    avatar: "💎",
    wallet: "Dre...mer",
    amount: "125.3 SOL",
    segment: "5X",
    color: "#FFD700",
    testimonial: "Kept spinning through the shadows, patience paid off with a massive 5X hit!",
    date: "5 hours ago",
  },
  {
    id: 3,
    name: "SolanaQueen",
    avatar: "👸",
    wallet: "Sol...are",
    amount: "89.7 SOL",
    segment: "SOL+",
    color: "#14F195",
    testimonial: "The SOL+ segment is my favorite. Three hits in a row, straight from the jackpot pool!",
    date: "8 hours ago",
  },
  {
    id: 4,
    name: "PhantomWhale",
    avatar: "🐋",
    wallet: "Pha...tom",
    amount: "456.2 SOL",
    segment: "MOON",
    color: "#4169E1",
    testimonial: "Second MOON hit this month. The mystery wheel is pure magic.",
    date: "1 day ago",
  },
  {
    id: 5,
    name: "LuckyApe",
    avatar: "🦍",
    wallet: "Bac...ack",
    amount: "67.8 SOL",
    segment: "4X",
    color: "#9945FF",
    testimonial: "Started with 15 SOL, walked away with 67. The purple 4X is underrated!",
    date: "1 day ago",
  },
  {
    id: 6,
    name: "MoonBoy",
    avatar: "🌙",
    wallet: "Web...3er",
    amount: "234.1 SOL",
    segment: "$WHEEL",
    color: "#00FF41",
    testimonial: "Won massive $WHEEL tokens, staked them, now earning passive income daily!",
    date: "2 days ago",
  },
];

export default function WinnersSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#9945FF]/5 to-transparent" />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-[#FFD700]" />
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold">
              <span className="gradient-text-gold">Hall of Winners</span>
            </h2>
            <Trophy className="w-8 h-8 text-[#FFD700]" />
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto font-space">
            The chosen few who conquered The Watcher. Will you join them?
          </p>
        </motion.div>

        {/* Winners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WINNERS.map((winner, index) => (
            <motion.div
              key={winner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-card p-6 rounded-xl relative overflow-hidden group"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-white/10 group-hover:text-white/20 transition-colors" />

              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                  style={{ backgroundColor: `${winner.color}20` }}
                >
                  {winner.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-orbitron font-bold text-lg text-white">
                    {winner.name}
                  </h3>
                  <p className="text-xs font-mono text-gray-500">
                    {winner.wallet}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: `${winner.color}30`,
                        color: winner.color,
                      }}
                    >
                      {winner.segment}
                    </span>
                    <span className="text-xs text-gray-500">{winner.date}</span>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">
                &quot;{winner.testimonial}&quot;
              </p>

              {/* Amount Won */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      style={{
                        color: winner.color,
                        fill: winner.color,
                      }}
                    />
                  ))}
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase">Won</p>
                  <p
                    className="text-xl font-orbitron font-bold"
                    style={{ color: winner.color }}
                  >
                    {winner.amount}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#14F195] hover:text-white transition-colors font-rajdhani uppercase tracking-wider"
          >
            View All Winners
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
