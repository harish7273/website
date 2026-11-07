import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, MessageCircle, Send } from 'lucide-react';
import { KOWSHI_DATA } from '../data/kowshiData';
import { sounds } from '../utils/soundEngine';
import { fireCelebrationConfetti, fireSideCannons } from '../utils/confettiEffects';

export default function GrandFinaleFooter() {
  const [lanterns, setLanterns] = useState([]);

  const releaseLanterns = () => {
    sounds.playFanfare();
    sounds.playChime();
    fireCelebrationConfetti();
    fireSideCannons();

    // Create 8 floating lanterns with random horizontal positions
    const newLanterns = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 85 + 5, // 5% to 90%
      delay: i * 0.2,
      duration: Math.random() * 3 + 4, // 4-7s
      icon: i % 2 === 0 ? "🏮" : "🎈"
    }));
    setLanterns((prev) => [...prev, ...newLanterns]);
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `Happy 19th Birthday Kowshi! 🐮✨ Wishing udderly the most irreplaceable and legendary best friend the most magical year ahead!`
  )}`;

  return (
    <footer className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center overflow-hidden">
      
      {/* Floating lanterns layer */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        <AnimatePresence>
          {lanterns.map((lantern) => (
            <motion.div
              key={lantern.id}
              initial={{ opacity: 1, y: '100vh', scale: 0.8 }}
              animate={{ opacity: 0, y: '-20vh', scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: lantern.duration,
                delay: lantern.delay,
                ease: 'easeOut',
              }}
              style={{ left: `${lantern.x}%` }}
              className="absolute text-4xl sm:text-5xl filter drop-shadow-lg"
            >
              {lantern.icon}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/80 shadow-glass-hover relative z-10">
        
        {/* Banner emojis */}
        <div className="flex items-center justify-center space-x-3 text-3xl mb-4">
          <span>☁️</span>
          <span className="animate-bounce">🐮</span>
          <span>☁️</span>
        </div>

        <h2 className="font-display font-bold text-3xl sm:text-5xl text-deep-900 tracking-tight mb-4">
          Here’s To Your Most Magical Chapter! 🥂✨
        </h2>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-deep-600 leading-relaxed font-medium mb-8">
          May your 19th year bring endless peaceful mornings, stomach-aching laughs, bold breakthroughs, delicious snacks, and zero drama. Kowshi, you truly deserve the best of everything life has to offer!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={releaseLanterns}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-roseGold-500 via-pink-500 to-roseGold-600 text-white font-bold px-7 py-3.5 rounded-full shadow-glass-glow hover:shadow-lg transition-all"
          >
            <span>🏮</span>
            <span>Release Sky Lanterns & Balloons</span>
            <Sparkles className="w-4 h-4 text-yellow-200" />
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-full shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Kowshi Birthday Wish</span>
          </motion.a>
        </div>

        {/* Final Golden-Glowing Signature */}
        <div className="pt-8 border-t border-rose-100/80">
          <p className="text-xs sm:text-sm font-semibold text-deep-700">
            Handcrafted with infinite gratitude for <strong className="text-roseGold-600 font-display">Kowshi (Cow-shi)</strong>
          </p>
          <p className="text-xs text-deep-400 font-medium mt-1">
            Forever & Always An Irreplaceable Best Friend • 2026 Edition 🐮🌼
          </p>
        </div>

      </div>
    </footer>
  );
}
