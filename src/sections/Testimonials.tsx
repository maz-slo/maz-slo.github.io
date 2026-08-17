'use client';

import { useStore } from '@nanostores/react';
import { $content } from '../stores/language';

export function Testimonials() {
  const content = useStore($content);
  const { testimonials } = content;

  const duplicated = [...testimonials.items, ...testimonials.items];

  return (
    <section id="testimonials" className="relative z-10 overflow-hidden px-6 py-32 lg:px-16">
      <div className="mb-16 max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">{testimonials.eyebrow}</p>
        <h2 className="mb-4 font-['Plus_Jakarta_Sans'] text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight tracking-[-0.02em]">
          {testimonials.title}
        </h2>
        <p className="text-[1.0625rem] text-[var(--text-secondary)]">{testimonials.description}</p>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 40s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative">
        <div className="marquee-track flex w-max">
          {duplicated.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="w-[400px] flex-shrink-0 rounded-[2rem] border border-[var(--border)] bg-[var(--bg-secondary)] p-8 mr-6"
            >
              <p className="mb-6 text-lg leading-relaxed text-[var(--text-primary)]">"{item.quote}"</p>
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-[var(--text-secondary)]">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}