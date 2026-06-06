"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface Meteor {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  length: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];

    // Resize canvas to fill window
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 3000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    };

    // Spawn a shooting star
    const spawnMeteor = () => {
      const startX = Math.random() * canvas.width * 0.8;
      const startY = Math.random() * canvas.height * 0.4;
      const angle = Math.random() * 0.5 + 0.3; // downward-right angle in radians
      const speed = Math.random() * 6 + 4;

      meteors.push({
        x: startX,
        y: startY,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        length: Math.random() * 80 + 60,
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 60 + 40,
      });
    };

    // Spawn meteor every 2-6 seconds
    const scheduleMeteor = () => {
      const delay = Math.random() * 4000 + 2000;
      setTimeout(() => {
        spawnMeteor();
        scheduleMeteor();
      }, delay);
    };

    resize();
    window.addEventListener("resize", resize);
    scheduleMeteor();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      for (const star of stars) {
        star.twinklePhase += star.twinkleSpeed;
        const currentOpacity =
          star.opacity * (0.5 + 0.5 * Math.sin(star.twinklePhase));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();

        // Add a subtle glow for brighter stars
        if (star.radius > 1.2 && currentOpacity > 0.7) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 220, 255, ${currentOpacity * 0.15})`;
          ctx.fill();
        }
      }

      // Draw meteors
      meteors = meteors.filter((m) => m.life < m.maxLife);
      for (const meteor of meteors) {
        meteor.x += meteor.speedX;
        meteor.y += meteor.speedY;
        meteor.life++;

        // Fade in quickly, fade out slowly
        const fadeIn = Math.min(meteor.life / 10, 1);
        const fadeOut = 1 - meteor.life / meteor.maxLife;
        const alpha = Math.min(fadeIn, fadeOut) * meteor.opacity;

        const tailX = meteor.x - Math.cos(Math.atan2(meteor.speedY, meteor.speedX)) * meteor.length;
        const tailY = meteor.y - Math.sin(Math.atan2(meteor.speedY, meteor.speedX)) * meteor.length;

        // Meteor tail gradient
        const gradient = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        gradient.addColorStop(0.1, `rgba(255, 255, 255, ${alpha * 0.8})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
