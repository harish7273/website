import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AmbientBackground() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingItems = [
    { emoji: "🐮", initialX: "10%", initialY: "15%", duration: 7, delay: 0 },
    { emoji: "☁️", initialX: "85%", initialY: "12%", duration: 9, delay: 1 },
    { emoji: "🌸", initialX: "75%", initialY: "45%", duration: 6, delay: 2 },
    { emoji: "✨", initialX: "15%", initialY: "65%", duration: 8, delay: 0.5 },
    { emoji: "🧃", initialX: "90%", initialY: "78%", duration: 7.5, delay: 1.5 },
    { emoji: "💖", initialX: "25%", initialY: "88%", duration: 6.5, delay: 2.5 },
  ];

  return (
    <>
      {/* Luxury ambient gradient mesh */}
      <div className="ambient-mesh" aria-hidden="true" />

      {/* Mouse ambient glow light */}
      <div
        className="pointer-events-none fixed w-80 h-80 rounded-full blur-3xl opacity-25 transition-transform duration-300 ease-out z-0 hidden sm:block"
        style={{
          background: 'radial-gradient(circle, #fda4af 0%, #d8b4fe 60%, transparent 80%)',
          transform: `translate(${mousePos.x - 160}px, ${mousePos.y - 160}px)`,
        }}
        aria-hidden="true"
      />

      {/* Floating Kawaii Stickers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {floatingItems.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-2xl sm:text-3xl select-none opacity-40 hover:opacity-80 transition-opacity"
            style={{ left: item.initialX, top: item.initialY }}
            animate={{
              y: [0, -18, 0],
              rotate: [0, 8, -6, 0],
              scale: [1, 1.08, 0.96, 1],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>
    </>
  );
}
