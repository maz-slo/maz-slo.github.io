'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { $content, $lang, setLanguage, initializeLanguage } from '../stores/language';

const navIds = ['services', 'process', 'about', 'contact'];

export function Navbar() {
  const content = useStore($content);
  const lang = useStore($lang);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    initializeLanguage();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLabels = [content.nav.services, content.nav.process, content.nav.about, content.nav.contact];

  return (
    <motion.nav
      className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-colors duration-300 lg:px-16 ${
        scrolled ? 'border-b border-[var(--border)] bg-[var(--bg-primary)]/85 backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <a href="#" className="font-['Plus_Jakarta_Sans'] text-xl font-bold tracking-tight">
        Shuyi Liu
      </a>

      <div className="hidden items-center gap-8 md:flex">
        {navIds.map((id, i) => (
          <a
            key={id}
            href={`#${id}`}
            className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            {navLabels[i]}
          </a>
        ))}
        <button
          onClick={() => setLanguage(lang === 'en' ? 'zh' : 'en')}
          className="font-['Plus_Jakarta_Sans'] text-sm font-semibold text-[var(--accent)]"
        >
          {content.nav.langToggle}
        </button>
      </div>

      <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 top-[72px] z-40 flex flex-col items-center gap-8 bg-[var(--bg-primary)] py-12 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navIds.map((id, i) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-2xl font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                {navLabels[i]}
              </a>
            ))}
            <button
              onClick={() => setLanguage(lang === 'en' ? 'zh' : 'en')}
              className="text-xl font-semibold text-[var(--accent)]"
            >
              {content.nav.langToggle}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}