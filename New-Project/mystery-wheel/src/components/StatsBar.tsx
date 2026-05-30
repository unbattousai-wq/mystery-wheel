"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Trophy, Coins, Moon, TrendingUp } from "lucide-react";

interface Stat {
  icon: React.ElementType;
  label: string;
  value: string;
  subtext: string;
  color: string;
  trend?: string;
}

export default function StatsBar() {
  const [stats, setStats] = useState<Stat[]>([
    {
      icon: TrendingUp,
      label: "Total Spins",
      value: "1,234,567",
      subtext: "All time",
      color: "#9945FF",
      trend: "+2.4K today",
    },
    {
      icon: Trophy,
      label: "Jackpot Fund",
      value: "847.5 SOL",
      subtext: "Current pool",
      color: "#FFD700",
      trend: "+12.3 SOL",
    },
    {
      icon: Flame,
      label: "$WHEEL Burned",
      value: "45.2M",
      subtext: "Forever gone",
      color: "#FF2D9B",
      trend: "Deflationary",
    },
    {
      icon: Moon,
      label: "Moon Chance",
      value: "1%",
      subtext: "Current odds",
      color: "#4169E1",
      trend: "100x payout",
    },
  ]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((stat) => {
          if (stat.label === "Total Spins") {
            const current = parseInt(stat.value.replace(/,/g, ""));
            const newValue = current + Math.floor(Math.random() * 10);
            return {
              ...stat,
              value: newValue.toLocaleString(),
            };
          }
          if (stat.label === "Jackpot Fund") {
            const current = parseFloat(stat.value.replace(" SOL", ""));
            const newValue = current + Math.random() * 0.5;
            return {
              ...stat,
              value: `${newValue.toFixed(1)} SOL`,
            };
          }
          return stat;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-card p-6 rounded-xl relative overflow-hidden group"
            >
              {/* Background Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${stat.color} 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  {stat.trend && (
                    <span
                      className="text-xs font-rajdhani px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${stat.color}20`,
                        color: stat.color,
                      }}
                    >
                      {stat.trend}
                    </span>
                  )}
                </div>

                <h3
                  className="text-2xl md:text-3xl font-orbitron font-bold mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </h3>
                <p className="text-sm font-rajdhani text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-xs text-gray-500 mt-1">{stat.subtext}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
