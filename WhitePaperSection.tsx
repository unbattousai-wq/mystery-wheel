"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  Shield,
  Zap,
  Users,
  Code,
  Lock,
  Sparkles,
  ExternalLink
} from "lucide-react";

interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  content: string[];
}

const WHITE_PAPER_SECTIONS: Section[] = [
  {
    id: "overview",
    title: "Overview",
    icon: BookOpen,
    content: [
      "Mystery Wheel is a decentralized gaming protocol built on Solana, combining provably fair randomness with DeFi tokenomics.",
      "The Watcher, our enigmatic mascot, oversees all spins with transparent on-chain verification.",
      "Every spin is recorded on the blockchain, ensuring complete transparency and fairness.",
    ],
  },
  {
    id: "technology",
    title: "Technology Stack",
    icon: Code,
    content: [
      "Built on Solana for lightning-fast transactions and minimal fees.",
      "Verifiable Random Function (VRF) integration for provably fair outcomes.",
      "Smart contracts audited by leading security firms.",
      "Real-time WebSocket connections for instant result verification.",
    ],
  },
  {
    id: "security",
    title: "Security & Fairness",
    icon: Shield,
    content: [
      "All smart contracts are open-source and verified on-chain.",
      "Multi-signature treasury controlled by the DAO.",
      "Bug bounty program with rewards up to 100,000 $WHEEL.",
      "Regular third-party audits and penetration testing.",
    ],
  },
  {
    id: "tokenomics",
    title: "Tokenomics",
    icon: Sparkles,
    content: [
      "Total Supply: 1,000,000,000 $WHEEL tokens.",
      "50% allocated to community rewards and staking.",
      "20% reserved for development and team (4-year vesting).",
      "20% for liquidity and market making.",
      "10% for marketing and partnerships.",
    ],
  },
  {
    id: "governance",
    title: "DAO Governance",
    icon: Users,
    content: [
      "$WHEEL holders can vote on protocol upgrades and fee structures.",
      "Proposal threshold: 100,000 $WHEEL to submit.",
      "Voting period: 7 days with 51% quorum requirement.",
      "Treasury grants distributed monthly based on community votes.",
    ],
  },
  {
    id: "roadmap",
    title: "Roadmap",
    icon: Zap,
    content: [
      "Q1 2024: Launch on Solana mainnet, initial liquidity deployment.",
      "Q2 2024: Mobile app launch, cross-chain bridge to Ethereum.",
      "Q3 2024: NFT integration, VIP tiers, tournament mode.",
      "Q4 2024: DAO governance activation, community takeover.",
    ],
  },
];

export default function WhitePaperSection() {
  const [expandedSection, setExpandedSection] = useState<string | null>("overview");

  return (
    <section id="whitepaper" className="py-20 px-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              #9945FF 10px,
              #9945FF 11px
            )`,
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-[#9945FF]" />
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold">
              <span className="gradient-text">White Pepper</span>
            </h2>
            <Lock className="w-8 h-8 text-[#14F195]" />
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto font-space">
            Deep dive into the technology, tokenomics, and vision behind Mystery Wheel.
          </p>
        </motion.div>

        {/* Accordion Sections */}
        <div className="max-w-4xl mx-auto space-y-4">
          {WHITE_PAPER_SECTIONS.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass-card rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedSection(
                    expandedSection === section.id ? null : section.id
                  )
                }
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#9945FF]/20 flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-[#9945FF]" />
                  </div>
                  <h3 className="font-orbitron text-lg font-bold">
                    {section.title}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                    expandedSection === section.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pl-[88px]">
                      <ul className="space-y-3">
                        {section.content.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-gray-300"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#14F195] mt-2 flex-shrink-0" />
                            <span className="font-space text-sm leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Download Full Paper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 glass-card rounded-xl hover:border-[#9945FF] transition-all duration-300 group"
          >
            <BookOpen className="w-5 h-5 text-[#9945FF]" />
            <span className="font-orbitron text-sm uppercase tracking-wider">
              Download Full White Pepper (PDF)
            </span>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#14F195] transition-colors" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
