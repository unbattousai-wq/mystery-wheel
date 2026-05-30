"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  type: "smoke" | "diamond" | "trail";
}

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  const colors = ["#9945FF", "#14F195", "#FF2D9B", "#00F5FF", "#FFD700"];

  const createSmokeParticle = useCallback((canvas: HTMLCanvasElement): Particle => {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 50,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -Math.random() * 1 - 0.5,
      size: Math.random() * 60 + 30,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.1 + 0.05,
      decay: 0.0005,
      type: "smoke",
    };
  }, []);

  const createDiamondParticle = useCallback((canvas: HTMLCanvasElement): Particle => {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.2,
      decay: 0,
      type: "diamond",
    };
  }, []);

  const createTrailParticle = useCallback((x: number, y: number): Particle => {
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 0.8,
      decay: 0.02,
      type: "trail",
    };
  }, []);

  const drawDiamond = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string,
    alpha: number
  ) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x + size * 0.6, y);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x - size * 0.6, y);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }, []);

  useEffect(() => {
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

    // Initialize particles
    for (let i = 0; i < 15; i++) {
      particlesRef.current.push(createSmokeParticle(canvas));
    }
    for (let i = 0; i < 30; i++) {
      particlesRef.current.push(createDiamondParticle(canvas));
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      // Create trail particles on mouse move (limited rate)
      if (Math.random() > 0.7) {
        particlesRef.current.push(createTrailParticle(e.clientX, e.clientY));
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.alpha -= particle.decay;

        if (particle.type === "smoke") {
          // Draw smoke
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size
          );
          gradient.addColorStop(0, `${particle.color}${Math.floor(particle.alpha * 255).toString(16).padStart(2, "0")}`);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.fillRect(
            particle.x - particle.size,
            particle.y - particle.size,
            particle.size * 2,
            particle.size * 2
          );

          // Reset smoke when off screen
          if (particle.y < -particle.size || particle.alpha <= 0) {
            Object.assign(particle, createSmokeParticle(canvas));
          }
        } else if (particle.type === "diamond") {
          // Float animation for diamonds
          particle.y += Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.2;
          particle.alpha = 0.2 + Math.sin(Date.now() * 0.002 + particle.x * 0.02) * 0.15;

          drawDiamond(ctx, particle.x, particle.y, particle.size, particle.color, particle.alpha);

          // Wrap around screen
          if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
          if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
          if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
          if (particle.y > canvas.height + particle.size) particle.y = -particle.size;
        } else if (particle.type === "trail") {
          // Draw trail particle
          ctx.save();
          ctx.globalAlpha = particle.alpha;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        return particle.alpha > 0 || particle.type !== "trail";
      });

      // Limit trail particles
      const trailCount = particlesRef.current.filter((p) => p.type === "trail").length;
      if (trailCount > 50) {
        particlesRef.current = particlesRef.current.filter((p) => {
          if (p.type === "trail" && Math.random() > 0.8) return false;
          return true;
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [createSmokeParticle, createDiamondParticle, createTrailParticle, drawDiamond]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
