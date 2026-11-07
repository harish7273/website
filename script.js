/**
 * ============================================================================
 * KOWSHI'S BIRTHDAY - BENTO GRID & KAWAII COW INTERACTIVE SCRIPT
 * Production-Quality Vanilla JavaScript with Web Audio Synthesis & Canvas-Confetti
 * ============================================================================
 */

/* ============================================================================
   1. EDITABLE CONFIGURATION (All personal details are editable here)
   ============================================================================ */
const CONFIG = {
  name: "Kowshi",
  nicknames: ["Kowsh", "Cow-shi", "Bestie"],
  fromName: "Harish",
  age: 19,
  birthDate: "2007-11-26",
  birthdayCelebrationDate: "2026-11-26",
  birthdayDateFormatted: "November 26, 2026",
  themeColor: "#ff85a2",
  musicFile: "assets/birthday.mp3",
  musicVolume: 0.85,
  photos: [
    "assets/p1.jpg",
    "assets/p2.jpg",
    "assets/p3.jpg",
    "assets/p4.jpg",
    "assets/p5.jpg",
    "assets/p6.jpg"
  ],
  photoCaptions: [
    "The One & Only Kowsh 🐮",
    "Chaos, Giggles & Wholesomeness ✨",
    "Top Tier Friendship 💖",
    "Late Night Gossip & Deep Talks ☕",
    "Unfiltered, Real & True 🌸",
    "Forever & Always Besties 🍀"
  ],
  letterContent: `
    <p>Happy 19th Birthday to one of my absolute closest and dearest best friends in the entire world! 🎂✨</p>
    <p>You might not have been my first female friend, but you have effortlessly become one of the most irreplaceable people in my life. From our random laughing fits over the dumbest things to those late-night conversations where we talk about life, dreams, and everything in between—every moment with you is pure comfort and gold.</p>
    <p>Thank you for always being your genuine, unfiltered, chaotic, and wonderfully kind self. Thank you for listening to my rants without judgment, for celebrating my wins, and for standing by me whenever things got tough. Having a friend like you is a rare blessing that I never take for granted.</p>
    <p>As you step into your 19th chapter, I wish you peace of mind, wild adventures, immense happiness, and every ounce of success you've been working so hard for. Never change who you are, Cow-shi. Keep shining bright, keep smiling that radiant smile, and remember that no matter where life leads us, I've always got your back!</p>
  `,
  coupons: [
    {
      type: "☕ BESTIE COUPON",
      title: "Free Iced Coffee or Boba 🧋",
      desc: "Valid anytime you need a caffeine hit or sweet treat. Harish pays, no questions asked!"
    },
    {
      type: "🗣️ BESTIE PASS",
      title: "1 Unlimited Rant Session 📢",
      desc: "Zero interruptions, 100% agreement, and absolute confidentiality on any topic."
    },
    {
      type: "🚗 ADVENTURE PASS",
      title: "Spontaneous Food Hunt / Road Trip 🍕",
      desc: "Pack your bags or just your appetite. Good food, playlist control, and zero stress."
    },
    {
      type: "✨ COSMIC PREDICTION",
      title: "Astonishing Year Ahead 🌟",
      desc: "The universe guarantees: massive career wins, unforgettable memories, and zero toxic drama!"
    },
    {
      type: "🛡️ EMERGENCY PASS",
      title: "Fake Phone Call / Escape Pass 📞",
      desc: "Stuck in an awkward conversation? One ping, and an urgent rescue call is guaranteed."
    },
    {
      type: "🍰 SWEET TREAT",
      title: "Dessert on Demand 🍨",
      desc: "Craving ice cream or waffle at 10 PM? Redeemed and delivered with zero hesitation."
    }
  ],
  defaultNotes: [
    { text: "Happy Birthday Kowsh! Udderly the best human ever! 🐮✨", color: "pink", sticker: "🐮", hearts: 8 },
    { text: "May this year bring you endless happiness, good food, and peace! 🌸💖", color: "mint", sticker: "💖", hearts: 12 },
    { text: "Certified #1 Bestie! Thank you for always listening to my rants 😇", color: "butter", sticker: "✨", hearts: 6 },
    { text: "To another year of chaotic laughing until our bellies hurt! 🥂🎂", color: "lavender", sticker: "🎂", hearts: 15 }
  ]
};

/* ============================================================================
   2. URL PARAMETER OVERRIDES
   ============================================================================ */
(function applyUrlOverrides() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("name")) CONFIG.name = params.get("name").trim();
  if (params.get("from") || params.get("fromName")) {
    CONFIG.fromName = (params.get("from") || params.get("fromName")).trim();
  }
})();

/* ============================================================================
   3. WEB AUDIO SYNTHESIZER ENGINE (Moo sound, Chimes, Pops, Lo-fi Chords)
   ============================================================================ */
class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
  }

  getContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Cute Kawaii Moo Synthesizer! 🐮
  playMoo() {
    const ctx = this.getContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Dual oscillator blend (sawtooth + triangle) for a warm cartoon vocal tract
    osc1.type = "sawtooth";
    osc2.type = "triangle";

    // Playful pitch drop like "Moo-oo~"
    osc1.frequency.setValueAtTime(220, t);
    osc1.frequency.exponentialRampToValueAtTime(140, t + 0.65);

    osc2.frequency.setValueAtTime(222, t);
    osc2.frequency.exponentialRampToValueAtTime(142, t + 0.65);

    // Resonant bandpass filter creates the "oo" formant
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(650, t);
    filter.frequency.linearRampToValueAtTime(420, t + 0.65);
    filter.Q.setValueAtTime(4.0, t);

    // Volume envelope
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.28, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.7);
    osc2.stop(t + 0.7);
  }

  // Cute Bubble / Button Pop Sound
  playPop() {
    const ctx = this.getContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(480, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.08);

    gain.gain.setValueAtTime(0.22, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.1);
  }

  // Sparkling Bell Chime for Confetti / Milestones
  playSparkleChime() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const t = ctx.currentTime + i * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.6);
    });
  }
}

const sounds = new SoundEngine();

/* ============================================================================
   4. BACKGROUND MUSIC (Lo-fi Chime Synth & Audio Controller)
   ============================================================================ */
class MusicController {
  constructor() {
    this.audioEl = document.getElementById("bg-audio");
    this.toggleBtn = document.getElementById("music-toggle-btn");
    this.isPlaying = false;
    this.synthLoop = null;
    this.init();
  }

  init() {
    if (this.audioEl) {
      this.audioEl.src = CONFIG.musicFile;
      this.audioEl.volume = CONFIG.musicVolume || 0.85;

      this.audioEl.addEventListener("error", () => {
        console.log("No custom mp3 file loaded. Using synthesized ambient lofi music box.");
      });
    }

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener("click", () => this.toggle());
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.updateUI(true);

    if (this.audioEl && this.audioEl.src) {
      const p = this.audioEl.play();
      if (p !== undefined) {
        p.catch(() => {
          this.startSynthMelody();
        });
      }
    } else {
      this.startSynthMelody();
    }
  }

  pause() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    this.updateUI(false);

    if (this.audioEl) {
      this.audioEl.pause();
    }
    if (this.synthLoop) {
      clearInterval(this.synthLoop);
      this.synthLoop = null;
    }
  }

  updateUI(playing) {
    if (this.toggleBtn) {
      this.toggleBtn.classList.toggle("playing", playing);
    }
  }

  // Warm Lo-Fi celesta chords using Web Audio API
  startSynthMelody() {
    const ctx = sounds.getContext();
    if (!ctx) return;

    // Sweet peaceful chords: Fmaj7 -> G -> Em7 -> Am
    const chords = [
      [349.23, 440.00, 523.25, 659.25], // Fmaj7
      [392.00, 493.88, 587.33],         // G
      [329.63, 392.00, 493.88, 587.33], // Em7
      [261.63, 329.63, 440.00, 523.25]  // Am
    ];

    let chordIdx = 0;
    const playChord = () => {
      if (!this.isPlaying) return;
      const t = ctx.currentTime;
      const notes = chords[chordIdx % chords.length];
      chordIdx++;

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t + i * 0.05);

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.08, t + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 2.5);
      });
    };

    playChord();
    this.synthLoop = setInterval(playChord, 3000);
  }
}

const music = new MusicController();

/* ============================================================================
   5. AMBIENT BACKGROUND CANVAS (Floating Kawaii Clouds, Cows & Sparkles)
   ============================================================================ */
class AmbientCanvas {
  constructor() {
    this.canvas = document.getElementById("ambient-canvas");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.elements = [];
    this.count = window.innerWidth < 768 ? 16 : 28;
    this.resize();
    this.initElements();
    this.bindEvents();
    this.render();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  initElements() {
    this.elements = [];
    const types = ["🐮", "☁️", "🌸", "✨", "🧃"];
    for (let i = 0; i < this.count; i++) {
      this.elements.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        symbol: types[Math.floor(Math.random() * types.length)],
        size: Math.random() * 14 + 18,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4 - 0.15,
        alpha: Math.random() * 0.5 + 0.35,
        twinkle: Math.random() * 0.02 + 0.01
      });
    }
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      this.resize();
      this.initElements();
    });
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.elements.length; i++) {
      const el = this.elements[i];
      el.x += el.speedX;
      el.y += el.speedY;

      if (el.x < -50) el.x = this.width + 50;
      if (el.x > this.width + 50) el.x = -50;
      if (el.y < -50) el.y = this.height + 50;
      if (el.y > this.height + 50) el.y = -50;

      this.ctx.globalAlpha = el.alpha;
      this.ctx.font = `${el.size}px sans-serif`;
      this.ctx.fillText(el.symbol, el.x, el.y);
    }

    this.ctx.globalAlpha = 1;
    requestAnimationFrame(() => this.render());
  }
}

/* ============================================================================
   6. CELEBRATION CLOCK / TICKER
   ============================================================================ */
function initCelebrationClock() {
  const clockTitle = document.getElementById("clock-title");
  const elYears = document.getElementById("time-years");
  const elDays = document.getElementById("time-days");
  const elHours = document.getElementById("time-hours");
  const elMins = document.getElementById("time-mins");
  const elSecs = document.getElementById("time-secs");

  const targetBday = new Date("2026-11-26T00:00:00");

  function update() {
    const now = new Date();

    if (now >= targetBday) {
      // It is her 19th birthday!
      if (clockTitle) clockTitle.textContent = "Officially 19 Years of Pure Sunshine! 🐮✨";
      const diffSinceBday = Math.max(0, now - targetBday);
      const totalSeconds = Math.floor(diffSinceBday / 1000);
      const seconds = totalSeconds % 60;
      const totalMinutes = Math.floor(totalSeconds / 60);
      const minutes = totalMinutes % 60;
      const totalHours = Math.floor(totalMinutes / 60);
      const hours = totalHours % 24;
      const totalDays = Math.floor(totalHours / 24);

      if (elYears) elYears.textContent = "19";
      if (elDays) elDays.textContent = String(totalDays).padStart(2, "0");
      if (elHours) elHours.textContent = String(hours).padStart(2, "0");
      if (elMins) elMins.textContent = String(minutes).padStart(2, "0");
      if (elSecs) elSecs.textContent = String(seconds).padStart(2, "0");
    } else {
      // Countdown to Nov 26, 2026 (turning 19)
      const diffToBday = Math.max(0, targetBday - now);
      const totalSeconds = Math.floor(diffToBday / 1000);
      const seconds = totalSeconds % 60;
      const totalMinutes = Math.floor(totalSeconds / 60);
      const minutes = totalMinutes % 60;
      const totalHours = Math.floor(totalMinutes / 60);
      const hours = totalHours % 24;
      const totalDays = Math.floor(totalHours / 24);

      if (clockTitle) clockTitle.textContent = "Countdown to Kowsh's 19th Birthday (Nov 26) 🐮";
      if (elYears) elYears.textContent = "19";
      if (elDays) elDays.textContent = String(totalDays).padStart(2, "0");
      if (elHours) elHours.textContent = String(hours).padStart(2, "0");
      if (elMins) elMins.textContent = String(minutes).padStart(2, "0");
      if (elSecs) elSecs.textContent = String(seconds).padStart(2, "0");
    }
  }

  update();
  setInterval(update, 1000);
}

/* ============================================================================
   7. INTERACTIVE MINI-COWS & SPEECH BUBBLE (The Mascot Feature)
   ============================================================================ */
function initMiniCows() {
  const miniCowBtns = document.querySelectorAll(".mini-cow-btn");
  const speechBubble = document.getElementById("cow-speech-bubble");
  const speechText = document.getElementById("speech-bubble-text");

  miniCowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // 1. Play cute moo sound!
      sounds.playMoo();

      // 2. Micro confetti pop
      if (window.confetti) {
        confetti({
          particleCount: 20,
          spread: 45,
          origin: { y: 0.6 }
        });
      }

      // 3. Show speech bubble with compliment
      const compliment = btn.getAttribute("data-compliment");
      if (speechBubble && speechText) {
        speechText.textContent = compliment;
        speechBubble.classList.remove("hidden");
      }
    });
  });

  // Top Moo pill button in navigation
  const mooBtn = document.getElementById("moo-btn");
  if (mooBtn) {
    mooBtn.addEventListener("click", () => {
      sounds.playMoo();
      if (window.confetti) {
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { y: 0.1 }
        });
      }
    });
  }
}

/* ============================================================================
   8. SURPRISE GIFT BOX & BESTIE FORTUNE DISPENSER
   ============================================================================ */
function initFortuneBox() {
  const giftBox = document.getElementById("fortune-gift-box");
  const couponTicket = document.getElementById("coupon-ticket");
  const drawAnotherBtn = document.getElementById("draw-another-coupon-btn");
  const couponType = document.getElementById("coupon-type");
  const couponTitle = document.getElementById("coupon-title");
  const couponDesc = document.getElementById("coupon-desc");

  let currentCouponIdx = 0;

  function renderCoupon() {
    const coupon = CONFIG.coupons[currentCouponIdx % CONFIG.coupons.length];
    if (couponType) couponType.textContent = coupon.type;
    if (couponTitle) couponTitle.textContent = coupon.title;
    if (couponDesc) couponDesc.textContent = coupon.desc;
  }

  function openBox() {
    sounds.playPop();
    sounds.playSparkleChime();

    if (giftBox) giftBox.classList.add("opened");

    if (window.confetti) {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ff85a2", "#d8b4fe", "#86efac", "#fde047"]
      });
    }

    setTimeout(() => {
      renderCoupon();
      if (couponTicket) couponTicket.classList.remove("hidden");
    }, 350);
  }

  if (giftBox) {
    giftBox.addEventListener("click", openBox);
    giftBox.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openBox();
      }
    });
  }

  if (drawAnotherBtn) {
    drawAnotherBtn.addEventListener("click", () => {
      sounds.playPop();
      currentCouponIdx++;
      renderCoupon();

      if (window.confetti) {
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.65 }
        });
      }
    });
  }
}

/* ============================================================================
   9. POLAROID MEMORY GALLERY & LIGHTBOX
   ============================================================================ */
let activePhotoIdx = 0;

function buildGallery() {
  const deck = document.getElementById("polaroid-deck");
  if (!deck) return;
  deck.innerHTML = "";

  const tilts = [-3, 2, -2, 3, -1.5, 2.5];

  // Check if user has saved custom photos in localStorage
  let photos = CONFIG.photos;
  try {
    const saved = localStorage.getItem("kowshi_gallery_photos");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) photos = parsed;
    }
  } catch(e) {}

  photos.forEach((photoSrc, idx) => {
    const cap = (CONFIG.photoCaptions && CONFIG.photoCaptions[idx]) || `Memory #${idx + 1}`;
    const tilt = tilts[idx % tilts.length];

    const card = document.createElement("div");
    card.className = "polaroid-card";
    card.style.setProperty("--tilt", `${tilt}deg`);
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View photo: ${cap}`);

    card.innerHTML = `
      <div class="polaroid-img-box">
        <img src="${photoSrc}" alt="${cap}" loading="lazy" onerror="this.onerror=null; this.src='assets/p1.jpg';">
      </div>
      <div class="polaroid-cap">${cap}</div>
    `;

    card.addEventListener("click", () => openLightbox(idx, photos));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(idx, photos);
      }
    });

    deck.appendChild(card);
  });
}

function openLightbox(index, photosList) {
  const modal = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-img");
  const cap = document.getElementById("lightbox-caption");
  if (!modal) return;

  activePhotoIdx = index;
  const list = photosList || CONFIG.photos;

  if (img) img.src = list[activePhotoIdx];
  if (cap) cap.textContent = (CONFIG.photoCaptions && CONFIG.photoCaptions[activePhotoIdx]) || `Memory #${activePhotoIdx + 1}`;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  sounds.playPop();
}

function closeLightbox() {
  const modal = document.getElementById("lightbox-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function initLightboxEvents() {
  const closeBtn = document.getElementById("lightbox-close");
  const backdrop = document.getElementById("lightbox-backdrop");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");
  const img = document.getElementById("lightbox-img");
  const cap = document.getElementById("lightbox-caption");

  const changePhoto = (step) => {
    activePhotoIdx = (activePhotoIdx + step + CONFIG.photos.length) % CONFIG.photos.length;
    if (img) img.src = CONFIG.photos[activePhotoIdx];
    if (cap) cap.textContent = (CONFIG.photoCaptions && CONFIG.photoCaptions[activePhotoIdx]) || `Memory #${activePhotoIdx + 1}`;
    sounds.playPop();
  };

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (backdrop) backdrop.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", () => changePhoto(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => changePhoto(1));

  window.addEventListener("keydown", (e) => {
    const modal = document.getElementById("lightbox-modal");
    if (!modal || modal.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") changePhoto(-1);
    if (e.key === "ArrowRight") changePhoto(1);
  });

  // User 1-Click photo uploader
  const addPhotoInput = document.getElementById("gallery-add-photo-input");
  if (addPhotoInput) {
    addPhotoInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target.result;
          let currentPhotos = [...CONFIG.photos];
          currentPhotos[0] = dataUrl; // Update first snapshot
          try {
            localStorage.setItem("kowshi_gallery_photos", JSON.stringify(currentPhotos));
          } catch(err) {}
          buildGallery();
          sounds.playSparkleChime();
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

/* ============================================================================
   10. HEARTFELT DEEP LETTER MODAL
   ============================================================================ */
function initLetterModal() {
  const openBtn = document.getElementById("open-letter-modal-btn");
  const modal = document.getElementById("letter-modal");
  const closeBtn = document.getElementById("letter-modal-close");
  const backdrop = document.getElementById("letter-modal-backdrop");
  const textFlow = document.getElementById("letter-full-text");
  const letterAuthor = document.getElementById("letter-author");

  if (textFlow) {
    textFlow.innerHTML = CONFIG.letterContent;
  }
  if (letterAuthor) {
    letterAuthor.textContent = `${CONFIG.fromName} 🐮✨`;
  }

  const openLetter = () => {
    sounds.playSparkleChime();
    if (modal) modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  };

  const closeLetter = () => {
    if (modal) modal.classList.add("hidden");
    document.body.style.overflow = "";
  };

  if (openBtn) openBtn.addEventListener("click", openLetter);
  if (closeBtn) closeBtn.addEventListener("click", closeLetter);
  if (backdrop) backdrop.addEventListener("click", closeLetter);
}

/* ============================================================================
   11. DIGITAL WISH JAR / STICKY WALL
   ============================================================================ */
function initWishJar() {
  const board = document.getElementById("sticky-board");
  const input = document.getElementById("new-note-input");
  const postBtn = document.getElementById("post-note-btn");
  const colorDots = document.querySelectorAll(".color-dot");
  const stickerSelect = document.getElementById("sticker-select");

  let selectedColor = "pink";

  colorDots.forEach(dot => {
    dot.addEventListener("click", () => {
      colorDots.forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
      selectedColor = dot.getAttribute("data-color");
    });
  });

  // Get notes from localStorage or defaults
  let notes = [];
  try {
    const saved = localStorage.getItem("kowshi_wish_notes");
    notes = saved ? JSON.parse(saved) : CONFIG.defaultNotes;
  } catch(e) {
    notes = CONFIG.defaultNotes;
  }

  function renderNotes() {
    if (!board) return;
    board.innerHTML = "";

    const rotations = [-2, 1.5, -1, 2, -2.5, 1];

    notes.forEach((note, idx) => {
      const rot = rotations[idx % rotations.length];
      const card = document.createElement("div");
      card.className = `sticky-note bg-${note.color || 'pink'}`;
      card.style.setProperty("--rot", `${rot}deg`);

      card.innerHTML = `
        <span class="note-pin">📌</span>
        <p class="note-text">${escapeHtml(note.text)}</p>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="note-sticker">${note.sticker || '🐮'}</span>
          <button class="note-heart-btn" aria-label="Heart this note">
            ❤️ <span>${note.hearts || 0}</span>
          </button>
        </div>
      `;

      // Heart button handler
      const heartBtn = card.querySelector(".note-heart-btn");
      heartBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        note.hearts = (note.hearts || 0) + 1;
        saveAndRerender();
        sounds.playPop();
      });

      board.appendChild(card);
    });
  }

  function saveAndRerender() {
    try {
      localStorage.setItem("kowshi_wish_notes", JSON.stringify(notes));
    } catch(e) {}
    renderNotes();
  }

  function postNote() {
    const text = input.value.trim();
    if (!text) return;

    sounds.playPop();
    sounds.playSparkleChime();

    const newNote = {
      text: text,
      color: selectedColor,
      sticker: (stickerSelect && stickerSelect.value) || "🐮",
      hearts: 1
    };

    notes.unshift(newNote);
    input.value = "";
    saveAndRerender();

    if (window.confetti) {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.7 }
      });
    }
  }

  if (postBtn) postBtn.addEventListener("click", postNote);
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        postNote();
      }
    });
  }

  renderNotes();
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* ============================================================================
   12. GRAND FINALE: BALLOONS & LANTERNS RELEASE
   ============================================================================ */
function initGrandFinale() {
  const releaseBtn = document.getElementById("release-balloons-btn");
  const layer = document.getElementById("flying-elements-layer");

  if (!releaseBtn || !layer) return;

  releaseBtn.addEventListener("click", () => {
    sounds.playSparkleChime();
    music.play();

    // 1. Confetti Cannons
    if (window.confetti) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#ff85a2", "#d8b4fe", "#86efac", "#fde047", "#ffffff"]
      });

      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 70,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 70,
          origin: { x: 1 }
        });
      }, 300);
    }

    // 2. Spawn Flying Sky Lanterns (🏮), Balloons (🎈) & Cute Cows (🐮)
    const icons = ["🎈", "🏮", "🐮", "🌸", "✨", "🎈", "🏮"];
    for (let i = 0; i < 35; i++) {
      const el = document.createElement("div");
      el.className = "sky-element";
      el.textContent = icons[Math.floor(Math.random() * icons.length)];
      el.style.left = `${Math.random() * 95}%`;
      el.style.fontSize = `${Math.random() * 20 + 26}px`;

      const duration = Math.random() * 4 + 5; // 5 to 9 seconds
      const delay = Math.random() * 1.5;
      el.style.animationDuration = `${duration}s`;
      el.style.animationDelay = `${delay}s`;

      layer.appendChild(el);

      setTimeout(() => {
        el.remove();
      }, (duration + delay) * 1000);
    }
  });

  // Hero "Unwrap Surprise" button
  const heroUnwrapBtn = document.getElementById("unwrap-surprise-btn");
  if (heroUnwrapBtn) {
    heroUnwrapBtn.addEventListener("click", () => {
      sounds.playMoo();
      sounds.playSparkleChime();
      music.play();

      if (window.confetti) {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 }
        });
      }

      // Smooth scroll to bento grid
      const bento = document.getElementById("bento-grid");
      if (bento) {
        bento.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Pre-fill WhatsApp link
  const waBtn = document.getElementById("whatsapp-bestie-btn");
  if (waBtn) {
    const msg = encodeURIComponent(
      `Hey ${CONFIG.fromName}! OMG thank you so much for this adorable cow-themed birthday website! Cow-shi loved it so much! 🐮💖✨`
    );
    waBtn.href = `https://wa.me/?text=${msg}`;
  }
}

/* ============================================================================
   13. INITIALIZATION ON DOM READY
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Ambient Background Canvas
  new AmbientCanvas();

  // 2. Hero Celebration Clock
  initCelebrationClock();

  // 3. Mini Cows & Speech Bubble
  initMiniCows();

  // 4. Fortune Box Dispenser
  initFortuneBox();

  // 5. Snapshot Polaroid Gallery
  buildGallery();
  initLightboxEvents();

  // 6. Deep Letter Modal
  initLetterModal();

  // 7. Digital Wish Jar / Sticky Wall
  initWishJar();

  // 8. Grand Finale & Actions
  initGrandFinale();
});
