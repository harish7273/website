/**
 * Production Web Audio API Sound Synthesizer
 * Zero external audio files required, runs 100% in browser
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.ambientPlaying = false;
    this.ambientInterval = null;
    this.volume = 0.7;
  }

  getContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Play a soft click/pop
  playPop(pitchMultiplier = 1) {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(440 * pitchMultiplier, t);
      osc.frequency.exponentialRampToValueAtTime(120, t + 0.08);

      gain.gain.setValueAtTime(0.25 * this.volume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.08);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Play sweet sparkle chimes
  playChime() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C E G C E
      notes.forEach((freq, i) => {
        const t = ctx.currentTime + i * 0.06;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.18 * this.volume, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.5);
      });
    } catch {
      // Audio fallback
    }
  }

  // Cute Kawaii Cow "Moo" Synth
  playMoo() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const t = ctx.currentTime;
      const duration = 0.85;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Cow formant sweep: Start low, pitch up, glide down
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(130, t);
      osc1.frequency.linearRampToValueAtTime(175, t + 0.25);
      osc1.frequency.exponentialRampToValueAtTime(115, t + duration);

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(132, t);
      osc2.frequency.linearRampToValueAtTime(178, t + 0.25);
      osc2.frequency.exponentialRampToValueAtTime(118, t + duration);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(380, t);
      filter.frequency.linearRampToValueAtTime(720, t + 0.22);
      filter.frequency.exponentialRampToValueAtTime(320, t + duration);
      filter.Q.value = 4.2;

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.35 * this.volume, t + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + duration);
      osc2.stop(t + duration);
    } catch {
      // Silent catch
    }
  }

  // Fanfare for unboxing surprise
  playFanfare() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const chord = [392.00, 523.25, 659.25, 783.99, 1046.50];
      chord.forEach((freq, idx) => {
        const t = ctx.currentTime + idx * 0.07;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = idx % 2 === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.25 * this.volume, t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.9);
      });
    } catch {
      // Audio fallback
    }
  }

  // Toggle warm Lo-Fi ambient chords
  toggleAmbient(onStateChange) {
    if (this.ambientPlaying) {
      this.stopAmbient();
      if (onStateChange) onStateChange(false);
    } else {
      this.startAmbient();
      if (onStateChange) onStateChange(true);
    }
  }

  startAmbient() {
    if (this.ambientPlaying) return;
    this.ambientPlaying = true;
    const ctx = this.getContext();
    if (!ctx) return;

    // Peaceful, heartwarming lofi chords: Fmaj7 -> G -> Em7 -> Am
    const chordProgression = [
      [349.23, 440.00, 523.25, 659.25], // Fmaj7
      [392.00, 493.88, 587.33],         // G
      [329.63, 392.00, 493.88, 587.33], // Em7
      [261.63, 329.63, 440.00, 523.25]  // Am
    ];

    let step = 0;
    const playNext = () => {
      if (!this.ambientPlaying) return;
      const t = ctx.currentTime;
      const chord = chordProgression[step % chordProgression.length];
      step++;

      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t + i * 0.05);

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.09 * this.volume, t + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 2.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 2.8);
      });
    };

    playNext();
    this.ambientInterval = setInterval(playNext, 3200);
  }

  stopAmbient() {
    this.ambientPlaying = false;
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }
}

export const sounds = new SoundEngine();
