import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Sparkles, Gift, ArrowDown, Heart, Calendar } from 'lucide-react';
import { KOWSHI_DATA } from '../data/kowshiData';
import { fireCelebrationConfetti, fireSideCannons } from '../utils/confettiEffects';
import { sounds } from '../utils/soundEngine';

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    isBirthday: false,
    years: 19,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Check URL override for previewing birthday directly
  const isPreviewBday = typeof window !== 'undefined' && 
    (new URLSearchParams(window.location.search).get('bday') === 'true' ||
     new URLSearchParams(window.location.search).get('celebrate') === 'true');

  useEffect(() => {
    const targetBday = new Date("2026-11-26T00:00:00");

    const updateTimer = () => {
      const now = new Date();
      if (now >= targetBday || isPreviewBday) {
        const diffSinceBday = Math.max(0, now - targetBday);
        const totalSeconds = Math.floor(diffSinceBday / 1000);
        setTimeLeft({
          isBirthday: true,
          years: 19,
          days: Math.floor(totalSeconds / 86400),
          hours: Math.floor((totalSeconds % 86400) / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60,
        });
      } else {
        const diffToBday = Math.max(0, targetBday - now);
        const totalSeconds = Math.floor(diffToBday / 1000);
        setTimeLeft({
          isBirthday: false,
          years: 19,
          days: Math.floor(totalSeconds / 86400),
          hours: Math.floor((totalSeconds % 86400) / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60,
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isPreviewBday]);

  // Framer Motion 3D Parallax Tilt Card
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-150, 150], [8, -8]);
  const rotateY = useTransform(x, [-150, 150], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handlePopCelebration = () => {
    sounds.playFanfare();
    sounds.playMoo();
    fireCelebrationConfetti();
    fireSideCannons();
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6">
      {/* 3D Parallax Interactive Container */}
      <motion.div
        className="w-full max-w-4xl"
        style={{ perspective: 1000 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{ rotateX, rotateY }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          className="relative glass-panel rounded-3xl p-6 sm:p-10 md:p-12 text-center shadow-glass-hover border border-white/80 overflow-hidden"
        >
          {/* Decorative Cow Ears Graphic at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center space-x-3 pointer-events-none">
            <span className="w-6 h-6 rounded-full bg-pink-200 border-2 border-white shadow-sm transform -rotate-12" />
            <span className="text-3xl bg-white px-2 py-1 rounded-full shadow-md border border-rose-100">🐮</span>
            <span className="w-6 h-6 rounded-full bg-pink-200 border-2 border-white shadow-sm transform rotate-12" />
          </div>

          {/* Luxury Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-roseGold-100/80 via-cream-100 to-lavender-100/80 text-roseGold-600 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide border border-rose-200/60 shadow-sm mt-3 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-roseGold-500 animate-spin-slow" />
            <span>{KOWSHI_DATA.hero.badge}</span>
            <Sparkles className="w-3.5 h-3.5 text-roseGold-500 animate-spin-slow" />
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl text-deep-900 tracking-tight leading-tight mb-4">
            Happy 19th Birthday,{' '}
            <span className="bg-gradient-to-r from-roseGold-500 via-pink-500 to-lavender-500 bg-clip-text text-transparent underline decoration-rose-300 decoration-wavy decoration-2">
              Kowshi
            </span>{' '}
            <span className="inline-block animate-bounce">🐮💖</span>
          </h1>

          {/* Animated Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-deep-600 leading-relaxed font-medium mb-8">
            An <strong className="text-roseGold-600 font-semibold">irreplaceable best friend</strong> whose infectious laughter, unshakable loyalty, and wholesome energy make life infinitely brighter.
          </p>

          {/* Interactive Celebration Clock / Birthday Ticker */}
          <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-rose-100 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-3 text-xs sm:text-sm font-semibold text-deep-700">
              <span className="flex items-center space-x-1.5 text-roseGold-600">
                <Calendar className="w-4 h-4" />
                <span>
                  {timeLeft.isBirthday
                    ? "🎉 Officially 19 Today! Celebrating Kowsh's 19th Birthday! 🐮✨"
                    : "Countdown to Kowsh's 19th Birthday (Nov 26, 2026) 🐮"}
                </span>
              </span>
              <span className="bg-rose-50 text-roseGold-600 px-2 py-0.5 rounded-full text-[11px] font-bold border border-rose-200">
                {timeLeft.isBirthday ? "🎂 Level 19 Unlocked" : "🎂 Nov 26"}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-3 text-center">
              <div className="bg-gradient-to-b from-rose-50 to-pink-50 rounded-xl p-2 sm:p-3 border border-rose-100">
                <span className="block font-display font-bold text-xl sm:text-2xl text-roseGold-600">
                  {timeLeft.isBirthday ? "19" : "19th"}
                </span>
                <span className="block text-[10px] sm:text-xs text-deep-500 font-semibold uppercase tracking-wider">
                  {timeLeft.isBirthday ? "Years Old" : "Turning"}
                </span>
              </div>
              <div className="bg-gradient-to-b from-rose-50 to-pink-50 rounded-xl p-2 sm:p-3 border border-rose-100">
                <span className="block font-display font-bold text-xl sm:text-2xl text-deep-800">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="block text-[10px] sm:text-xs text-deep-500 font-semibold uppercase tracking-wider">
                  {timeLeft.isBirthday ? "Days" : "Days Left"}
                </span>
              </div>
              <div className="bg-gradient-to-b from-rose-50 to-pink-50 rounded-xl p-2 sm:p-3 border border-rose-100">
                <span className="block font-display font-bold text-xl sm:text-2xl text-deep-800">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="block text-[10px] sm:text-xs text-deep-500 font-semibold uppercase tracking-wider">
                  Hours
                </span>
              </div>
              <div className="bg-gradient-to-b from-rose-50 to-pink-50 rounded-xl p-2 sm:p-3 border border-rose-100">
                <span className="block font-display font-bold text-xl sm:text-2xl text-deep-800">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="block text-[10px] sm:text-xs text-deep-500 font-semibold uppercase tracking-wider">
                  Mins
                </span>
              </div>
              <div className="bg-gradient-to-b from-rose-50 to-pink-50 rounded-xl p-2 sm:p-3 border border-rose-100">
                <span className="block font-display font-bold text-xl sm:text-2xl text-deep-800">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="block text-[10px] sm:text-xs text-deep-500 font-semibold uppercase tracking-wider">
                  Secs
                </span>
              </div>
            </div>
          </div>

          {/* Dual Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePopCelebration}
              className="w-full sm:w-auto flex items-center justify-center space-x-2.5 bg-gradient-to-r from-roseGold-500 via-pink-500 to-roseGold-600 text-white font-bold px-7 py-3.5 rounded-full shadow-glass-glow hover:shadow-lg transition-all"
            >
              <Gift className="w-4 h-4 text-white" />
              <span>Pop the Celebration!</span>
              <Sparkles className="w-4 h-4 text-yellow-200" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#bento"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/80 hover:bg-white text-deep-800 font-semibold px-6 py-3.5 rounded-full border border-rose-200 shadow-sm transition-all"
            >
              <span>Explore Lounge</span>
              <ArrowDown className="w-4 h-4 text-roseGold-500" />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
