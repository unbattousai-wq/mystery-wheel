"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Menu,
  X,
  Twitter,
  MessageCircle,
  BookOpen,
} from "lucide-react";
import WalletConnect from "./WalletConnect";

interface NavigationProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function Navigation({
  soundEnabled,
  onToggleSound,
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#wheel", label: "Wheel" },
    { href: "#segments", label: "Segments" },
    { href: "#tokenomics", label: "Tokenomics" },
    { href: "#whitepaper", label: "White Pepper" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/mysterywheelsol", label: "Twitter" },
    { icon: MessageCircle, href: "https://discord.gg/mysterywheel", label: "Discord" },
    { icon: BookOpen, href: "#whitepaper", label: "Docs" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-2 bg-black/80 backdrop-blur-xl border-b border-[#9945FF]/20"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <div className="absolute inset-0 bg-gradient-to-br from-[#9945FF] to-[#14F195] rounded-xl animate-spin-slow opacity-50" />
              <div className="absolute inset-1 bg-black rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎰</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-orbitron font-bold text-lg md:text-xl tracking-wider">
                <span className="text-[#9945FF]">MYSTERY</span>
                <span className="text-[#14F195]">WHEEL</span>
              </h1>
              <p className="text-[10px] text-gray-500 tracking-widest uppercase">
                Spin The Unknown
              </p>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-sm font-rajdhani font-medium text-gray-300 hover:text-[#14F195] transition-colors relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#9945FF] to-[#14F195] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Social Icons - Hidden on Mobile */}
            <div className="hidden md:flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-[#14F195] transition-colors" />
                </a>
              ))}
            </div>

            {/* Sound Toggle */}
            <button
              onClick={onToggleSound}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors group"
              aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-[#14F195]" />
              ) : (
                <VolumeX className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              )}
            </button>

            {/* Wallet Connect */}
            <WalletConnect />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#FF2D9B]" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute top-20 left-4 right-4 glass-card p-6 rounded-2xl"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-rajdhani font-medium text-gray-300 hover:text-[#14F195] transition-colors py-2 border-b border-white/5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              {/* Mobile Social Links */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-white/10">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6 text-[#14F195]" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
