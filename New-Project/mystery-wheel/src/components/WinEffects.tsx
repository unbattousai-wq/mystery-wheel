"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  rotation: number;
  rotationSpeed: number;
  type: "star" | "circle" | "diamond" | "ring";
}

interface WinEffectsProps {
  trigger: boolean;
  result: { label: string; color: string } | null;
}

export default function WinEffects({ trigger, result }: WinEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  const isActive = trigger && result !== null;
  const color = result?.color || "#9945FF";

  const particleCounts = useMemo(() => ({
    low: 30,
    medium: 60,
    high: 100,
    extreme: 200,
  }), []);

  const colors = useMemo(() => [color, "#FFD700", "#FFFFFF", "#14F195"], [color]);

  const createParticle = useCallback(
    (canvas: HTMLCanvasElement): Particle => {
      const types: Particle["type"][] = ["star", "circle", "diamond", "ring"];

      return {
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 0.5) * 20 - 5,
        size: Math.random() * 15 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        type: types[Math.floor(Math.random() * types.length)],
      };
    },
    [colors]
  );

  const drawParticle = useCallback(
    (ctx: CanvasRenderingContext2D, particle: Particle) => {
      ctx.save();
      ctx.globalAlpha = particle.alpha;
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.fillStyle = particle.color;
      ctx.strokeStyle = particle.color;
      ctx.lineWidth = 2;

      switch (particle.type) {
        case "star":
          const spikes = 5;
          const outerRadius = particle.size;
          const innerRadius = particle.size / 2;
          ctx.beginPath();
          for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (i * Math.PI) / spikes - Math.PI / 2;
            if (i === 0) {
              ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
            } else {
              ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
            }
          }
          ctx.closePath();
          ctx.fill();
          break;

        case "circle":
          ctx.beginPath();
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
          ctx.fill();
          break;

        case "diamond":
          ctx.beginPath();
          ctx.moveTo(0, -particle.size);
          ctx.lineTo(particle.size * 0.6, 0);
          ctx.lineTo(0, particle.size);
          ctx.lineTo(-particle.size * 0.6, 0);
          ctx.closePath();
          ctx.fill();
          break;

        case "ring":
          ctx.beginPath();
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
          ctx.stroke();
          break;
      }

      ctx.restore();
    },
    []
  );

  useEffect(() => {
    if (!isActive) {
      particlesRef.current = [];
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create initial particles
    const count = particleCounts.medium;
    for (let i = 0; i < count; i++) {
      particlesRef.current.push(createParticle(canvas));
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.3;
        particle.rotation += particle.rotationSpeed;
        particle.alpha -= 0.01;
        particle.vx *= 0.99;

        if (particle.alpha > 0) {
          drawParticle(ctx, particle);
        }

        return particle.alpha > 0;
      });

      if (particlesRef.current.length > 0) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isActive, createParticle, drawParticle, particleCounts]);

  if (!isActive) return null;

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 pointer-events-none z-40"
        style={{ backgroundColor: color }}
      />
    </>
  );
}
