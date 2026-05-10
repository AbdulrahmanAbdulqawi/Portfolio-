import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const easeOut = [0.22, 1, 0.36, 1] as const;

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Vertical offset in px when entering (ignored if reduced motion). */
  y?: number;
  delay?: number;
  duration?: number;
  /** Once true, animation does not repeat on scroll out/in. */
  once?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  y = 20,
  delay = 0,
  duration = 0.45,
  once = true,
}) => {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-0px 0px -60px 0px' }}
      transition={{ duration, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
};
