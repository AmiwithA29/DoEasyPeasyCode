export class SpeechController {
  private synth: SpeechSynthesis | null = null;
  private utterance: SpeechSynthesisUtterance | null = null;
  private onStepChange: ((index: number) => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  isAvailable(): boolean {
    return this.synth !== null;
  }

  speak(text: string, index: number, onEnd?: () => void) {
    if (!this.synth) return;
    this.stop();
    this.onStepChange = null;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    this.utterance = utterance;
    this.synth.speak(utterance);
  }

  pause() {
    if (this.synth) this.synth.pause();
  }

  resume() {
    if (this.synth) this.synth.resume();
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.utterance = null;
    }
  }

  get speaking(): boolean {
    return this.synth ? this.synth.speaking : false;
  }

  get paused(): boolean {
    return this.synth ? this.synth.paused : false;
  }
}
