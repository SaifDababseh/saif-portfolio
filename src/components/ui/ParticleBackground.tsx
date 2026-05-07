"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; opacity: number; color: string; life: number; maxLife: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const COUNT = 70;
    const colors = ["rgba(0,212,255,", "rgba(168,85,247,", "rgba(6,255,216,"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const create = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: Math.random() * 200,
      maxLife: 150 + Math.random() * 200,
    });

    for (let i = 0; i < COUNT; i++) particles.push(create());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,212,255,${(1 - d / 110) * 0.07})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Particles
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.life++;
        if (p.life > p.maxLife) { particles[i] = create(); return; }
        const lr = p.life / p.maxLife;
        const fade = lr < 0.1 ? lr * 10 : lr > 0.9 ? (1 - lr) * 10 : 1;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity * fade})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity * fade * 0.04})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />
  );
}
