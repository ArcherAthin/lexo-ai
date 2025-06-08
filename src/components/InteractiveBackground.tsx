
import React from 'react';
import { motion } from 'framer-motion';

const InteractiveBackground = () => {
  return (
    <>
      {/* Main background with soft gradients like reference */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Base gradient background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 1) 0%, 
                rgba(248, 250, 255, 1) 25%,
                rgba(240, 242, 255, 0.8) 50%,
                rgba(232, 238, 255, 0.6) 75%,
                rgba(220, 230, 255, 0.4) 100%)
            `
          }}
        />
        
        {/* Soft purple gradient orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(196, 181, 253, 0.2) 40%, transparent 70%)',
            filter: 'blur(60px)',
            right: '-200px',
            top: '-100px',
          }}
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 50, -30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(217, 70, 239, 0.25) 0%, rgba(147, 51, 234, 0.15) 50%, transparent 70%)',
            filter: 'blur(40px)',
            left: '-100px',
            bottom: '-100px',
          }}
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 30, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Subtle floating particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: `rgba(139, 92, 246, ${0.2 + i * 0.1})`,
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              x: [0, 60 + i * 5, -30, 0],
              y: [0, -40 - i * 3, 20, 0],
              opacity: [0.2, 0.6, 0.3, 0.2],
              scale: [1, 1.5, 0.8, 1],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default InteractiveBackground;
