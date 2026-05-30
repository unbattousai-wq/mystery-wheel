"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

interface Segment {
  label: string;
  color: string;
  multiplier: string;
  description: string;
}

const SEGMENTS: Segment[] = [
  { label: "2X", color: "#FF2D9B", multiplier: "2x", description: "Double your bet!" },
  { label: "3X", color: "#00F5FF", multiplier: "3x", description: "Triple your bet!" },
  { label: "4X", color: "#9945FF", multiplier: "4x", description: "Quadruple your bet!" },
  { label: "5X", color: "#FFD700", multiplier: "5x", description: "5x your bet!" },
  { label: "SHADOW", color: "#8B0000", multiplier: "0x", description: "The Watcher claims your bet..." },
  { label: "2X OR 0", color: "#FFFFFF", multiplier: "?", description: "50/50 chance!" },
  { label: "EXTRA", color: "#8A2BE2", multiplier: "+1", description: "Free extra spin!" },
  { label: "SOL+", color: "#14F195", multiplier: "+SOL", description: "Bonus SOL reward!" },
  { label: "$WHEEL", color: "#00FF41", multiplier: "🎰", description: "Win $WHEEL tokens!" },
  { label: "MOON", color: "#4169E1", multiplier: "100x", description: "TO THE MOON! 🌙" },
];

interface MysteryWheel3DProps {
  onSpinStart?: () => void;
  onSpinEnd?: (segment: Segment) => void;
  soundEnabled?: boolean;
}

export default function MysteryWheel3D({
  onSpinStart,
  onSpinEnd,
  soundEnabled = false,
}: MysteryWheel3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const wheelRef = useRef<THREE.Group | null>(null);
  const animationRef = useRef<number>(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [result, setResult] = useState<Segment | null>(null);
  const [showResult, setShowResult] = useState(false);

  const initScene = useCallback(() => {
    if (!containerRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x9945ff, 2, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x14f195, 2, 20);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Wheel Group
    const wheelGroup = new THREE.Group();
    wheelRef.current = wheelGroup;

    // Create wheel segments
    const segmentAngle = (Math.PI * 2) / SEGMENTS.length;

    SEGMENTS.forEach((segment, index) => {
      const geometry = new THREE.CylinderGeometry(
        3,
        3,
        0.3,
        32,
        1,
        false,
        index * segmentAngle,
        segmentAngle
      );
      const material = new THREE.MeshPhongMaterial({
        color: segment.color,
        shininess: 100,
        side: THREE.DoubleSide,
      });
      const segmentMesh = new THREE.Mesh(geometry, material);
      segmentMesh.rotation.x = Math.PI / 2;
      wheelGroup.add(segmentMesh);

      // Segment border
      const borderGeometry = new THREE.RingGeometry(2.9, 3, 32, 1, index * segmentAngle, segmentAngle);
      const borderMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        side: THREE.DoubleSide,
      });
      const border = new THREE.Mesh(borderGeometry, borderMaterial);
      border.position.z = 0.16;
      wheelGroup.add(border);
    });

    // Outer ring
    const outerRingGeometry = new THREE.TorusGeometry(3.1, 0.1, 16, 100);
    const outerRingMaterial = new THREE.MeshPhongMaterial({
      color: 0x9945ff,
      shininess: 200,
    });
    const outerRing = new THREE.Mesh(outerRingGeometry, outerRingMaterial);
    wheelGroup.add(outerRing);

    // Center hub - The Watcher
    const hubGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.4, 32);
    const hubMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a0a2e,
      shininess: 50,
    });
    const hub = new THREE.Mesh(hubGeometry, hubMaterial);
    hub.rotation.x = Math.PI / 2;
    hub.position.z = 0.1;
    wheelGroup.add(hub);

    // The Watcher's eyes
    const eyeGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const eyeMaterial = new THREE.MeshBasicMaterial({
      color: 0x9945ff,
    });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.25, 0.1, 0.3);
    wheelGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.25, 0.1, 0.3);
    wheelGroup.add(rightEye);

    // Eye glow
    const eyeGlowGeometry = new THREE.SphereGeometry(0.18, 16, 16);
    const eyeGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x9945ff,
      transparent: true,
      opacity: 0.3,
    });

    const leftEyeGlow = new THREE.Mesh(eyeGlowGeometry, eyeGlowMaterial);
    leftEyeGlow.position.set(-0.25, 0.1, 0.3);
    wheelGroup.add(leftEyeGlow);

    const rightEyeGlow = new THREE.Mesh(eyeGlowGeometry, eyeGlowMaterial);
    rightEyeGlow.position.set(0.25, 0.1, 0.3);
    wheelGroup.add(rightEyeGlow);

    scene.add(wheelGroup);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Subtle idle rotation
      if (!isSpinning && wheelRef.current) {
        wheelRef.current.rotation.z += 0.001;
      }

      // Eye pulse effect
      const time = Date.now() * 0.003;
      leftEye.scale.setScalar(1 + Math.sin(time) * 0.1);
      rightEye.scale.setScalar(1 + Math.sin(time) * 0.1);

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isSpinning]);

  useEffect(() => {
    const cleanup = initScene();
    return cleanup;
  }, [initScene]);

  const spin = useCallback(() => {
    if (isSpinning || !wheelRef.current) return;

    setIsSpinning(true);
    setShowResult(false);
    onSpinStart?.();

    // Random number of full rotations (5-10) plus random segment
    const randomSegment = Math.floor(Math.random() * SEGMENTS.length);
    const targetRotation =
      currentRotation +
      (Math.PI * 2 * (5 + Math.random() * 5)) + // Full rotations
      (randomSegment * ((Math.PI * 2) / SEGMENTS.length)); // Target segment

    const duration = 5000 + Math.random() * 2000; // 5-7 seconds
    const startTime = Date.now();
    const startRotation = wheelRef.current.rotation.z;

    const animateSpin = () => {
      if (!wheelRef.current) return;

      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for deceleration
      const easeOut = 1 - Math.pow(1 - progress, 4);

      wheelRef.current.rotation.z = startRotation + (targetRotation - startRotation) * easeOut;

      if (progress < 1) {
        requestAnimationFrame(animateSpin);
      } else {
        setCurrentRotation(targetRotation);
        setIsSpinning(false);

        // Determine winning segment
        const normalizedRotation = (targetRotation % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const segmentIndex = Math.floor(
          ((Math.PI * 2 - normalizedRotation + Math.PI / SEGMENTS.length) % (Math.PI * 2)) /
          ((Math.PI * 2) / SEGMENTS.length)
        ) % SEGMENTS.length;

        const winningSegment = SEGMENTS[segmentIndex];
        setResult(winningSegment);
        setShowResult(true);
        onSpinEnd?.(winningSegment);
      }
    };

    animateSpin();
  }, [isSpinning, currentRotation, onSpinStart, onSpinEnd]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Pointer Triangle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div
          className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[40px] border-l-transparent border-r-transparent border-t-[#FF2D9B] drop-shadow-[0_0_15px_rgba(255,45,155,0.8)]"
        />
      </div>

      {/* Wheel Container */}
      <div
        ref={containerRef}
        className="w-full aspect-square max-w-[500px] max-h-[500px]"
        style={{ minHeight: "300px" }}
      />

      {/* Spin Button */}
      <motion.button
        onClick={spin}
        disabled={isSpinning}
        className={`mt-6 px-8 py-4 rounded-xl font-orbitron text-lg uppercase tracking-wider transition-all duration-300 ${
          isSpinning
            ? "bg-gray-700 cursor-not-allowed"
            : "bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:shadow-[0_0_40px_rgba(153,69,255,0.5)] hover:-translate-y-1"
        }`}
        whileTap={!isSpinning ? { scale: 0.95 } : {}}
      >
        {isSpinning ? (
          <span className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Spinning...
          </span>
        ) : (
          "SPIN THE WHEEL"
        )}
      </motion.button>

      {/* Result Display */}
      <AnimatePresence>
        {showResult && result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div
              className="glass-card p-8 rounded-2xl text-center min-w-[250px]"
              style={{
                borderColor: result.color,
                boxShadow: `0 0 40px ${result.color}50`,
              }}
            >
              <p className="text-sm text-gray-400 font-rajdhani uppercase tracking-wider mb-2">
                You landed on
              </p>
              <h3
                className="text-4xl font-orbitron font-bold mb-2"
                style={{ color: result.color }}
              >
                {result.label}
              </h3>
              <p className="text-2xl font-bold text-white mb-3">
                {result.multiplier}
              </p>
              <p className="text-sm text-gray-300">{result.description}</p>
              <button
                onClick={() => setShowResult(false)}
                className="mt-4 px-4 py-2 text-sm bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow Effect Behind Wheel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-radial from-[#9945FF]/20 to-transparent blur-3xl pointer-events-none -z-10" />
    </div>
  );
}
