import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Heart, Sparkles, Feather } from 'lucide-react';
import { KOWSHI_DATA } from '../data/kowshiData';
import { sounds } from '../utils/soundEngine';
import { fireMicroPop } from '../utils/confettiEffects';

export default function SealedEnvelopeModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    sounds.playChime();
    fireMicroPop(0.5, 0.4);
    setIsOpen(true);
  };

  const handleCloseLetter = () => {
    sounds.playPop(0.9);
    setIsOpen(false);
  };

  return (
    <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/80 shadow-glass text-center">
        
        {/* Section Badge */}
        <div className="inline-flex items-center space-x-1.5 bg-rose-100 text-roseGold-600 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-rose-200">
          <Feather className="w-3.5 h-3.5" />
          <span>Heartfelt Deep Note</span>
        </div>

        <h2 className="font-display font-bold text-3xl sm:text-4xl text-deep-900 tracking-tight mb-2">
          A Dedicated Note For Kowshi 💌
        </h2>
        <p className="text-sm text-deep-600 font-medium max-w-md mx-auto mb-8">
          An honest, appreciative letter written from the bottom of my heart. Tap the wax seal to unfold.
        </p>

        {/* Animated Envelope Preview */}
        <div className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenLetter}
            className="cursor-pointer select-none relative w-72 sm:w-80 h-48 bg-gradient-to-b from-rose-100 via-pink-100 to-rose-200 rounded-2xl shadow-xl border-2 border-white flex flex-col items-center justify-center p-4 group"
          >
            {/* Envelope flap shadow */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-pink-200/90 to-transparent clip-path-triangle pointer-events-none rounded-t-2xl" />

            {/* Recipient text */}
            <span className="font-serif italic text-lg sm:text-xl text-deep-800 tracking-wide mb-1 z-10">
              To Dearest Kowshi,
            </span>
            <span className="text-xs text-roseGold-600 font-medium z-10">
              (Tap the wax seal to break & read)
            </span>

            {/* 3D Wax Seal with Cow Motif */}
            <motion.div
              whileHover={{ rotate: 12 }}
              className="mt-3 w-14 h-14 rounded-full wax-seal flex items-center justify-center border-2 border-red-300 shadow-lg z-20"
            >
              <span className="text-xl">🐮</span>
            </motion.div>
          </motion.div>
        </div>

        <p className="text-xs text-deep-500 mt-4 font-medium">
          🔒 Private & Confidential • Written exclusively for Kowsh
        </p>
      </div>

      {/* Fullscreen Parchment Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLetter}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full parchment rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-rose-200/80 my-8"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseLetter}
                className="absolute top-4 right-4 bg-rose-100 hover:bg-rose-200 text-deep-800 rounded-full p-2 transition-colors z-10 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Letter Header */}
              <div className="border-b border-rose-200 pb-4 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-roseGold-500 uppercase tracking-widest">
                    ✨ 19th Birthday Edition ✨
                  </span>
                  <h3 className="font-serif italic font-bold text-2xl sm:text-3xl text-deep-900 mt-1">
                    {KOWSHI_DATA.letter.salutation}
                  </h3>
                </div>
                <span className="text-xs text-deep-500 font-medium">
                  {KOWSHI_DATA.formattedDate}
                </span>
              </div>

              {/* Letter Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-deep-800 leading-relaxed font-serif">
                {KOWSHI_DATA.letter.paragraphs.map((para, i) => (
                  <p key={i}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Letter Signoff */}
              <div className="mt-8 pt-4 border-t border-rose-200/80 text-right">
                <p className="font-serif italic text-xs sm:text-sm text-deep-600">
                  {KOWSHI_DATA.letter.closing}
                </p>
                <p className="font-handwritten text-2xl sm:text-3xl text-roseGold-600 font-bold mt-1">
                  {KOWSHI_DATA.letter.signature}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
