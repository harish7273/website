/**
 * ============================================================================
 * BIRTHDAY WISH - CINEMATIC MOTION DESIGN SCRIPT
 * Production-Quality Vanilla JavaScript with GSAP & Canvas-Confetti
 * ============================================================================
 */

/* ============================================================================
   1. EDITABLE CONFIGURATION (Customize everything personal here)
   ============================================================================ */
const CONFIG = {
  name: "Harishma",
  nickname: "cockroachh",
  fromName: "Harish",
  age: 19,
  birthdayDate: "2026-11-01",
  themeColor: "#ff4d8d",
  musicFile: "assets/birthday.mp3",
  musicVolume: 0.88,
  photos: [
    "assets/p1.jpg",
    "assets/p2.jpg",
    "assets/p3.jpg",
    "assets/p4.jpg",
    "assets/p5.jpg",
    "assets/p6.jpg"
  ],
  photoCaptions: [
    "My Bestest Friend Ever 💖",
    "Chaotic Energy & Pure Magic 🪳",
    "Unfiltered Laughter",
    "Partner In Crime",
    "Always Got Each Other's Back",
    "Forever & Always Besties ✨"
  ],
  mainMessage: "Happy Birthday to my absolute bestest female friend in the entire universe! 🎂 From dealing with all my chaos and drama to laughing until our stomachs hurt over the dumbest jokes, there is truly nobody else like you. You're not just my best friend—you're family, my unpaid therapist, and my favorite troublemaker. Thank you for always having my back and being the most genuine, caring, and chaotic human ever. May this year bring you all the endless happiness, success, and love you deserve. Happy Birthday cockroachh! 🪳✨",
  reasons: [
    "Your crazy chaotic energy that makes every single moment hilarious 🪳",
    "Always having my back through thick and thin, no matter what happens 💖",
    "Endless unfiltered gossip, late-night talks, and laughing until we can't breathe 🌟",
    "Knowing all my deepest secrets and still proudly choosing to be my best friend 💫",
    "Being the most genuine, loyal, and irreplaceable female bestie in the world 🌸"
  ],
  secretFinalNote: "Dear cockroachh 🪳, no matter where life takes us or how old and wrinkly we get, you're stuck with me forever as your best friend! Keep shining, keep being your chaotic wonderful self. Love you heaps bestie! 💖✨"
};

/* ============================================================================
   2. URL PARAMETER OVERRIDES (Personalize dynamically via URL)
   Example: ?name=Anya&from=Kiran&age=22&theme=%23ff3366
   ============================================================================ */
(function applyUrlOverrides() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("name")) CONFIG.name = params.get("name").trim();
  if (params.get("nickname")) CONFIG.nickname = params.get("nickname").trim();
  if (params.get("from") || params.get("fromName")) {
    CONFIG.fromName = (params.get("from") || params.get("fromName")).trim();
  }
  if (params.get("age")) {
    const parsedAge = parseInt(params.get("age"), 10);
    if (!isNaN(parsedAge)) CONFIG.age = parsedAge;
  }
  if (params.get("birthdayDate") || params.get("date")) {
    CONFIG.birthdayDate = (params.get("birthdayDate") || params.get("date")).trim();
  }
  if (params.get("theme") || params.get("themeColor")) {
    let color = (params.get("theme") || params.get("themeColor")).trim();
    if (!color.startsWith("#")) color = "#" + color;
    CONFIG.themeColor = color;
  }
  if (params.get("message") || params.get("msg")) {
    CONFIG.mainMessage = (params.get("message") || params.get("msg")).trim();
  }
  if (params.get("note")) {
    CONFIG.secretFinalNote = params.get("note").trim();
  }
  if (params.get("music")) {
    CONFIG.musicFile = params.get("music").trim();
  }
})();

/* ============================================================================
   3. COLOR ENGINE & CSS VARIABLE INJECTOR
   ============================================================================ */
function hexToRgb(hex) {
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c.split("").map(ch => ch + ch).join("");
  }
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function applyThemeColors(hex) {
  const rgb = hexToRgb(hex);
  const root = document.documentElement;
  root.style.setProperty("--theme-color", hex);
  root.style.setProperty("--theme-color-rgb", `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  root.style.setProperty("--theme-glow", `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`);
  
  // Lighter & Darker shades
  const light = `rgb(${Math.min(255, rgb.r + 35)}, ${Math.min(255, rgb.g + 35)}, ${Math.min(255, rgb.b + 35)})`;
  const dark = `rgb(${Math.max(0, rgb.r - 45)}, ${Math.max(0, rgb.g - 45)}, ${Math.max(0, rgb.b - 45)})`;
  root.style.setProperty("--theme-light", light);
  root.style.setProperty("--theme-dark", dark);

  // Meta theme-color
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) metaTheme.setAttribute("content", hex);
}
applyThemeColors(CONFIG.themeColor);

/* ============================================================================
   4. AUDIO ENGINE & RESILIENT SYNTHESIS FALLBACK
   Plays CONFIG.musicFile. If missing or 404, synthesizes a music-box chime loop!
   ============================================================================ */
class AudioController {
  constructor() {
    this.audioEl = document.getElementById("bg-audio");
    this.toggleBtn = document.getElementById("music-toggle-btn");
    this.isPlaying = false;
    this.audioCtx = null;
    this.isSynthesizing = false;
    this.synthInterval = null;
    this.init();
  }

  init() {
    if (this.audioEl) {
      this.audioEl.src = CONFIG.musicFile;
      this.audioEl.volume = CONFIG.musicVolume || 0.88;
      
      // Fallback to Web Audio API Music Box on loading error
      this.audioEl.addEventListener("error", () => {
        console.warn("Audio file not found or couldn't load. Falling back to ambient chime music box.");
        this.fallbackToSynth();
      });
    }

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener("click", () => this.toggle());
    }
  }

  play() {
    if (this.isPlaying) return;

    if (this.isSynthesizing) {
      this.startSynthLoop();
      this.isPlaying = true;
      this.updateUI(true);
      return;
    }

    if (this.audioEl && this.audioEl.src) {
      const playPromise = this.audioEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.updateUI(true);
          })
          .catch(err => {
            console.warn("Autoplay audio blocked or error, falling back to Web Audio synth:", err);
            this.fallbackToSynth();
            this.startSynthLoop();
            this.isPlaying = true;
            this.updateUI(true);
          });
      }
    } else {
      this.fallbackToSynth();
      this.startSynthLoop();
      this.isPlaying = true;
      this.updateUI(true);
    }
  }

  pause() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.audioEl && !this.isSynthesizing) {
      this.audioEl.pause();
    }
    if (this.isSynthesizing) {
      this.stopSynthLoop();
    }
    this.updateUI(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  updateUI(playing) {
    if (this.toggleBtn) {
      if (playing) {
        this.toggleBtn.classList.add("playing");
        this.toggleBtn.setAttribute("aria-label", "Pause background music");
      } else {
        this.toggleBtn.classList.remove("playing");
        this.toggleBtn.setAttribute("aria-label", "Play background music");
      }
    }
  }

  fallbackToSynth() {
    this.isSynthesizing = true;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx && !this.audioCtx) {
        this.audioCtx = new AudioCtx();
      }
    } catch (e) {
      console.warn("Web Audio not supported in this browser:", e);
    }
  }

  // Plays a rich, mild, louder acoustic chime note
  playChimeNote(freq, time, duration = 1.3) {
    if (!this.audioCtx) return;
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    // Warm, round music-box chime tone
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);

    // Mild Lowpass Filter (keeps it mellow, rich, and avoids harshness)
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2200, time);
    filter.Q.setValueAtTime(0.7, time);

    // Louder but smooth envelope (peak at 0.35 instead of 0.18)
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.35, time + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(gain);
    gain.connect(filter);
    filter.connect(this.audioCtx.destination);

    osc.start(time);
    osc.stop(time + duration);
  }

  startSynthLoop() {
    if (!this.audioCtx) return;
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }

    // "Happy Birthday" melody note frequencies (Hz)
    const notes = [
      { f: 261.63, d: 0.35 }, // C4
      { f: 261.63, d: 0.35 }, // C4
      { f: 293.66, d: 0.7  }, // D4
      { f: 261.63, d: 0.7  }, // C4
      { f: 349.23, d: 0.7  }, // F4
      { f: 329.63, d: 1.2  }, // E4
      
      { f: 261.63, d: 0.35 }, // C4
      { f: 261.63, d: 0.35 }, // C4
      { f: 293.66, d: 0.7  }, // D4
      { f: 261.63, d: 0.7  }, // C4
      { f: 392.00, d: 0.7  }, // G4
      { f: 349.23, d: 1.2  }, // F4

      { f: 261.63, d: 0.35 }, // C4
      { f: 261.63, d: 0.35 }, // C4
      { f: 523.25, d: 0.7  }, // C5
      { f: 440.00, d: 0.7  }, // A4
      { f: 349.23, d: 0.7  }, // F4
      { f: 329.63, d: 0.7  }, // E4
      { f: 293.66, d: 1.2  }, // D4

      { f: 466.16, d: 0.35 }, // Bb4
      { f: 466.16, d: 0.35 }, // Bb4
      { f: 440.00, d: 0.7  }, // A4
      { f: 349.23, d: 0.7  }, // F4
      { f: 392.00, d: 0.7  }, // G4
      { f: 349.23, d: 1.6  }  // F4
    ];

    const playTune = () => {
      let t = this.audioCtx.currentTime + 0.1;
      notes.forEach(note => {
        this.playChimeNote(note.f, t, note.d * 1.5);
        t += note.d * 0.9;
      });
    };

    playTune();
    // Loop every 22 seconds
    this.synthInterval = setInterval(() => {
      if (this.isPlaying && this.isSynthesizing) {
        playTune();
      }
    }, 22000);
  }

  stopSynthLoop() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

const audioController = new AudioController();

/* ============================================================================
   5. AMBIENT STARFIELD & FLOATING DUST CANVAS (60fps)
   ============================================================================ */
class AmbientCanvas {
  constructor() {
    this.canvas = document.getElementById("ambient-canvas");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.count = window.innerWidth < 768 ? 40 : 80;
    this.animationId = null;
    this.resize();
    this.initParticles();
    this.bindEvents();
    this.render();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.7 + 0.2,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3 - 0.15,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        color: Math.random() > 0.4 ? "#ffffff" : CONFIG.themeColor
      });
    }
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      this.resize();
      this.initParticles();
    });
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.alpha += Math.sin(Date.now() * p.twinkleSpeed) * 0.015;

      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      const currentAlpha = Math.max(0.1, Math.min(0.9, p.alpha));

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = currentAlpha;
      this.ctx.fill();
    }

    this.ctx.globalAlpha = 1;
    this.animationId = requestAnimationFrame(() => this.render());
  }
}

/* ============================================================================
   6. CELEBRATION BALLOONS GENERATOR
   ============================================================================ */
function initFloatingBalloons() {
  const container = document.getElementById("balloons-container");
  if (!container) return;

  const colors = [
    CONFIG.themeColor,
    "#ffd166",
    "#06d6a0",
    "#118ab2",
    "#f72585",
    "#7209b7",
    "#ff9e00"
  ];

  const balloonCount = window.innerWidth < 768 ? 9 : 18;

  for (let i = 0; i < balloonCount; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    const color = colors[i % colors.length];
    balloon.style.backgroundColor = color;
    balloon.style.color = color;

    // Randomize initial positions & timings
    const leftPercent = Math.random() * 95;
    const duration = Math.random() * 7 + 9; // 9s to 16s
    const delay = Math.random() * 8;
    const scale = Math.random() * 0.45 + 0.75;

    balloon.style.left = `${leftPercent}%`;
    balloon.style.transform = `scale(${scale})`;

    const string = document.createElement("div");
    string.className = "balloon-string";
    balloon.appendChild(string);

    container.appendChild(balloon);

    if (window.gsap) {
      gsap.to(balloon, {
        y: -(window.innerHeight + 250),
        duration: duration,
        delay: delay,
        repeat: -1,
        ease: "none"
      });

      gsap.to(balloon, {
        x: "+=25",
        duration: duration / 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }
}

/* ============================================================================
   7. POPULATE DYNAMIC CONTENT FROM CONFIG
   ============================================================================ */
function populateContent() {
  // Gate
  const gateTitle = document.querySelector(".gate-title");
  if (gateTitle && CONFIG.name) {
    gateTitle.textContent = `For ${CONFIG.name}, Truly Wonderful`;
  }

  // Hero Badge Date
  const badgeText = document.getElementById("hero-badge-text");
  if (badgeText) {
    badgeText.textContent = "Nov 1, 2026 • Celebrating You ✨";
  }

  // Hero Name & Nickname
  const nameTarget = document.getElementById("hero-name-target");
  if (nameTarget) {
    nameTarget.innerHTML = "";
    // Letter by letter spans for staggered reveal
    CONFIG.name.split("").forEach(char => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.style.willChange = "transform, opacity";
      nameTarget.appendChild(span);
    });
  }

  const nickEl = document.getElementById("hero-nickname");
  const nickContainer = document.getElementById("nickname-container");
  if (CONFIG.nickname && nickEl) {
    nickEl.textContent = CONFIG.nickname;
  } else if (nickContainer) {
    nickContainer.style.display = "none";
  }

  // Dynamic Ordinal Suffix for Age (21st, 22nd, 23rd, 24th...)
  function getOrdinalSuffix(i) {
    const j = i % 10, k = i % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  }
  const agePlus = document.querySelector(".age-plus");
  if (agePlus && CONFIG.age) {
    agePlus.textContent = getOrdinalSuffix(CONFIG.age);
  }

  // Salutation & Signatures
  const salutation = document.getElementById("letter-salutation");
  if (salutation) {
    salutation.textContent = `Dearest ${CONFIG.name},`;
  }

  const fromName = document.getElementById("letter-from-name");
  if (fromName) {
    fromName.textContent = CONFIG.fromName;
  }

  const footerName = document.getElementById("footer-for-name");
  if (footerName) {
    footerName.textContent = CONFIG.name;
  }

  // Secret Note
  const secretNote = document.getElementById("secret-note-text");
  if (secretNote) {
    secretNote.textContent = CONFIG.secretFinalNote;
  }

  // WhatsApp Wish Back Button
  const waBtn = document.getElementById("whatsapp-wish-btn");
  if (waBtn) {
    const thankMsg = encodeURIComponent(
      `Hey ${CONFIG.fromName}! OMG thank you so much for this amazing birthday surprise website! Cockroachh loved it so much haha! You truly are the bestest friend ever! 🪳❤️✨`
    );
    waBtn.href = `https://wa.me/?text=${thankMsg}`;
  }

  // Setup Photo Attachment inside the Wish
  initWishPhotoAttachment();

  // Build Polaroid Memory Gallery
  buildGallery();

  // Build Reasons Deck
  buildReasons();
}

/**
 * Interactive Photo Attachment inside the Wish
 */
function initWishPhotoAttachment() {
  const fileInput = document.getElementById("wish-photo-input");
  const wishImg = document.getElementById("wish-attached-img");
  const noteImg = document.getElementById("note-attached-img");

  // Load saved photo if user previously uploaded one
  const savedPhoto = localStorage.getItem("harishma_wish_photo");
  if (savedPhoto) {
    if (wishImg) wishImg.src = savedPhoto;
    if (noteImg) noteImg.src = savedPhoto;
  }

  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target.result;
          if (wishImg) wishImg.src = dataUrl;
          if (noteImg) noteImg.src = dataUrl;
          try {
            localStorage.setItem("harishma_wish_photo", dataUrl);
          } catch (err) {
            console.warn("Could not save to localStorage (quota or disabled):", err);
          }
          // Confetti burst for attaching photo
          if (window.confetti) {
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.6 }
            });
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

/* ============================================================================
   8. POLAROID MEMORY GALLERY & LIGHTBOX
   ============================================================================ */
let activeLightboxIndex = 0;

function buildGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const rotations = [-3, 2.5, -2, 3, -1.5, 2];

  CONFIG.photos.forEach((photoSrc, idx) => {
    const caption = (CONFIG.photoCaptions && CONFIG.photoCaptions[idx]) || `Memory #${idx + 1}`;
    const rot = rotations[idx % rotations.length];

    const card = document.createElement("div");
    card.className = "polaroid-card";
    card.style.setProperty("--rot", `${rot}deg`);
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View photo: ${caption}`);

    card.innerHTML = `
      <div class="polaroid-img-wrapper">
        <img class="polaroid-img" src="${photoSrc}" alt="${caption}" loading="lazy" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'500\\' viewBox=\\'0 0 400 500\\'><rect width=\\'400\\' height=\\'500\\' fill=\\'%232b1343\\'/><text x=\\'50%\\' y=\\'50%\\' font-family=\\'sans-serif\\' font-size=\\'24\\' fill=\\'%23ff75a9\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\'>✨ Cherished Memory ✨</text></svg>';">
      </div>
      <div class="polaroid-caption">${caption}</div>
    `;

    card.addEventListener("click", () => openLightbox(idx));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(idx);
      }
    });

    grid.appendChild(card);
  });

  // Lightbox dots setup
  const dotsContainer = document.getElementById("lightbox-dots");
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    CONFIG.photos.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "lightbox-dot";
      dotsContainer.appendChild(dot);
    });
  }
}

function openLightbox(index) {
  const modal = document.getElementById("lightbox-modal");
  if (!modal) return;
  activeLightboxIndex = index;
  updateLightboxContent();
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const modal = document.getElementById("lightbox-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function updateLightboxContent() {
  const img = document.getElementById("lightbox-img");
  const cap = document.getElementById("lightbox-caption");
  const dots = document.querySelectorAll(".lightbox-dot");

  if (CONFIG.photos[activeLightboxIndex]) {
    img.src = CONFIG.photos[activeLightboxIndex];
    const captionText = (CONFIG.photoCaptions && CONFIG.photoCaptions[activeLightboxIndex]) || `Memory #${activeLightboxIndex + 1}`;
    cap.textContent = captionText;
    img.alt = captionText;
  }

  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === activeLightboxIndex);
  });
}

function nextLightboxPhoto() {
  activeLightboxIndex = (activeLightboxIndex + 1) % CONFIG.photos.length;
  updateLightboxContent();
}

function prevLightboxPhoto() {
  activeLightboxIndex = (activeLightboxIndex - 1 + CONFIG.photos.length) % CONFIG.photos.length;
  updateLightboxContent();
}

function initLightboxListeners() {
  const closeBtn = document.getElementById("lightbox-close");
  const backdrop = document.getElementById("lightbox-backdrop");
  const nextBtn = document.getElementById("lightbox-next");
  const prevBtn = document.getElementById("lightbox-prev");

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (backdrop) backdrop.addEventListener("click", closeLightbox);
  if (nextBtn) nextBtn.addEventListener("click", nextLightboxPhoto);
  if (prevBtn) prevBtn.addEventListener("click", prevLightboxPhoto);

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    const modal = document.getElementById("lightbox-modal");
    if (!modal || modal.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextLightboxPhoto();
    if (e.key === "ArrowLeft") prevLightboxPhoto();
  });

  // Mobile Touch Swipe detection
  const swipeArea = document.getElementById("lightbox-swipe-area");
  if (swipeArea) {
    let touchStartX = 0;
    let touchEndX = 0;

    swipeArea.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    swipeArea.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 45) {
        if (diff < 0) {
          nextLightboxPhoto();
        } else {
          prevLightboxPhoto();
        }
      }
    }
  }
}

/* ============================================================================
   9. REASONS WHY YOU ARE SPECIAL (3D Flip Deck)
   ============================================================================ */
function buildReasons() {
  const deck = document.getElementById("reasons-deck");
  const totalCountEl = document.getElementById("reasons-total-count");
  const titleEl = document.getElementById("reasons-title");

  if (!deck) return;
  deck.innerHTML = "";

  const reasonsList = CONFIG.reasons || [];
  if (totalCountEl) totalCountEl.textContent = reasonsList.length;
  if (titleEl) titleEl.textContent = `${reasonsList.length} Reasons Why You're Special`;

  const unlockedSet = new Set();
  const unlockedCountEl = document.getElementById("reasons-unlocked-count");

  const icons = ["✨", "💖", "🌟", "🌸", "💫", "💎", "🌷"];

  reasonsList.forEach((reason, index) => {
    const card = document.createElement("div");
    card.className = "reason-card";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Reason #${index + 1}: Click to uncover`);

    const icon = icons[index % icons.length];
    const numPadded = String(index + 1).padStart(2, "0");

    card.innerHTML = `
      <div class="reason-card-inner">
        <!-- Front Face -->
        <div class="card-face card-front">
          <div class="card-number-badge">${numPadded}</div>
          <div class="card-front-title">Reason to Celebrate</div>
          <div class="card-tap-label">
            <span>Tap to flip</span> <span>↺</span>
          </div>
        </div>

        <!-- Back Face -->
        <div class="card-face card-back">
          <div class="card-back-icon">${icon}</div>
          <p class="card-back-text">“${reason}”</p>
          <span class="card-back-tag">Pure Perfection ✨</span>
        </div>
      </div>
    `;

    const toggleFlip = () => {
      card.classList.toggle("flipped");
      if (card.classList.contains("flipped")) {
        unlockedSet.add(index);
        if (unlockedCountEl) unlockedCountEl.textContent = unlockedSet.size;

        // Micro confetti pop on first flip
        if (window.confetti && unlockedSet.size === reasonsList.length) {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 }
          });
        }
      }
    };

    card.addEventListener("click", toggleFlip);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleFlip();
      }
    });

    deck.appendChild(card);
  });
}

/* ============================================================================
   10. TYPEWRITER EFFECT (Heartfelt Message)
   ============================================================================ */
let typewriterDone = false;
let typewriterTimeout = null;

function runTypewriter(text, speed = 28) {
  const target = document.getElementById("typewriter-text");
  const cursor = document.getElementById("typewriter-cursor");
  if (!target) return;

  target.textContent = "";
  if (cursor) cursor.style.display = "inline-block";

  if (typewriterTimeout) clearTimeout(typewriterTimeout);

  let i = 0;
  function typeChar() {
    if (i < text.length) {
      target.textContent += text.charAt(i);
      i++;
      typewriterTimeout = setTimeout(typeChar, speed);
    } else {
      typewriterDone = true;
      if (cursor) {
        setTimeout(() => {
          cursor.style.display = "none";
        }, 3000);
      }
    }
  }

  typeChar();
}

function initTypewriterScroll() {
  const messageCard = document.getElementById("letter-card");
  if (!messageCard) return;

  if (window.gsap && window.ScrollTrigger) {
    ScrollTrigger.create({
      trigger: messageCard,
      start: "top 75%",
      once: true,
      onEnter: () => {
        if (!typewriterDone) {
          runTypewriter(CONFIG.mainMessage);
        }
      }
    });
  } else {
    runTypewriter(CONFIG.mainMessage);
  }

  const replayBtn = document.getElementById("replay-typewriter-btn");
  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      runTypewriter(CONFIG.mainMessage, 20);
    });
  }
}

/* ============================================================================
   11. CAKE SCENE: CANDLE BLOW & MICROPHONE DETECTION
   ============================================================================ */
class CakeController {
  constructor() {
    this.cakeWrapper = document.getElementById("cake-wrapper");
    this.blowBtn = document.getElementById("blow-btn");
    this.micBtn = document.getElementById("mic-blow-btn");
    this.micText = document.getElementById("mic-status-text");
    this.micHint = document.getElementById("mic-hint-text");
    this.wishBox = document.getElementById("wish-reveal-box");
    this.cakeActions = document.getElementById("cake-actions");
    this.isBlown = false;
    this.isListeningMic = false;
    this.audioStream = null;
    this.analyser = null;
    this.micAudioCtx = null;
    this.micCheckInterval = null;

    this.bindEvents();
  }

  bindEvents() {
    if (this.blowBtn) {
      this.blowBtn.addEventListener("click", () => this.blowCandles());
    }

    if (this.micBtn) {
      this.micBtn.addEventListener("click", () => this.toggleMic());
    }
  }

  blowCandles() {
    if (this.isBlown) return;
    this.isBlown = true;

    // Visual extinguish state
    if (this.cakeWrapper) {
      this.cakeWrapper.classList.add("extinguished");
    }

    // Stop mic listening if active
    this.stopMic();

    // Trigger confetti explosion
    if (window.confetti) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.55 },
        colors: [CONFIG.themeColor, "#ffd166", "#ffffff", "#ff85a1"]
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 350);
    }

    // Show Wish Card
    if (this.wishBox) {
      this.wishBox.classList.remove("hidden");
    }

    // Update blow button
    if (this.blowBtn) {
      this.blowBtn.disabled = true;
      this.blowBtn.innerHTML = '<span class="btn-icon">✨</span><span class="btn-text">Wish Made!</span>';
      this.blowBtn.style.opacity = "0.75";
    }

    if (this.micBtn) {
      this.micBtn.style.display = "none";
    }
    if (this.micHint) {
      this.micHint.textContent = "Your wish is ascending to the stars! ✨";
    }
  }

  async toggleMic() {
    if (this.isBlown) return;

    if (this.isListeningMic) {
      this.stopMic();
      return;
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Microphone detection is not supported in this browser. Please use the 'Blow The Candles' button!");
        return;
      }

      this.audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.micAudioCtx = new AudioCtx();
      const source = this.micAudioCtx.createMediaStreamSource(this.audioStream);

      this.analyser = this.micAudioCtx.createAnalyser();
      this.analyser.fftSize = 256;
      source.connect(this.analyser);

      this.isListeningMic = true;
      if (this.micBtn) this.micBtn.classList.add("listening");
      if (this.micText) this.micText.textContent = "Listening... Blow now! 💨";
      if (this.micHint) this.micHint.textContent = "Blow directly into your microphone!";

      const dataArray = new Uint8Array(this.analyser.frequencyBinCount);

      const checkBlow = () => {
        if (!this.isListeningMic || this.isBlown) return;

        this.analyser.getByteFrequencyData(dataArray);

        // Calculate average loudness & high-frequency breath noise
        let sum = 0;
        let highFreqSum = 0;
        const half = Math.floor(dataArray.length / 2);

        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
          if (i > half) highFreqSum += dataArray[i];
        }

        const avg = sum / dataArray.length;
        const highAvg = highFreqSum / half;

        // Blow threshold detection
        if (avg > 58 || highAvg > 42) {
          this.blowCandles();
          return;
        }

        requestAnimationFrame(checkBlow);
      };

      requestAnimationFrame(checkBlow);
    } catch (err) {
      console.warn("Microphone access denied or error:", err);
      if (this.micHint) {
        this.micHint.textContent = "Mic access blocked. Tap the 'Blow The Candles' button instead!";
      }
      this.stopMic();
    }
  }

  stopMic() {
    this.isListeningMic = false;
    if (this.micBtn) this.micBtn.classList.remove("listening");
    if (this.micText) this.micText.textContent = "Blow into Mic";

    if (this.audioStream) {
      this.audioStream.getTracks().forEach(track => track.stop());
      this.audioStream = null;
    }
    if (this.micAudioCtx) {
      this.micAudioCtx.close();
      this.micAudioCtx = null;
    }
  }
}

/* ============================================================================
   12. FINAL SURPRISE & 3D GIFT UNBOXING
   ============================================================================ */
function initGiftBox() {
  const giftBox = document.getElementById("gift-box");
  const noteCard = document.getElementById("secret-note-card");
  const tapCue = document.getElementById("gift-tap-cue");
  if (!giftBox) return;

  giftBox.classList.add("wobble");

  let opened = false;

  const openGift = () => {
    if (opened) return;
    opened = true;

    giftBox.classList.remove("wobble");
    giftBox.classList.add("opened");

    if (tapCue) {
      tapCue.style.display = "none";
    }

    // Explosive Celebration Confetti
    if (window.confetti) {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.65 },
        colors: [CONFIG.themeColor, "#ffd166", "#ffffff", "#ff4d6d"]
      });

      // Heart burst
      setTimeout(() => {
        confetti({
          particleCount: 40,
          spread: 120,
          origin: { y: 0.6 },
          shapes: ["star"],
          scalar: 1.2
        });
      }, 300);
    }

    // Reveal Secret Note
    if (noteCard) {
      setTimeout(() => {
        noteCard.classList.remove("hidden");
        noteCard.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 400);
    }
  };

  giftBox.addEventListener("click", openGift);
  giftBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openGift();
    }
  });
}

/* ============================================================================
   13. INTRO / GATE & 3-2-1 COUNTDOWN FLOW
   ============================================================================ */
function initGateAndCountdown() {
  const openBtn = document.getElementById("open-surprise-btn");
  const gateScreen = document.getElementById("gate-section");
  const countdownOverlay = document.getElementById("countdown-overlay");
  const countdownNum = document.getElementById("countdown-number");
  const mainFlow = document.getElementById("main-content");

  if (!openBtn) return;

  openBtn.addEventListener("click", () => {
    // 1. Play Background Audio (unlocks browser autoplay)
    audioController.play();

    // 2. Reveal Countdown
    if (countdownOverlay) {
      countdownOverlay.classList.remove("hidden");
    }

    // 3. Play 3-2-1 Animation via GSAP
    let count = 3;
    if (countdownNum) countdownNum.textContent = count;

    const runCount = () => {
      if (!window.gsap) {
        // Fallback without GSAP
        const interval = setInterval(() => {
          count--;
          if (count > 0) {
            if (countdownNum) countdownNum.textContent = count;
          } else {
            clearInterval(interval);
            finishGate();
          }
        }, 900);
        return;
      }

      gsap.fromTo(
        countdownNum,
        { scale: 0.3, opacity: 0, rotate: -15 },
        {
          scale: 1.1,
          opacity: 1,
          rotate: 0,
          duration: 0.45,
          ease: "back.out(1.8)",
          onComplete: () => {
            gsap.to(countdownNum, {
              scale: 1.35,
              opacity: 0,
              duration: 0.25,
              delay: 0.1,
              onComplete: () => {
                count--;
                if (count > 0) {
                  countdownNum.textContent = count;
                  runCount();
                } else {
                  finishGate();
                }
              }
            });
          }
        }
      );
    };

    runCount();

    function finishGate() {
      // Hide countdown overlay immediately to prevent ghosting
      if (countdownOverlay) {
        countdownOverlay.style.display = "none";
      }

      // Big gate-exit confetti
      if (window.confetti) {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 }
        });
      }

      // Fade out gate and reveal main flow
      if (gateScreen) gateScreen.classList.add("fade-out");
      if (mainFlow) mainFlow.classList.remove("hidden");

      setTimeout(() => {
        if (gateScreen) gateScreen.style.display = "none";
        // Trigger Hero entry animations
        playHeroAnimations();
      }, 400);
    }
  });
}

/* ============================================================================
   14. HERO SECTION ANIMATIONS (Letter Reveal & Age Counter)
   ============================================================================ */
function playHeroAnimations() {
  if (!window.gsap) return;

  // Staggered letter-by-letter reveal for Name
  const chars = document.querySelectorAll(".hero-line-name .char");
  if (chars.length > 0) {
    gsap.fromTo(
      chars,
      { y: 60, opacity: 0, rotate: -10, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: "back.out(1.8)"
      }
    );
  }

  // Smooth Age Counter animation: 0 -> CONFIG.age
  const ageCounter = document.getElementById("age-counter");
  const agePlus = document.querySelector(".age-plus");
  if (ageCounter && CONFIG.age) {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: CONFIG.age,
      duration: 2.2,
      ease: "power2.out",
      onUpdate: () => {
        const cur = Math.round(obj.val);
        ageCounter.textContent = cur;
        if (agePlus) agePlus.textContent = getOrdinalSuffix(cur);
      }
    });
  }

  // Continuous gentle confetti flakes in Hero
  let heroConfettiTimer = setTimeout(() => {
    if (window.confetti) {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.25 },
        colors: [CONFIG.themeColor, "#ffd166", "#ffffff"]
      });
    }
  }, 1000);
}

/* ============================================================================
   15. SCROLL PROGRESS INDICATOR & REPLAY FUNCTION
   ============================================================================ */
function initScrollProgress() {
  const progressBar = document.getElementById("scroll-progress");
  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });
}

function initReplayAll() {
  const replayBtn = document.getElementById("replay-all-btn");
  if (!replayBtn) return;

  replayBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Rerun hero animations
    setTimeout(() => {
      playHeroAnimations();
    }, 800);
  });
}

/* ============================================================================
   16. DOM READY INITIALIZATION
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins if present
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Ambient Background Particles
  new AmbientCanvas();

  // 2. Populate personal data & dynamic cards
  populateContent();

  // 3. Floating Balloons in Hero
  initFloatingBalloons();

  // 4. Cake Scene controller
  new CakeController();

  // 5. Lightbox event listeners
  initLightboxListeners();

  // 6. Typewriter scroll trigger
  initTypewriterScroll();

  // 7. Gift Box unboxing
  initGiftBox();

  // 8. Gate and countdown flow
  initGateAndCountdown();

  // 9. Scroll Progress & Replay All
  initScrollProgress();
  initReplayAll();
});
