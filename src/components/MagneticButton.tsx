'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const setRef = (node: HTMLAnchorElement | HTMLButtonElement | null) => {
    ref.current = node;
  };
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 15 });
  const springY = useSpring(y, { stiffness: 300, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    x.set(dx * 0.25);
    y.set(dy * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClasses =
    'inline-flex items-center justify-center rounded-full px-8 py-4 font-semibold transition-shadow duration-200';
  const variantClasses =
    variant === 'primary'
      ? 'bg-[var(--accent)] text-white shadow-[0_4px_20px_rgba(199,91,57,0.25)] hover:shadow-[0_8px_30px_rgba(199,91,57,0.35)]'
      : 'border-[1.5px] border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--text-primary)]';

  const Component = href ? motion.a : motion.button;
  const props = href ? { href } : { onClick };

  return (
    <Component
      ref={setRef}
      {...props}
      className={`${baseClasses} ${variantClasses} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </Component>
  );
}