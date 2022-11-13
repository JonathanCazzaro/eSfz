class AudioPlayer {
  context: AudioContext;

  constructor() {
    this.context = new AudioContext({ sampleRate: 44100, latencyHint: 'interactive' });
  }

  play(src: string) {
    const sample = new Audio(`media://${src}`);
    const source = this.context.createMediaElementSource(sample);
    source.connect(this.context.destination);
    sample.play();
  }
}

export const audioPlayer = new AudioPlayer();
