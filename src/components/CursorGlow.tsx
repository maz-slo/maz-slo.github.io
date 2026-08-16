'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function CursorGlow() {
  const glowX = useMotionValue(-500);
  const glowY = useMotionValue(-500);

  const springConfig = { damping: 30, stiffness: 150 };
  const springX = useSpring(glowX, springConfig);
  const springY = useSpring(glowY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      glowX.set(e.clientX);
      glowY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [glowX, glowY]);

  const left = useTransform(springX, (v) => v - 250);
  const top = useTransform(springY, (v) => v - 250);

  return (
    <motion.div
      className="cursor-glow pointer-events-none fixed z-0 h-[500px] w-[500px] rounded-full"
      style={{
        left,
        top,
        background: 'radial-gradient(circle, var(--glow) 0%, transparent 70%)',
        filter: 'blur(60px)',
        opacity: 0.45,
      }}
    />
  );
}