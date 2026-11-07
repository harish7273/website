import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pin, Heart, Send, Sparkles, MessageCircle } from 'lucide-react';
import { KOWSHI_DATA } from '../data/kowshiData';
import { sounds } from '../utils/soundEngine';
import { fireMicroPop } from '../utils/confettiEffects';

export default function WishesBoard() {
  const [wishes, setWishes] = useState([]);
  const [authorInput, setAuthorInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [selectedColor, setSelectedColor] = useState('pink');
  const [selectedSticker, setSelectedSticker] = useState('🐮');

  // Load from localStorage or defaults
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kowshi_birthday_wishes_react');
      if (saved) {
        setWishes(JSON.parse(saved));
      } else {
        setWishes(KOWSHI_DATA.initialWishes);
      }
    } catch {
      setWishes(KOWSHI_DATA.initialWishes);
    }
  }, []);

  // Save to localStorage
  const saveWishes = (updated) => {
    setWishes(updated);
    try {
      localStorage.setItem('kowshi_birthday_wishes_react', JSON.stringify(updated));
    } catch {
      // Storage error fallback
    }
  };

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    sounds.playChime();
    fireMicroPop(0.5, 0.7);

    const newWish = {
      id: "w_" + Date.now(),
      author: authorInput.trim() || "A Loving Friend",
      text: textInput.trim(),
      color: selectedColor,
      sticker: selectedSticker,
      likes: 1,
    };

    const updated = [newWish, ...wishes];
    saveWishes(updated);

    setTextInput('');
    setAuthorInput('');
  };

  const handleLike = (id) => {
    sounds.playPop(1.4);
    const updated = wishes.map((w) =>
      w.id === id ? { ...w, likes: (w.likes || 0) + 1 } : w
    );
    saveWishes(updated);
  };

  const colorStyles = {
    pink: 'bg-gradient-to-br from-pink-100 to-rose-100 border-pink-200 text-deep-900',
    mint: 'bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-200 text-deep-900',
    butter: 'bg-gradient-to-br from-yellow-50 to-amber-100 border-amber-200 text-deep-900',
    lavender: 'bg-gradient-to-br from-purple-50 to-lavender-100 border-purple-200 text-deep-900',
  };

  const stickers = ["🐮", "💖", "✨", "🎂", "🌸", "🧃", "🍀"];

  return (
    <section id="wishes" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-1.5 bg-lavender-100 text-lavender-600 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-lavender-200">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Interactive Wish Jar</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-deep-900 tracking-tight">
          Birthday Wish Jar & Sticky Wall 🫙✨
        </h2>
        <p className="text-sm text-deep-600 mt-2 font-medium">
          Leave a sweet or hilarious 19th birthday wish for Kowshi. Saved permanently!
        </p>
      </div>

      {/* Main Container */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-glass">
        
        {/* Form to Pin Wish */}
        <form onSubmit={handleAddWish} className="max-w-2xl mx-auto bg-white/70 p-5 rounded-2xl border border-rose-100 shadow-sm mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <input
              type="text"
              placeholder="Your name (e.g. Bestie)"
              value={authorInput}
              onChange={(e) => setAuthorInput(e.target.value)}
              maxLength={25}
              className="px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-roseGold-400 font-medium"
            />
            <div className="sm:col-span-2 flex items-center justify-between space-x-2">
              {/* Color Picker */}
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-semibold text-deep-500 mr-1 hidden sm:inline">Color:</span>
                {['pink', 'mint', 'butter', 'lavender'].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      color === 'pink' ? 'bg-pink-300' :
                      color === 'mint' ? 'bg-emerald-300' :
                      color === 'butter' ? 'bg-yellow-300' : 'bg-purple-300'
                    } ${selectedColor === color ? 'scale-110 border-deep-800 shadow-sm' : 'border-white'}`}
                  />
                ))}
              </div>

              {/* Sticker Selector */}
              <select
                value={selectedSticker}
                onChange={(e) => setSelectedSticker(e.target.value)}
                className="px-2 py-1.5 text-xs rounded-xl border border-rose-200 bg-white font-bold"
              >
                {stickers.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Write a sweet, heartfelt or funny message..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              maxLength={120}
              required
              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-roseGold-400 font-medium"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-roseGold-500 to-pink-500 hover:from-roseGold-600 hover:to-pink-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-1.5 shadow-sm active:scale-95 transition-all"
            >
              <Pin className="w-4 h-4" />
              <span>Pin</span>
            </button>
          </div>
        </form>

        {/* Sticky Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {wishes.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -4, rotate: 0 }}
                className={`relative rounded-2xl p-4 shadow-sm border ${colorStyles[item.color] || colorStyles.pink} flex flex-col justify-between min-h-[140px] select-none`}
              >
                {/* Note Pin */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-sm drop-shadow">
                  📌
                </div>

                {/* Sticker */}
                <span className="absolute top-2 right-2 text-lg">
                  {item.sticker}
                </span>

                {/* Content */}
                <div className="mt-2 mb-3">
                  <span className="block text-[11px] font-bold text-deep-500 uppercase tracking-wider mb-1">
                    From {item.author}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                    "{item.text}"
                  </p>
                </div>

                {/* Bottom Like Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-black/5 text-xs font-semibold">
                  <span className="text-[10px] text-deep-400">#Kowsh19</span>
                  <button
                    onClick={() => handleLike(item.id)}
                    className="flex items-center space-x-1 text-roseGold-600 hover:text-roseGold-700 bg-white/70 px-2 py-0.5 rounded-full transition-all active:scale-90"
                  >
                    <Heart className="w-3 h-3 fill-roseGold-500 text-roseGold-500" />
                    <span>{item.likes}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
