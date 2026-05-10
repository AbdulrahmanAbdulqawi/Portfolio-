import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface SkillLevelBarProps {
  percent: number;
  backgroundColor: string;
}

export const SkillLevelBar: React.FC<SkillLevelBarProps> = ({ percent, backgroundColor }) => {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ backgroundColor: 'var(--stitch-surface-raised)' }}>
        <div
          className="h-1.5 rounded-full"
          style={{ width: `${percent}%`, backgroundColor }}
        />
      </div>
    );
  }

  return (
    <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ backgroundColor: 'var(--stitch-surface-raised)' }}>
      <motion.div
        className="h-1.5 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true, margin: '0px 0px -20% 0px' }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        style={{ backgroundColor }}
      />
    </div>
  );
};
