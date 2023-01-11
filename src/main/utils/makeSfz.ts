import { Instrument } from '../../preload/types';

const makeSfz = (instrument: Omit<Instrument, 'currentMapping' | 'saved'>): string[] => {
  return instrument.mappings.map(
    ({ device, pads }) => `// -----------------------------------\n// Title : ${instrument.name}\n// Author : ${
      instrument.author || 'Anonymous'
    }\n// Device : ${device}\n// -----------------------------------\n\n<control> default_path=samples/\n\n<global> loop_mode=one_shot\n\n${pads
      .filter(({ samples }) => samples.length)
      .map(({ id, samples }) => {
        if (samples.length === 1) {
          return `<region> key=${id} sample=${samples[0]}.wav`;
        } else {
          const roundStep = 1 / samples.length;
          return [
            `<group> key=${id}`,
            ...samples.map(
              (sample, index) =>
                `<region> sample=${sample}.wav lorand=${!index ? 0 : (index * roundStep).toFixed(3)} hirand=${
                  index === samples.length - 1 ? 1 : (index * roundStep + roundStep).toFixed(3)
                }`,
            ),
          ].join('\n');
        }
      })
      .join('\n\n')}
    `,
  );
};

export default makeSfz;
