import confetti from 'canvas-confetti';

export function fireCelebrationConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      colors: ['#ff85a2', '#ffccd5', '#d8b4fe', '#fef08a', '#86efac', '#ffffff']
    });
  }

  // Multi-stage confetti burst
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export function fireSideCannons() {
  const end = Date.now() + 2 * 1000;
  const colors = ['#f43f5e', '#ec4899', '#a855f7', '#fbbf24', '#34d399'];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: colors,
      zIndex: 9999
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: colors,
      zIndex: 9999
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}

export function fireMicroPop(x = 0.5, y = 0.5) {
  confetti({
    particleCount: 22,
    spread: 45,
    startVelocity: 28,
    origin: { x, y },
    colors: ['#ff85a2', '#c084fc', '#fde047'],
    zIndex: 9999
  });
}
