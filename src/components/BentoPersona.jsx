import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Laugh, 
  Heart, 
  Moon, 
  Coffee, 
  Music, 
  Volume2, 
  VolumeX, 
  HelpCircle,
  RotateCw,
  Sliders,
  Award
} from 'lucide-react';
import { KOWSHI_DATA } from '../data/kowshiData';
import { sounds } from '../utils/soundEngine';
import { fireMicroPop } from '../utils/confettiEffects';

export default function BentoPersona({ isAudioPlaying, onToggleAudio }) {
  // Card 1: Interactive trait formula values
  const [traits, setTraits] = useState(KOWSHI_DATA.formulaTraits);
  const [activeTrait, setActiveTrait] = useState(null);

  // Card 4: Flippable cards state
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    sounds.playPop(1.2);
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getTraitIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-pink-500" />;
      case 'Laugh': return <Laugh className="w-4 h-4 text-purple-500" />;
      case 'Heart': return <Heart className="w-4 h-4 text-rose-500" />;
      case 'Moon': return <Moon className="w-4 h-4 text-indigo-500" />;
      case 'Coffee': return <Coffee className="w-4 h-4 text-amber-500" />;
      default: return <Sparkles className="w-4 h-4 text-roseGold-500" />;
    }
  };

  return (
    <section id="bento" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-block bg-lavender-100 text-lavender-600 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-2 border border-lavender-200">
          🐮 Curated For Kowsh
        </span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-deep-900 tracking-tight">
          The Kowshi Bento Lounge
        </h2>
        <p className="text-sm sm:text-base text-deep-600 mt-2 font-medium">
          A modern showcase celebrating her persona, our shared inside jokes, and timeless friendship perks.
        </p>
      </div>

      {/* Modern Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* ========================================================
            CARD 1: The Kowshi Formula (Interactive Trait Sliders)
            Col-Span: 7 on Desktop
            ======================================================== */}
        <div className="md:col-span-7 glass-panel rounded-3xl p-6 sm:p-7 border border-white/80 shadow-glass flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-pink-100 text-pink-600 rounded-xl">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-deep-900">
                    The Kowshi Formula 🧪
                  </h3>
                  <p className="text-xs text-deep-500 font-medium">
                    The certified scientific recipe that makes Kowshi irreplaceable
                  </p>
                </div>
              </div>
              <span className="text-xs bg-rose-50 text-roseGold-600 font-bold px-2.5 py-1 rounded-full border border-rose-200">
                100% Pure Bestie
              </span>
            </div>

            {/* Trait Sliders List */}
            <div className="space-y-4 my-4">
              {traits.map((trait, idx) => (
                <div 
                  key={idx} 
                  className="bg-white/60 hover:bg-white/90 p-3 rounded-2xl border border-rose-100/60 transition-all cursor-pointer"
                  onClick={() => {
                    sounds.playPop(1 + idx * 0.1);
                    setActiveTrait(activeTrait === idx ? null : idx);
                  }}
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-deep-800 mb-1.5">
                    <div className="flex items-center space-x-2">
                      {getTraitIcon(trait.icon)}
                      <span>{trait.name}</span>
                    </div>
                    <span className="font-display font-bold text-roseGold-600">
                      {trait.value}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-rose-100/60 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${trait.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${trait.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                    />
                  </div>

                  {/* Expandable trait description */}
                  <AnimatePresence>
                    {activeTrait === idx && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-deep-600 mt-2 font-medium bg-rose-50/80 p-2 rounded-xl"
                      >
                        💡 {trait.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-deep-500 italic text-center mt-2 font-medium">
            * Tap any trait above to reveal why it defines her unique character.
          </p>
        </div>


        {/* ========================================================
            CARD 2: Friendship Highlights (Minimalist Stat Counters)
            Col-Span: 5 on Desktop
            ======================================================== */}
        <div className="md:col-span-5 glass-panel rounded-3xl p-6 sm:p-7 border border-white/80 shadow-glass flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-lavender-100 text-lavender-600 rounded-xl">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-deep-900">
                  Friendship Highlights 📊
                </h3>
                <p className="text-xs text-deep-500 font-medium">
                  Verified metrics of an irreplaceable bond
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5 my-3">
              {KOWSHI_DATA.highlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3 }}
                  className="bg-white/70 rounded-2xl p-3.5 border border-rose-100/80 shadow-sm text-center"
                >
                  <span className="block font-display font-bold text-2xl sm:text-3xl text-roseGold-600">
                    {item.value}
                  </span>
                  <span className="block text-xs font-bold text-deep-800 mt-0.5">
                    {item.label}
                  </span>
                  <span className="block text-[10px] text-deep-500 font-medium mt-1">
                    {item.desc}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-4 bg-gradient-to-r from-pink-50 to-lavender-50 p-3 rounded-2xl border border-rose-100 text-center">
            <span className="text-xs font-semibold text-deep-700">
              Contract Terms: <strong className="text-roseGold-600">Non-refundable & Permanent</strong> 🔒💖
            </span>
          </div>
        </div>


        {/* ========================================================
            CARD 3: Music & Ambient Lounge (Floating Mini Player)
            Col-Span: 5 on Desktop
            ======================================================== */}
        <div className="md:col-span-5 glass-panel rounded-3xl p-6 sm:p-7 border border-white/80 shadow-glass flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-rose-100 text-roseGold-600 rounded-xl">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-deep-900">
                    Ambient Melodies 🎶
                  </h3>
                  <p className="text-xs text-deep-500 font-medium">
                    Lo-fi celesta & warm synthesizer chords
                  </p>
                </div>
              </div>
              <span className={`w-3 h-3 rounded-full ${isAudioPlaying ? 'bg-emerald-400 animate-ping' : 'bg-rose-300'}`} />
            </div>

            {/* Audio Wave Visualizer Graphic */}
            <div className="bg-white/80 rounded-2xl p-4 border border-rose-100 shadow-inner flex items-center justify-center space-x-1.5 h-20 mb-4">
              {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65].map((height, i) => (
                <motion.span
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-roseGold-400 to-lavender-400 rounded-full"
                  animate={isAudioPlaying ? {
                    height: [`${height * 0.3}%`, `${height}%`, `${height * 0.4}%`],
                  } : { height: '20%' }}
                  transition={{
                    duration: 0.8 + (i % 4) * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.05
                  }}
                />
              ))}
            </div>

            {/* Soundboard buttons */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <button
                onClick={() => { sounds.playMoo(); fireMicroPop(0.3, 0.6); }}
                className="bg-white hover:bg-rose-50 text-deep-800 font-semibold py-2 px-1 rounded-xl border border-rose-100 transition-all active:scale-95 shadow-sm"
              >
                🐮 Moo
              </button>
              <button
                onClick={() => { sounds.playChime(); fireMicroPop(0.5, 0.6); }}
                className="bg-white hover:bg-rose-50 text-deep-800 font-semibold py-2 px-1 rounded-xl border border-rose-100 transition-all active:scale-95 shadow-sm"
              >
                ✨ Chimes
              </button>
              <button
                onClick={() => { sounds.playFanfare(); fireMicroPop(0.7, 0.6); }}
                className="bg-white hover:bg-rose-50 text-deep-800 font-semibold py-2 px-1 rounded-xl border border-rose-100 transition-all active:scale-95 shadow-sm"
              >
                🎺 Fanfare
              </button>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onToggleAudio}
            className={`w-full mt-4 flex items-center justify-center space-x-2 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-sm ${
              isAudioPlaying
                ? 'bg-gradient-to-r from-roseGold-500 to-lavender-500 text-white shadow-glass-glow'
                : 'bg-white hover:bg-rose-50 text-deep-800 border border-rose-200'
            }`}
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-4 h-4" />
                <span>Pause Ambient Music</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-roseGold-500" />
                <span>Play Peaceful Birthday Melody</span>
              </>
            )}
          </motion.button>
        </div>


        {/* ========================================================
            CARD 4: Inside Joke Vault (3D Flippable Cards)
            Col-Span: 7 on Desktop
            ======================================================== */}
        <div className="md:col-span-7 glass-panel rounded-3xl p-6 sm:p-7 border border-white/80 shadow-glass flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                  <Laugh className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-deep-900">
                    Inside Joke Vault 🗝️
                  </h3>
                  <p className="text-xs text-deep-500 font-medium">
                    Tap to flip cards and unlock our shared inside jokes
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-roseGold-500 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                Tap to Flip ↺
              </span>
            </div>

            {/* Flippable cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-3">
              {KOWSHI_DATA.insideJokes.map((joke) => {
                const isFlipped = !!flippedCards[joke.id];
                return (
                  <div
                    key={joke.id}
                    onClick={() => toggleFlip(joke.id)}
                    className="relative h-32 cursor-pointer select-none perspective"
                    style={{ perspective: 1000 }}
                  >
                    <motion.div
                      className="w-full h-full relative"
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* FRONT FACE */}
                      <div
                        className="absolute inset-0 bg-white/80 hover:bg-white rounded-2xl p-3.5 border border-rose-200/80 shadow-sm flex flex-col justify-between"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-roseGold-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                            {joke.tag}
                          </span>
                          <RotateCw className="w-3.5 h-3.5 text-deep-400" />
                        </div>
                        <h4 className="font-display font-bold text-sm text-deep-800">
                          {joke.title}
                        </h4>
                        <p className="text-[11px] text-deep-500 font-medium">
                          {joke.frontHint}
                        </p>
                      </div>

                      {/* BACK FACE (FLIPPED REVEAL) */}
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-lavender-50 rounded-2xl p-3.5 border border-roseGold-300 shadow-md flex flex-col justify-between"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)"
                        }}
                      >
                        <span className="text-[10px] font-bold text-roseGold-600 uppercase tracking-wide">
                          ✨ Memory Unlocked
                        </span>
                        <p className="text-xs text-deep-800 font-semibold leading-relaxed">
                          {joke.backReveal}
                        </p>
                        <span className="text-[10px] text-deep-400 text-right">
                          Tap to flip back
                        </span>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-[11px] text-deep-500 italic text-center mt-2 font-medium">
            * Some memories are too chaotic to explain to normal people! 🐮✨
          </p>
        </div>

      </div>
    </section>
  );
}
