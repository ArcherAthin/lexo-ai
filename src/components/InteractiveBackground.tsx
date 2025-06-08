
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const InteractiveBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;
    if (!container || !cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      container.style.setProperty('--mouse-x', `${x}%`);
      container.style.setProperty('--mouse-y', `${y}%`);
      
      // Update cursor position
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = '0';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Interactive cursor */}
      <div 
        ref={cursorRef}
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference opacity-0 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Main interactive background */}
      <div 
        ref={containerRef}
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{
          background: `
            radial-gradient(1200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
              rgba(139, 92, 246, 0.06) 0%, 
              rgba(217, 70, 239, 0.04) 30%,
              transparent 60%),
            linear-gradient(135deg, 
              rgba(248, 250, 255, 1) 0%, 
              rgba(241, 245, 255, 1) 50%, 
              rgba(232, 241, 255, 1) 100%)
          `
        }}
      >
        {/* Floating gradient orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            filter: 'blur(40px)',
            left: '10%',
            top: '20%',
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute w-80 h-80 rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(217, 70, 239, 0.4) 0%, transparent 70%)',
            filter: 'blur(50px)',
            right: '15%',
            top: '60%',
          }}
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 80, -40, 0],
            scale: [1, 0.7, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Enhanced floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `linear-gradient(45deg, rgba(139, 92, 246, ${0.4 + i * 0.02}), rgba(217, 70, 239, ${0.3 + i * 0.015}))`,
              left: `${10 + i * 4}%`,
              top: `${20 + (i % 5) * 15}%`,
            }}
            animate={{
              x: [0, 150 + i * 10, -50, 0],
              y: [0, -100 - i * 5, 50, 0],
              opacity: [0.3, 0.8, 0.4, 0.3],
              scale: [1, 1.5, 0.8, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Interactive gradient mesh */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.02) 50%, transparent 70%),
              linear-gradient(-45deg, transparent 30%, rgba(217, 70, 239, 0.02) 50%, transparent 70%)
            `,
            transform: 'translate(var(--mouse-x, 0px), var(--mouse-y, 0px))',
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>
    </>
  );
};

export default InteractiveBackground;
