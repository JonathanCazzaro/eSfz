const triggerPlay = (source: HTMLAudioElement) => {
  source.currentTime = 0;
  source.play();
};

class AudioPlayer {
  context: AudioContext;

  constructor() {
    this.context = new AudioContext({ sampleRate: 44100, latencyHint: 'interactive' });
  }

  makeSource(path: string) {
    const sample = new Audio(`media://${path}`);
    const source = this.context.createMediaElementSource(sample);
    source.connect(this.context.destination);
    return sample;
  }

  play(source: HTMLAudioElement | HTMLAudioElement[]) {
    if (Array.isArray(source)) {
      const randomSource = source.at(Math.round(Math.random() * source.length - 1));
      if (randomSource) triggerPlay(randomSource);
    } else triggerPlay(source);
  }
}

export const audioPlayer = new AudioPlayer();
