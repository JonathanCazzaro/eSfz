import { AppData } from '@renderer/store';
import { AppDataState, Instrument, MidiDeviceName, Pad } from '@renderer/types/types';
import React, { useContext } from 'react';
import SampleSource from '../General/SampleSource/SampleSource';

interface NoteSetupProps {
  noteId?: number;
  instrument: Instrument;
}

const NoteSetup: React.FC<NoteSetupProps> = ({ noteId, instrument }) => {
  const {
    pads: [pads],
    attachSample,
    detachSample,
    midiDeviceModel: [midiDeviceModel],
  } = useContext(AppData) as AppDataState;
  const pad = pads.find(({ id }) => id === noteId) as Pad;

  return (
    <div className='flex h-full w-full flex-col overflow-hidden rounded border border-slate-600 shadow-lg'>
      <div className='flex items-center justify-between bg-gradient-to-t from-slate-800 to-slate-700 py-0.5 px-6 text-lg text-slate-300'>
        Edition du
        {` ${pad?.id <= 2 ? 'pavé tactile' : 'pad'} ${pad?.label}`}
      </div>
      <div className='relative h-full bg-white bg-opacity-10 p-4'>
        <SampleSource
          label='Samples associés'
          samples={pad?.affectedSamples || []}
          className='w-2/5'
          instrument={instrument}
          enableImport={false}
          noDataMessage="Aucun sample n'est encore rattaché à ce pad."
          handleDrop={(value) =>
            attachSample({
              deviceName: midiDeviceModel.name as MidiDeviceName,
              instrument,
              pad,
              sampleId: Number(value),
            })
          }
          handleDelete={(sampleId) => {
            if (midiDeviceModel.name) {
              detachSample({
                deviceName: midiDeviceModel.name,
                instrument,
                pad,
                sampleId,
              });
            }
          }}
        />
      </div>
      <div></div>
    </div>
  );
};

export default NoteSetup;
