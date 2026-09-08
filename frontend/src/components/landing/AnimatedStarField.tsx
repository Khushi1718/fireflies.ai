"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  vx: number;
  vy: number;
  isGlow?: boolean;
  glowColor?: string;
  glowRadius?: number;
}

export default function AnimatedStarField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initStars();
    };

    window.addEventListener("resize", handleResize);

    let stars: Star[] = [];
    const initStars = () => {
      stars = [];
      const density = Math.floor((width * height) / 9000);
      const starCount = Math.max(100, Math.min(density, 220));

      for (let i = 0; i < starCount; i++) {
        // ~12 special subtle glowing spots scattered across the screen
        const isGlow = i < 14;
        const glowColor = i % 3 === 0
          ? "rgba(168, 85, 247, 0.18)"  // soft purple glow
          : i % 3 === 1
          ? "rgba(56, 189, 248, 0.15)"  // soft cyan/blue glow
          : "rgba(192, 132, 252, 0.15)"; // soft violet glow

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: isGlow ? Math.random() * 1.2 + 1.0 : Math.random() * 0.9 + 0.3,
          baseOpacity: isGlow ? Math.random() * 0.35 + 0.35 : Math.random() * 0.35 + 0.1,
          opacity: Math.random(),
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * (isGlow ? 0.08 : 0.03),
          vy: (Math.random() - 0.5) * (isGlow ? 0.08 : 0.03),
          isGlow,
          glowColor,
          glowRadius: isGlow ? Math.random() * 10 + 8 : 0,
        });
      }
    };

    initStars();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Drift
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around boundaries
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        // Twinkle calculation
        star.twinklePhase += star.twinkleSpeed;
        const sinVal = Math.sin(star.twinklePhase);
        const currentOpacity = Math.max(
          0.05,
          Math.min(0.85, star.baseOpacity + sinVal * 0.2)
        );

        // Draw very light, soft halo glow for firefly points
        if (star.isGlow && star.glowRadius && star.glowColor) {
          ctx.save();
          const grad = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            star.glowRadius
          );
          grad.addColorStop(0, star.glowColor);
          grad.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.glowRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Draw core white star dot
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
}
