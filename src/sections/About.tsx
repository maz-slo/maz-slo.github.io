'use client';

import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $content } from '../stores/language';

export function About() {
  const content = useStore($content);
  const { about } = content;

  return (
    <section id="about" className="relative z-10 bg-[var(--bg-secondary)] px-6 py-32 lg:px-16">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-[2rem] bg-[var(--bg-tertiary)]">
            <img
              src={`${import.meta.env.BASE_URL}images/profile.jpg`}
              alt="Shuyi Liu"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
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