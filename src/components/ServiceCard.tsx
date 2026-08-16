'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Zap, Play, Diamond, type LucideIcon } from 'lucide-react';
import type { Service } from '../types/content';

const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  zap: Zap,
  play: Play,
  diamond: Diamond,
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]), springConfig);

  const Icon = iconMap[service.icon] || Sparkles;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="rounded-[2rem] border border-transparent bg-[var(--bg-secondary)] p-10 transition-colors hover:border-[var(--accent-soft)]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
        <Icon size={28} />
      </div>
      <h3 className="mb-3 font-['Plus_Jakarta_Sans'] text-[1.375rem] font-semibold">{service.title}</h3>
      <p className="mb-6 text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">{service.description}</p>
      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--border)] bg-[var(--bg-primary)] px-3.5 py-1.5 text-xs font-medium text-[var(--text-secondary)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}