import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, RefreshCw, Heart, Ticket, Wand2 } from 'lucide-react';
import { KOWSHI_DATA } from '../data/kowshiData';
import { sounds } from '../utils/soundEngine';
import { fireCelebrationConfetti, fireMicroPop } from '../utils/confettiEffects';

export default function SurpriseScratchCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [voucherIndex, setVoucherIndex] = useState(0);
  const [isScratched, setIsScratched] = useState(false);
  const [complimentNote, setComplimentNote] = useState(null);

  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const currentVoucher = KOWSHI_DATA.vouchers[voucherIndex];

  // Open the box
  const handleUnbox = () => {
    if (!isOpen) {
      sounds.playFanfare();
      sounds.playMoo();
      fireCelebrationConfetti();
      setIsOpen(true);
      setIsScratched(false);
    }
  };

  // Next voucher
  const handleNextVoucher = () => {
    sounds.playPop(1.2);
    setVoucherIndex((prev) => (prev + 1) % KOWSHI_DATA.vouchers.length);
    setIsScratched(false);
  };

  // Initialize Scratch Canvas
  useEffect(() => {
    if (isOpen && canvasRef.current && !isScratched) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width = canvas.offsetWidth;
      const height = canvas.height = canvas.offsetHeight;

      // Draw metallic scratch overlay
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#fbcfe8');
      gradient.addColorStop(0.5, '#f472b6');
      gradient.addColorStop(1, '#e879f9');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add silver shimmer texture & instruction text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('✨ Scratch / Tap to Reveal Perk! ✨', width / 2, height / 2 + 5);

      let scratchedPixels = 0;
      const totalPixels = width * height;

      const scratch = (x, y) => {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();

        scratchedPixels += 150;
        if (scratchedPixels > totalPixels * 0.35 && !isScratched) {
          setIsScratched(true);
          sounds.playChime();
          fireMicroPop(0.5, 0.7);
        }
      };

      const getPos = (e) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
          x: clientX - rect.left,
          y: clientY - rect.top,
        };
      };

      const startScratch = (e) => {
        isDrawing.current = true;
        const { x, y } = getPos(e);
        scratch(x, y);
      };

      const moveScratch = (e) => {
        if (!isDrawing.current) return;
        const { x, y } = getPos(e);
        scratch(x, y);
      };

      const stopScratch = () => {
        isDrawing.current = false;
      };

      canvas.addEventListener('mousedown', startScratch);
      canvas.addEventListener('mousemove', moveScratch);
      window.addEventListener('mouseup', stopScratch);

      canvas.addEventListener('touchstart', startScratch, { passive: true });
      canvas.addEventListener('touchmove', moveScratch, { passive: true });
      window.addEventListener('touchend', stopScratch);

      return () => {
        canvas.removeEventListener('mousedown', startScratch);
        canvas.removeEventListener('mousemove', moveScratch);
        window.removeEventListener('mouseup', stopScratch);
        canvas.removeEventListener('touchstart', startScratch);
        canvas.removeEventListener('touchmove', moveScratch);
        window.removeEventListener('touchend', stopScratch);
      };
    }
  }, [isOpen, voucherIndex, isScratched]);

  // Randomized compliment generator
  const triggerCompliment = () => {
    sounds.playChime();
    fireMicroPop(0.5, 0.6);
    const randomIndex = Math.floor(Math.random() * KOWSHI_DATA.compliments.length);
    setComplimentNote(KOWSHI_DATA.compliments[randomIndex]);
  };

  return (
    <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/80 shadow-glass">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 bg-rose-100 text-roseGold-600 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-rose-200">
            <Gift className="w-3.5 h-3.5" />
            <span>Surprise Lounge</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-deep-900 tracking-tight">
            Surprise Box & Digital Scratch Vouchers 🎁
          </h2>
          <p className="text-sm text-deep-600 mt-2 font-medium">
            Tap the gift box to crack it open, then scratch off your redeemable bestie perks!
          </p>
        </div>

        {/* Unboxing Interactive Stage */}
        <div className="flex flex-col items-center justify-center">
          {!isOpen ? (
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUnbox}
              className="cursor-pointer select-none relative flex flex-col items-center group py-8"
            >
              {/* Animated 3D Gift Box */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -3, 3, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-44 h-44 sm:w-52 sm:h-52 bg-gradient-to-tr from-rose-400 via-pink-400 to-roseGold-500 rounded-3xl shadow-2xl border-4 border-white flex flex-col items-center justify-center relative overflow-hidden"
              >
                {/* Cow Spots on Box */}
                <span className="absolute top-3 left-4 w-10 h-8 bg-white/30 rounded-full" />
                <span className="absolute bottom-4 right-3 w-14 h-10 bg-white/30 rounded-full" />
                
                {/* Ribbon Bow */}
                <div className="absolute top-0 w-8 h-full bg-yellow-200/90 shadow-sm" />
                <div className="absolute left-0 h-8 w-full bg-yellow-200/90 shadow-sm" />

                <div className="relative z-10 text-5xl sm:text-6xl filter drop-shadow">
                  🐮
                </div>
              </motion.div>

              <span className="mt-6 inline-flex items-center space-x-2 bg-gradient-to-r from-roseGold-500 to-pink-500 text-white font-bold px-6 py-2.5 rounded-full shadow-md text-sm group-hover:shadow-lg transition-all">
                <Sparkles className="w-4 h-4 animate-spin-slow" />
                <span>Tap to Crack Open Surprise!</span>
              </span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-full max-w-md"
            >
              {/* Scratch Card Ticket */}
              <div className={`relative rounded-3xl p-6 sm:p-7 border-2 ${currentVoucher.color} shadow-xl overflow-hidden min-h-[260px] flex flex-col justify-between`}>
                
                {/* Ticket Top Info */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-roseGold-600 bg-white/80 px-3 py-1 rounded-full shadow-sm border border-rose-100 flex items-center space-x-1">
                    <Ticket className="w-3.5 h-3.5" />
                    <span>{currentVoucher.type}</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-deep-500 bg-white/60 px-2 py-0.5 rounded-md">
                    #KOWSH-19
                  </span>
                </div>

                {/* Voucher Content */}
                <div className="my-auto text-center py-2">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-deep-900 mb-2">
                    {currentVoucher.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-deep-700 font-medium leading-relaxed max-w-xs mx-auto">
                    {currentVoucher.desc}
                  </p>
                </div>

                {/* Ticket Bottom Stamp */}
                <div className="flex items-center justify-between pt-4 border-t border-rose-200/60 text-xs font-semibold text-deep-600">
                  <span>Sign: Harish 🐮</span>
                  <span className="text-roseGold-600 font-bold">100% Redeemable</span>
                </div>

                {/* Scratch Layer Overlay */}
                {!isScratched && (
                  <canvas
                    ref={canvasRef}
                    className="scratch-overlay"
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center space-x-3 mt-6">
                <button
                  onClick={handleNextVoucher}
                  className="flex items-center space-x-1.5 bg-white hover:bg-rose-50 text-deep-800 font-bold px-4 py-2.5 rounded-full border border-rose-200 shadow-sm text-xs sm:text-sm transition-all active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-roseGold-500" />
                  <span>Draw Another Perk</span>
                </button>

                <button
                  onClick={() => setIsScratched(true)}
                  className="text-xs text-roseGold-500 font-semibold hover:underline px-2"
                >
                  Quick Reveal
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Randomized Compliment Generator Bar */}
        <div className="mt-12 pt-8 border-t border-rose-100 flex flex-col items-center text-center">
          <p className="text-xs sm:text-sm text-deep-600 font-medium mb-3">
            Need an instant boost of bestie affirmations?
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={triggerCompliment}
            className="flex items-center space-x-2 bg-gradient-to-r from-lavender-500 to-pink-500 text-white font-bold px-5 py-2.5 rounded-full shadow-sm hover:shadow-md text-xs sm:text-sm transition-all"
          >
            <Wand2 className="w-4 h-4 text-yellow-200" />
            <span>Generate Bestie Compliment ✨</span>
          </motion.button>

          {/* Floating Compliment Modal/Banner */}
          <AnimatePresence>
            {complimentNote && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="mt-4 bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 border border-roseGold-300 rounded-2xl p-4 shadow-md max-w-md w-full relative"
              >
                <p className="text-sm sm:text-base font-semibold text-deep-800 italic">
                  "{complimentNote}"
                </p>
                <span className="text-[10px] text-roseGold-600 font-bold block mt-1 uppercase tracking-wide">
                  🐮 Certified Genuine Truth
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
