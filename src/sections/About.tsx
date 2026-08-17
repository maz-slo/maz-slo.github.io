'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $content } from '../stores/language';

export function About() {
  const content = useStore($content);
  const { about } = content;

  const photoRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 250, damping: 22 };
  const rotateX = useSpring(useTransform(mouseY, [-180, 180], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-180, 180], [-7, 7]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="about" className="relative z-10 bg-[var(--bg-secondary)] px-6 py-32 lg:px-16">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            ref={photoRef}
            className="group relative aspect-square w-full max-w-md"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              perspective: 1000,
            }}
          >
            {/* Decorative offset backdrop for depth */}
            <div
              className="absolute inset-0 rounded-[2rem] bg-[var(--accent-soft)] transition-transform duration-500 ease-out group-hover:translate-x-4 group-hover:translate-y-4"
              style={{ transform: 'translateZ(-20px)' }}
            />

            {/* Main photo frame with layered shadow */}
            <div
              className="relative h-full w-full overflow-hidden rounded-[2rem] bg-[var(--bg-tertiary)]"
              style={{
                boxShadow: `
                  0 1px 1px rgba(26, 26, 26, 0.04),
                  0 4px 6px rgba(26, 26, 26, 0.04),
                  0 8px 16px rgba(26, 26, 26, 0.06),
                  0 24px 48px rgba(26, 26, 26, 0.08),
                  0 48px 80px rgba(199, 91, 57, 0.10)
                `,
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/profile.jpg`}
                alt="Shuyi Liu"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              {/* Subtle vignette overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `
                    radial-gradient(
                      circle at 50% 40%,
                      rgba(255, 255, 255, 0) 0%,
                      rgba(255, 255, 255, 0) 55%,
                      rgba(26, 26, 26, 0.06) 100%
                    )
                  `,
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">{about.eyebrow}</p>
          <h2 className="mb-6 font-['Plus_Jakarta_Sans'] text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight tracking-[-0.02em]">
            {about.title}
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-[var(--text-secondary)]">{about.description}</p>

          <div className="grid gap-6 sm:grid-cols-2">
            {about.facts.map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-6">
                <p className="mb-1 text-xs uppercase tracking-widest text-[var(--text-muted)]">{fact.label}</p>
                <p className="font-semibold">{fact.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
