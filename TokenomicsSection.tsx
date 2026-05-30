"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  PieChart,
  Users,
  Code,
  Droplets,
  Megaphone,
  Flame,
  TrendingUp,
  Lock
} from "lucide-react";

interface TokenAllocation {
  name: string;
  percentage: number;
  amount: string;
  color: string;
  icon: React.ElementType;
  description: string;
  vesting?: string;
}

const ALLOCATIONS: TokenAllocation[] = [
  {
    name: "Community & Staking",
    percentage: 50,
    amount: "500,000,000",
    color: "#14F195",
    icon: Users,
    description: "Rewards for spinners, stakers, and community incentives.",
    vesting: "Released over 4 years",
  },
  {
    name: "Development Team",
    percentage: 20,
    amount: "200,000,000",
    color: "#9945FF",
    icon: Code,
    description: "Core team allocation with extended vesting.",
    vesting: "4-year vesting, 1-year cliff",
  },
  {
    name: "Liquidity Pool",
    percentage: 20,
    amount: "200,000,000",
    color: "#00F5FF",
    icon: Droplets,
    description: "DEX liquidity and market making operations.",
    vesting: "Locked permanently",
  },
  {
    name: "Marketing",
    percentage: 10,
    amount: "100,000,000",
    color: "#FF2D9B",
    icon: Megaphone,
    description: "Partnerships, influencers, and growth campaigns.",
    vesting: "Released quarterly",
  },
];

const METRICS = [
  { label: "Total Supply", value: "1,000,000,000", icon: PieChart },
  { label: "Circulating", value: "234,567,890", icon: TrendingUp },
  { label: "Burned", value: "45,200,000", icon: Flame },
  { label: "Locked", value: "720,232,110", icon: Lock },
];

export default function TokenomicsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tokenomics" className="py-20 px-4 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#9945FF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#14F195]/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">$WHEEL Tokenomics</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-space">
            A deflationary token designed for long-term value accrual.
            Every Shadow spin burns tokens forever.
          </p>
        </motion.div>

        {/* Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {METRICS.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <metric.icon className="w-8 h-8 mx-auto mb-3 text-[#9945FF]" />
              <p className="text-2xl md:text-3xl font-orbitron font-bold gradient-text">
                {metric.value}
              </p>
              <p className="text-sm text-gray-500 font-rajdhani uppercase tracking-wider mt-1">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Allocation Bars */}
        <div className="max-w-4xl mx-auto space-y-6">
          {ALLOCATIONS.map((allocation, index) => (
            <motion.div
              key={allocation.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-xl"
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${allocation.color}20` }}
                >
                  <allocation.icon
                    className="w-6 h-6"
                    style={{ color: allocation.color }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-orbitron font-bold text-lg">
                      {allocation.name}
                    </h3>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: allocation.color }}
                    >
                      {allocation.percentage}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">
                    {allocation.description}
                  </p>
                  {allocation.vesting && (
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      {allocation.vesting}
                    </p>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-4 bg-black/50 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${allocation.color}80, ${allocation.color})`,
                  }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${allocation.percentage}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full opacity-50"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${allocation.color}, transparent)`,
                  }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${allocation.percentage}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: index * 0.2 + 0.5, ease: "easeOut" }}
                />
              </div>

              {/* Amount Label */}
              <p className="text-right text-xs text-gray-500 mt-2 font-mono">
                {allocation.amount} $WHEEL
              </p>
            </motion.div>
          ))}
        </div>

        {/* Buy Token CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-4 flex-wrap justify-center">
            <a
              href="#"
              className="px-8 py-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-xl font-orbitron text-sm uppercase tracking-wider hover:shadow-[0_0_30px_rgba(153,69,255,0.5)] transition-all duration-300"
            >
              Buy $WHEEL on Raydium
            </a>
            <a
              href="#"
              className="px-8 py-4 border-2 border-[#14F195] rounded-xl font-orbitron text-sm uppercase tracking-wider text-[#14F195] hover:bg-[#14F195]/10 transition-colors"
            >
              View on DexScreener
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Contract: WHeEL...xxxxx (verified on Solscan)
          </p>
        </motion.div>
      </div>
    </section>
  );
}
