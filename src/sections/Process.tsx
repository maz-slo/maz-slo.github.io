'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $content } from '../stores/language';

export function Process() {
  const content = useStore($content);
  const { process } = content;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.5'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative z-10 bg-[var(--bg-secondary)] px-6 py-32 lg:px-16">
      <div className="mb-16 max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">{process.eyebrow}</p>
        <h2 className="mb-4 font-['Plus_Jakarta_Sans'] text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight tracking-[-0.02em]">
          {process.title}
        </h2>
        <p className="text-[1.0625rem] text-[var(--text-secondary)]">{process.description}</p>
      </div>

      <div ref={containerRef} className="relative">
        <svg
          className="absolute left-[27px] top-0 hidden h-full w-4 md:block"
          viewBox="0 0 16 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 8 0 L 8 100"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>

        <div className="space-y-12">
          {process.steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative grid gap-6 md:grid-cols-[80px_1fr]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-primary)] font-['Plus_Jakarta_Sans'] text-sm font-bold text-[var(--accent)] md:sticky md:top-32">
                {step.number}
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-8">
                <h3 className="mb-2 font-['Plus_Jakarta_Sans'] text-2xl font-semibold">{step.title}</h3>
                <p className="text-[var(--text-secondary)]">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}