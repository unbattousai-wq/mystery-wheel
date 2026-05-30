"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WalletProvider from "@/components/WalletProvider";
import Navigation from "@/components/Navigation";
import BackgroundEffects from "@/components/BackgroundEffects";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import SegmentsSection from "@/components/SegmentsSection";
import WinnersSection from "@/components/WinnersSection";
import WhitePaperSection from "@/components/WhitePaperSection";
import TokenomicsSection from "@/components/TokenomicsSection";
import LiveActivityFeed from "@/components/LiveActivityFeed";
import FreeSpinCountdown from "@/components/FreeSpinCountdown";
import AgeVerification from "@/components/AgeVerification";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import MysteryWheel3D from "@/components/MysteryWheel3D";

function MysteryWheelApp() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const scrollToWheel = () => {
    document.getElementById("wheel")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <AgeVerification onVerified={() => setIsVerified(true)} />
      {isVerified && !isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      <AnimatePresence>
        {isVerified && isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen relative"
          >
            <BackgroundEffects />
            <Navigation soundEnabled={soundEnabled} onToggleSound={() => setSoundEnabled(!soundEnabled)} />
            <LiveActivityFeed />
            <FreeSpinCountdown />

            <main className="relative z-20">
              <HeroSection onScrollToWheel={scrollToWheel} />

              {/* Wheel Section */}
              <section id="wheel" className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-center font-orbitron text-3xl md:text-4xl font-black mb-8 gradient-text-solana">
                    SPIN THE WHEEL
                  </h2>
                  <MysteryWheel3D />
                </div>
              </section>

              <StatsBar />
              <SegmentsSection />
              <WinnersSection />
              <WhitePaperSection />
              <TokenomicsSection />
              <Footer />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Home() {
  return (
    <WalletProvider>
      <MysteryWheelApp />
    </WalletProvider>
  );
}
