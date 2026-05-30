"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Zap } from "lucide-react";

interface Activity {
  id: string;
  wallet: string;
  action: string;
  amount: string;
  segment: string;
  color: string;
  timestamp: Date;
}

const SEGMENT_COLORS: Record<string, string> = {
  "2X": "#FF2D9B",
  "3X": "#00F5FF",
  "4X": "#9945FF",
  "5X": "#FFD700",
  "SHADOW": "#8B0000",
  "2X OR 0": "#FFFFFF",
  "EXTRA": "#8A2BE2",
  "SOL+": "#14F195",
  "$WHEEL": "#00FF41",
  "MOON": "#4169E1",
};

const generateFakeActivity = (): Activity => {
  const segments = Object.keys(SEGMENT_COLORS);
  const segment = segments[Math.floor(Math.random() * segments.length)];
  const wallets = [
    "Pha...tom", "Sol...are", "Bac...ack", "Led...ger", "Mag...ic",
    "7xK...9pQ", "Dre...mer", "Cry...pto", "Web...3er", "Ano...n",
  ];
  const amounts = ["0.5", "1", "2", "5", "10", "0.1", "0.25", "3"];

  return {
    id: Math.random().toString(36).substring(7),
    wallet: wallets[Math.floor(Math.random() * wallets.length)],
    action: segment === "SHADOW" ? "lost" : "won",
    amount: amounts[Math.floor(Math.random() * amounts.length)],
    segment,
    color: SEGMENT_COLORS[segment],
    timestamp: new Date(),
  };
};

export default function LiveActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Initialize with some activities
    const initialActivities = Array(5).fill(null).map(generateFakeActivity);
    setActivities(initialActivities);

    // Add new activities periodically
    const interval = setInterval(() => {
      setActivities((prev) => {
        const newActivity = generateFakeActivity();
        return [newActivity, ...prev.slice(0, 9)];
      });
    }, 3000 + Math.random() * 5000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile) {
      setIsExpanded(false);
    }
  }, [isMobile]);

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
      <motion.div
        className="glass-card rounded-l-xl overflow-hidden"
        initial={{ x: 100 }}
        animate={{ x: isExpanded ? 0 : 240 }}
        transition={{ type: "spring", damping: 20 }}
      >
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#9945FF]/20 to-transparent border-b border-white/10"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#14F195]" />
            <span className="font-orbitron text-xs uppercase tracking-wider">
              Live Activity
            </span>
            <span className="w-2 h-2 rounded-full bg-[#14F195] animate-pulse" />
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {/* Activity List */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-2 max-h-[400px] overflow-y-auto no-scrollbar">
                <AnimatePresence mode="popLayout">
                  {activities.map((activity) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: 20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      className="p-3 rounded-lg bg-white/5 mb-2 last:mb-0"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ backgroundColor: `${activity.color}30`, color: activity.color }}
                          >
                            {activity.segment.slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-xs font-mono text-gray-400">
                              {activity.wallet}
                            </p>
                            <p className="text-sm font-medium">
                              <span
                                className={
                                  activity.action === "won"
                                    ? "text-[#14F195]"
                                    : "text-[#8B0000]"
                                }
                              >
                                {activity.action}
                              </span>{" "}
                              <span style={{ color: activity.color }}>
                                {activity.segment}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-white">
                            {activity.action === "won" ? "+" : "-"}
                            {activity.amount} SOL
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
