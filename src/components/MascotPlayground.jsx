import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Sparkles, Volume2 } from 'lucide-react';
import { KOWSHI_DATA } from '../data/kowshiData';
import { sounds } from '../utils/soundEngine';
import { fireMicroPop } from '../utils/confettiEffects';

export default function MascotPlayground() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [expression, setExpression] = useState('happy'); // 'happy' | 'wink' | 'blush' | 'surprised' | 'chew'
  const [tapCount, setTapCount] = useState(0);

  const expressions = ['happy', 'wink', 'blush', 'surprised', 'chew'];

  const handleMascotClick = (e) => {
    sounds.playMoo();
    
    // Confetti micro pop
    const rect = e.currentTarget.getBoundingClientRect();
    fireMicroPop(
      (rect.left + rect.width / 2) / window.innerWidth,
      (rect.top + rect.height / 2) / window.innerHeight
    );

    // Rotate quote and expression
    setCurrentQuoteIndex((prev) => (prev + 1) % KOWSHI_DATA.mascotQuotes.length);
    const nextExpr = expressions[(tapCount + 1) % expressions.length];
    setExpression(nextExpr);
    setTapCount((prev) => prev + 1);
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-glass">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Column: Mascot Narrative */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center space-x-1.5 bg-rose-100 text-roseGold-600 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-rose-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The "Cow-Corner" Mascot Playground</span>
            </div>

            <h2 className="font-display font-bold text-2xl sm:text-3xl text-deep-900 mb-3">
              Why the Kawaii "Cow-shi"? 🐮✨
            </h2>
            <p className="text-sm sm:text-base text-deep-600 leading-relaxed mb-6 max-w-lg">
              Because you are <strong className="text-roseGold-600 font-semibold">"udderly"</strong> one-of-a-kind! Soft-hearted, delightfully chaotic, chewing your way through snacks during deep talks, and radiating 100% pure comfort energy.
            </p>

            {/* Surprise Speech Bubble */}
            <div className="relative bg-gradient-to-r from-pink-50 via-rose-50 to-lavender-50 rounded-2xl p-4 sm:p-5 border border-rose-200/80 shadow-sm min-h-[85px] flex items-center">
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-pink-50 border-l border-b border-rose-200/80 transform rotate-45 hidden lg:block" />
              <div className="flex items-start space-x-3 w-full">
                <MessageSquare className="w-5 h-5 text-roseGold-500 shrink-0 mt-0.5" />
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentQuoteIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="text-sm sm:text-base font-semibold text-deep-800 italic"
                  >
                    "{KOWSHI_DATA.mascotQuotes[currentQuoteIndex]}"
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <p className="text-xs text-deep-500 mt-3 font-medium flex items-center justify-center lg:justify-start space-x-1">
              <span>👉</span>
              <span>Tap the kawaii cow on the right to hear it moo & unlock more remarks! (Taps: {tapCount})</span>
            </p>
          </div>

          {/* Right Column: Clickable Kawaii Cow Mascot */}
          <div className="flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleMascotClick}
              className="relative cursor-pointer select-none bg-gradient-to-b from-white via-cream-100 to-pink-100 rounded-3xl p-6 shadow-glass-hover border-2 border-rose-200 flex flex-col items-center justify-center w-56 h-56 sm:w-64 sm:h-64"
              title="Click me for a cute Moo!"
            >
              {/* Ears and Horns */}
              <div className="absolute -top-3 flex justify-between w-36">
                <div className="w-6 h-7 rounded-t-full bg-amber-200 border-2 border-deep-800 transform -rotate-12" />
                <div className="w-6 h-7 rounded-t-full bg-amber-200 border-2 border-deep-800 transform rotate-12" />
              </div>
              <div className="absolute -top-1 flex justify-between w-48">
                <div className="w-9 h-6 rounded-full bg-pink-300 border-2 border-deep-800 transform -rotate-25 shadow-sm" />
                <div className="w-9 h-6 rounded-full bg-pink-300 border-2 border-deep-800 transform rotate-25 shadow-sm" />
              </div>

              {/* Cow Face */}
              <div className="relative w-40 h-36 bg-white rounded-3xl border-2 border-deep-800 shadow-sm flex flex-col items-center justify-center overflow-hidden">
                {/* Spot */}
                <div className="absolute top-1 right-2 w-12 h-10 bg-deep-800 rounded-full opacity-90" />
                
                {/* Eyes */}
                <div className="flex items-center space-x-9 z-10 mt-1 mb-2">
                  {expression === 'wink' ? (
                    <>
                      <div className="w-4 h-1.5 bg-deep-800 rounded-full transform rotate-6" />
                      <div className="w-4 h-4 bg-deep-800 rounded-full flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-white rounded-full -mt-1 -mr-1" />
                      </div>
                    </>
                  ) : expression === 'surprised' ? (
                    <>
                      <div className="w-5 h-5 bg-deep-800 rounded-full flex items-center justify-center">
                        <span className="w-2 h-2 bg-white rounded-full -mt-1 -mr-1" />
                      </div>
                      <div className="w-5 h-5 bg-deep-800 rounded-full flex items-center justify-center">
                        <span className="w-2 h-2 bg-white rounded-full -mt-1 -mr-1" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-4 h-4 bg-deep-800 rounded-full flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-white rounded-full -mt-1 -mr-1" />
                      </div>
                      <div className="w-4 h-4 bg-deep-800 rounded-full flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-white rounded-full -mt-1 -mr-1" />
                      </div>
                    </>
                  )}
                </div>

                {/* Cheeks */}
                <div className="flex justify-between w-28 px-2 z-10">
                  <div className={`w-4 h-2.5 rounded-full ${expression === 'blush' ? 'bg-red-400' : 'bg-pink-300'} opacity-80`} />
                  <div className={`w-4 h-2.5 rounded-full ${expression === 'blush' ? 'bg-red-400' : 'bg-pink-300'} opacity-80`} />
                </div>

                {/* Pink Muzzle */}
                <div className="w-28 h-12 bg-pink-200 border-2 border-deep-800 rounded-2xl flex flex-col items-center justify-center -mt-1 z-10 shadow-inner">
                  <div className="flex space-x-6 mb-0.5">
                    <span className="w-1.5 h-2 bg-deep-800 rounded-full" />
                    <span className="w-1.5 h-2 bg-deep-800 rounded-full" />
                  </div>
                  {expression === 'chew' ? (
                    <span className="text-[10px] font-bold text-deep-800 animate-pulse">🧋 sip!</span>
                  ) : (
                    <div className="w-4 h-2 border-b-2 border-deep-800 rounded-full" />
                  )}
                </div>
              </div>

              {/* Milk Carton Accessory */}
              <div className="absolute -bottom-3 right-2 bg-white border border-rose-200 rounded-lg px-2 py-0.5 shadow-md flex items-center space-x-1">
                <span className="text-xs">🧃</span>
                <span className="text-[10px] font-bold text-roseGold-600">100% Bestie Milk</span>
              </div>
            </motion.div>

            <span className="text-[11px] font-bold text-roseGold-500 mt-4 tracking-wider uppercase">
              ✨ Tap to Moo! ✨
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
