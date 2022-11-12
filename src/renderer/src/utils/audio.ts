class AudioPlayer {
  context: AudioContext;

  constructor() {
    this.context = new AudioContext({ sampleRate: 44100, latencyHint: 'interactive' });
  }

  async play(src: string) {
    const sample = new Audio(`media://${src}`);
    sample.preload = 'auto';
    const source = this.context.createMediaElementSource(sample);
    source.connect(this.context.destination);
    await sample.play();
  }
}

export const audioPlayer = new AudioPlayer();
