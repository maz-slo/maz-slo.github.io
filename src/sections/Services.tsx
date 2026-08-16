'use client';

import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $content } from '../stores/language';
import { ServiceCard } from '../components/ServiceCard';

export function Services() {
  const content = useStore($content);
  const { services } = content;

  return (
    <section id="services" className="relative z-10 px-6 py-32 lg:px-16">
      <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">{services.eyebrow}</p>
          <h2 className="font-['Plus_Jakarta_Sans'] text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight tracking-[-0.02em]">
            {services.title}
          </h2>
        </motion.div>
        <motion.p
          className="max-w-md text-[1.0625rem] text-[var(--text-secondary)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {services.description}
        </motion.p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {services.items.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}