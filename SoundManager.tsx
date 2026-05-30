"use client";
import { useEffect, useCallback, useRef } from "react";

const VOICE_LINES: Record<string, string> = {
  "2X": "Double. Not bad.",
  "3X": "Triple. The wheel favors you.",
  "4X": "Four times. You have a gift.",
  "5X": "Five times. Absolute legend.",
  "SHADOW": "The shadow claims what is hers.",
  "EXTRA": "Again. The wheel grants you another chance.",
  "SOL+": "Solana rewards the brave.",
  "$WHEEL": "The tokens flow to you.",
  "MOON": "The Mystery Moon has chosen you.",
};

export default function SoundManager({ soundEnabled, result }: { soundEnabled: boolean; result: { label: string } | null }) {
  const audioCtx = useRef<AudioContext | null>(null);

  useEffect(() => {
    const init = () => { audioCtx.current = new AudioContext(); };
    window.addEventListener("click", init, { once: true });
    return () => window.removeEventListener("click", init);
  }, []);

  const playSound = useCallback((freq: number, dur: number) => {
    if (!soundEnabled || !audioCtx.current) return;
    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.current.destination);
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.1, audioCtx.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + dur);
    osc.start();
    osc.stop(audioCtx.current.currentTime + dur);
  }, [soundEnabled]);

  const speak = useCallback((text: string) => {
    if (!soundEnabled || typeof window === "undefined") return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }, [soundEnabled]);

  useEffect(() => {
    if (!result || !soundEnabled) return;
    const voiceLine = VOICE_LINES[result.label];
    if (result.label === "MOON") [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => playSound(f, 0.3), i * 100));
    else if (result.label === "SHADOW") playSound(80, 0.8);
    else playSound(440, 0.2);
    if (voiceLine) setTimeout(() => speak(voiceLine), 500);
  }, [result, soundEnabled, playSound, speak]);

  return null;
}
