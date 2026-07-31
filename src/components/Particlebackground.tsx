import React from 'react';
import { motion } from 'motion/react';

export const ParticleBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Radial Gradient Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-600/20 blur-[120px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.45, 0.2],
          x: [0, -40, 0],
          y: [0, 30, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] rounded-full bg-indigo-600/20 blur-[140px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.35, 0.15]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-purple-600/10 blur-[160px]"
      />

      {/* Cybernetic Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Floating Sparkles & Floating Particles */}
      <div className="absolute inset-0">
        {[
          { top: '15%', left: '10%', size: 'w-1.5 h-1.5', color: 'bg-cyan-400', delay: 0 },
          { top: '25%', left: '85%', size: 'w-2 h-2', color: 'bg-indigo-400', delay: 1 },
          { top: '65%', left: '12%', size: 'w-2.5 h-2.5', color: 'bg-purple-400', delay: 2 },
          { top: '75%', left: '88%', size: 'w-1.5 h-1.5', color: 'bg-cyan-300', delay: 1.5 },
          { top: '45%', left: '5%', size: 'w-2 h-2', color: 'bg-rose-400', delay: 0.5 },
          { top: '80%', left: '48%', size: 'w-2 h-2', color: 'bg-emerald-400', delay: 2.5 }
        ].map((pt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.2, y: 0 }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              y: [-10, 10, -10],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: pt.delay,
              ease: 'easeInOut'
            }}
            style={{ top: pt.top, left: pt.left }}
            className={`absolute rounded-full ${pt.size} ${pt.color} shadow-[0_0_12px_currentColor]`}
          />
        ))}
      </div>
    </div>
  );
};
