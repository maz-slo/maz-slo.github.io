'use client';

import { useStore } from '@nanostores/react';
import { $content } from '../stores/language';

export function Footer() {
  const content = useStore($content);
  const { footer, nav } = content;

  return (
    <footer className="relative z-10 border-t border-[var(--border)] px-6 py-12 lg:px-16">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-sm text-[var(--text-secondary)]">{footer.copyright}</p>
          <p className="text-xs text-[var(--text-muted)]">{footer.location}</p>
        </div>
        <div className="flex gap-6 text-sm text-[var(--text-secondary)]">
          <a href="#services" className="hover:text-[var(--text-primary)]">{nav.services}</a>
          <a href="#process" className="hover:text-[var(--text-primary)]">{nav.process}</a>
          <a href="#about" className="hover:text-[var(--text-primary)]">{nav.about}</a>
          <a href="#contact" className="hover:text-[var(--text-primary)]">{nav.contact}</a>
        </div>
      </div>
    </footer>
  );
}