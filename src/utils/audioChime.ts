/**
 * Native Web Audio API sound generator for restorative rehabilitation cues.
 * Generates gentle Tibetan singing bowl and soft meditative bell frequencies (432Hz / 528Hz)
 * without relying on external network assets.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playSereneChime(type: 'inhale' | 'exhale' | 'hold' | 'finish' | 'click' = 'inhale') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Soft gentle lowpass filter to produce an organic acoustic tone
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);

    osc.type = 'sine';

    let freq = 432; // Calming frequency
    let duration = 1.6;
    let maxGain = 0.08;

    switch (type) {
      case 'inhale':
        freq = 384; // Gentle rising feeling (G4)
        duration = 1.8;
        maxGain = 0.07;
        break;
      case 'hold':
        freq = 432; // Root calm (A4 natural)
        duration = 1.2;
        maxGain = 0.06;
        break;
      case 'exhale':
        freq = 324; // Soft grounding low tone (E4)
        duration = 2.4;
        maxGain = 0.06;
        break;
      case 'finish':
        freq = 528; // Harmonic restorative tone
        duration = 2.8;
        maxGain = 0.1;
        break;
      case 'click':
        freq = 600;
        duration = 0.15;
        maxGain = 0.04;
        break;
    }

    osc.frequency.setValueAtTime(freq, now);
    // Subtle natural pitch drop over the chime decay
    osc.frequency.exponentialRampToValueAtTime(Math.max(80, freq * 0.98), now + duration);

    // Smooth envelope attack and exponential decay
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(maxGain, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  } catch {
    // Graceful silent fallback if Web Audio is restricted by browser policy
  }
}
