# 🎂 Birthday Wish - Cinematic Greeting Card Website

A production-quality, cinematic, single-page birthday wish website that feels like an emotional, high-end interactive greeting card. Built with pure HTML5, modern CSS3, and vanilla JavaScript (featuring GSAP, ScrollTrigger, and canvas-confetti).

Zero build steps. Zero backend dependencies. Opens directly in any browser.

---

## ✨ Features & Storyboard Flow

1. **Intro / Gate**:
   - Atmospheric dark plum/navy gradient with a pulsing gift emblem.
   - "Tap to open your surprise" button fulfills browser autoplay policies.
   - Triggers an energetic 3-2-1 glowing countdown with confetti blast into the main scene.

2. **Hero Celebration**:
   - Letter-by-letter animated typography reveal for the birthday person's name.
   - Smooth animated age counter counting up from 0 to target age.
   - Floating colorful celebration balloons with gentle swaying strings.
   - Ambient starfield canvas and falling confetti sparkles.

3. **Interactive Cake & Candle Scene**:
   - Layered illustrated cake with strawberry and cream toppings.
   - Realistic flickering flame animations with halo breathing effect.
   - **Two ways to blow the candles**:
     - Tap **"Blow The Candles"** button.
     - Tap **"Blow into Mic"** for real-time microphone breath / volume detection!
   - Blowing out the candles extinguishes the flames, releases a smoke puff, bursts celebratory confetti, and reveals a "Make a wish... ✨" message.

4. **Heartfelt Message (Typewriter Letter)**:
   - Frosted glass-morphism card with corner ornaments and a 3D wax seal.
   - Types out the message smoothly when scrolled into view.
   - Re-read button to replay the typewriter effect anytime.

5. **Polaroid Memory Gallery**:
   - Scattered Polaroid photos with subtle tilt angles, realistic paper tape, and handwritten captions.
   - Hover and tap 3D lift animations.
   - Responsive Lightbox modal with:
     - Next / Previous buttons
     - Keyboard navigation (Left, Right, Escape)
     - Touch swipe detection for mobile phones.

6. **Reasons Why You're Special**:
   - 3D interactive flip cards with glass-morphic front and vibrant back.
   - Real-time counter tracking how many reasons have been uncovered.

7. **Final Surprise (Gift Box & WhatsApp)**:
   - Interactive 3D gift box with ribbon and bow that wobbles invitingly.
   - Tapping lifts the lid, bursts fireworks, and unfolds the secret note.
   - **"Send a Wish Back"** button automatically opens WhatsApp with a personalized thank-you message addressed to you.
   - **"Replay Celebration"** button for a seamless restart.

8. **Audio Engine with Smart Fallback**:
   - Floating music player with animated equalizer bars.
   - Plays `assets/birthday.mp3`.
   - **Fail-safe fallback**: If the audio file is missing or blocked, the site automatically synthesizes a delicate music-box acoustic chime tune using the Web Audio API!

---

## 🛠️ How to Customize

All personal details are neatly organized in **ONE config object** at the very top of [`script.js`](script.js):

```javascript
const CONFIG = {
  name: "Priya",
  nickname: "Chellam",
  fromName: "Harish",
  age: 21,
  birthdayDate: "2026-11-05",
  themeColor: "#ff4d8d", // Any hex color! The entire site's palette adapts dynamically.
  musicFile: "assets/birthday.mp3",
  photos: [
    "assets/p1.jpg",
    "assets/p2.jpg",
    "assets/p3.jpg",
    "assets/p4.jpg",
    "assets/p5.jpg",
    "assets/p6.jpg"
  ],
  photoCaptions: [
    "Your Radiant Smile",
    "Pure Magic Everywhere",
    "Golden Memories",
    "Endless Adventures",
    "Heart Of Gold",
    "Forever Cherished"
  ],
  mainMessage: "Write your heartfelt message here...",
  reasons: [
    "Your smile",
    "Your kindness",
    "Our memories",
    "Your support",
    "Your laugh"
  ],
  secretFinalNote: "A short surprise line revealed at the very end."
};
```

### 🔗 Dynamic Personalization via URL

You can also share the website with different friends and family without changing the code! Pass query parameters in the URL:

```
index.html?name=Sneha&from=Harish&age=22&theme=ff3366&nickname=Angel
```

Supported parameters:
- `name`: Recipient's name
- `from` or `fromName`: Your name
- `nickname`: Pet name or nickname
- `age`: Number
- `theme`: Hex color code (e.g., `ff4d8d` or `%23ff4d8d`)
- `msg` or `message`: Custom main message
- `note`: Custom secret final note

---

## 📷 Changing Photos & Music

1. Open the `assets/` folder.
2. Replace `p1.jpg` through `p6.jpg` with your own photos (portrait or square photos work best).
3. Drop your music file named `birthday.mp3` into `assets/`.
4. If you don't add music, the built-in acoustic music-box synthesizer plays automatically.

---

## 🚀 How to Host for Free

### Option 1: Netlify Drop (Fastest - 1 Minute)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop) (free, no sign-up required for instant preview).
2. Drag and drop the entire website folder onto the page.
3. Your live link (e.g., `https://magical-birthday.netlify.app`) is generated immediately!
4. Send the link to the birthday person!

### Option 2: GitHub Pages (Free forever)
1. Create a free repository on [GitHub](https://github.com) (e.g. `birthday-wish`).
2. Upload `index.html`, `style.css`, `script.js`, and the `assets/` folder.
3. In the repository, go to **Settings** > **Pages**.
4. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
5. Click **Save**. Within 60 seconds, your site is live at:
   `https://<your-username>.github.io/<repo-name>/`

### Option 3: Vercel
1. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
2. Import your GitHub repository or drag the folder using Vercel CLI (`npx vercel`).
3. Deploy with zero configuration.

---

## 📱 Browser Compatibility & Quality
- Mobile-first design: tested and responsive from 360px smartphones to 4K desktop screens.
- Hardware-accelerated 60fps animations utilizing `transform` and `opacity`.
- Full `prefers-reduced-motion` accessibility support.
- Fully offline functional (CDN assets cached).
