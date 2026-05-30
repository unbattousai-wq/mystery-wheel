"use client";

import { useEffect, useRef } from "react";

interface ConfettiExplosionProps {
  trigger: boolean;
  color?: string;
}

const COLORS = ["#9945FF", "#14F195", "#FF2D9B", "#00F5FF", "#FFD700"];

export default function ConfettiExplosion({ trigger, color }: ConfettiExplosionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Array<{x: number; y: number; vx: number; vy: number; color: string; size: number; life: number}>>([]);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    const colors = color ? [color, ...COLORS] : COLORS;
    particles.current = [];
    for (let i = 0; i < 150; i++) {
      particles.current.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 20,
        vy: Math.random() * -20 - 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        life: 100 + Math.random() * 50
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.5;
        p.life--;

        if (p.life > 0) {
          ctx.globalAlpha = p.life / 150;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size * 0.6);
          return true;
        }
        return false;
      });

      if (particles.current.length > 0) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [trigger, color]);

  if (!trigger) return null;

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />;
}
