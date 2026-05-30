"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gift, Clock } from "lucide-react";

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function FreeSpinCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });
  const [isClaimable, setIsClaimable] = useState(false);

  useEffect(() => {
    // Calculate time until next free spin (e.g., every 6 hours)
    const calculateTimeLeft = () => {
      const now = new Date();
      const hours = now.getHours();
      const nextSpinHour = Math.ceil(hours / 6) * 6;
      const nextSpin = new Date(now);

      if (nextSpinHour >= 24) {
        nextSpin.setDate(nextSpin.getDate() + 1);
        nextSpin.setHours(0, 0, 0, 0);
      } else {
        nextSpin.setHours(nextSpinHour, 0, 0, 0);
      }

      const diff = nextSpin.getTime() - now.getTime();

      if (diff <= 0) {
        setIsClaimable(true);
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      setIsClaimable(false);
      return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (n: number) => n.toString().padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed left-4 top-24 z-30 hidden md:block"
    >
      <div className="glass-card p-4 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <Gift className={`w-5 h-5 ${isClaimable ? "text-[#14F195]" : "text-[#FFD700]"}`} />
          <span className="font-orbitron text-xs uppercase tracking-wider">
            {isClaimable ? "Free Spin Ready!" : "Next Free Spin"}
          </span>
        </div>

        {isClaimable ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#14F195] to-[#00F5FF] rounded-lg font-orbitron text-sm text-black uppercase tracking-wider"
          >
            Claim Now!
          </motion.button>
        ) : (
          <div className="flex items-center justify-center gap-2">
            {[
              { value: timeLeft.hours, label: "H" },
              { value: timeLeft.minutes, label: "M" },
              { value: timeLeft.seconds, label: "S" },
            ].map((item, index) => (
              <div key={item.label} className="flex items-center">
                <div className="bg-black/50 rounded-lg px-3 py-2 text-center min-w-[50px]">
                  <span className="text-2xl font-orbitron font-bold text-[#9945FF]">
                    {formatNumber(item.value)}
                  </span>
                  <span className="text-[10px] text-gray-500 ml-1">{item.label}</span>
                </div>
                {index < 2 && (
                  <span className="text-[#9945FF] text-xl mx-1">:</span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-1 mt-3 text-[10px] text-gray-500">
          <Clock className="w-3 h-3" />
          <span>Free spin every 6 hours</span>
        </div>
      </div>
    </motion.div>
  );
}
