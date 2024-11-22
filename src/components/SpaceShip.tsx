import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

interface SpaceShipProps {
  activeSection: string;
}

export const SpaceShip: React.FC<SpaceShipProps> = ({ activeSection }) => {
  const sections = ['home', 'about', 'experience', 'skills', 'projects', 'education', 'contact'];
  const sectionIndex = sections.indexOf(activeSection);
  
  return (
    <motion.div
      className="fixed right-8 z-50"
      animate={{
        y: `${(sectionIndex * 100) / sections.length}vh`,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
    >
      <Rocket className="h-12 w-12 text-indigo-600 animate-pulse" />
      <motion.div
        className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-transparent absolute -bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          height: [20, 40, 20],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
};