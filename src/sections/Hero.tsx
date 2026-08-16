'use client';

import { motion, MotionConfig, type Variants } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $content } from '../stores/language';
import { MagneticButton } from '../components/MagneticButton';

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const content = useStore($content);
  const { hero } = content;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative flex min-h-screen flex-col justify-center px-6 pb-20 pt-32 lg:px-16">
        <motion.div
          className="absolute right-[-5%] top-[10%] h-[600px] w-[600px] rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle at 30% 30%, var(--glow), transparent 60%)',
            filter: 'blur(40px)',
          }}
          animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div className="relative z-10 max-w-5xl" variants={container} initial="hidden" animate="visible">
          <motion.p
            className="mb-6 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--accent)]"
            variants={item}
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            className="mb-6 font-['Plus_Jakarta_Sans'] text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[1.05] tracking-[-0.03em]"
            variants={item}
          >
            {hero.headline}
          </motion.h1>

          <motion.p className="mb-10 max-w-xl text-[clamp(1.125rem,2vw,1.5rem)] text-[var(--text-secondary)]" variants={item}>
            {hero.subheadline}
          </motion.p>

          <motion.div className="flex flex-wrap gap-4" variants={item}>
            <MagneticButton href="#services" variant="primary">
              {hero.ctaPrimary}
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              {hero.ctaSecondary}
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}