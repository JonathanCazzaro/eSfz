import { AppData } from '@renderer/store';
import { AppDataState, Instrument, Sample } from '@renderer/types/types';
import { audioPlayer } from '@renderer/utils/audio';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  AiTwotoneEdit as EditIcon,
  AiFillPlayCircle as PlayIcon,
  AiFillDelete as DeleteIcon,
  AiOutlineCheck as ValidateIcon,
  AiOutlineUndo as CancelIcon,
} from 'react-icons/ai';

type SampleItemProps = Sample & {
  instrument: Instrument;
  allowModification: boolean;
  removeOverride?: (id: number) => void;
  draggable: boolean;
};

const SampleItem: React.FC<SampleItemProps> = ({
  id,
  name,
  filename,
  instrument,
  allowModification,
  removeOverride,
  draggable,
}) => {
  const { updateInstrument } = useContext(AppData) as AppDataState;
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleUpdateSampleName(tempValue, id);
    setEditing(false);
  };

  const handleUpdateSampleName = (name: string, sampleId: number) => {
    updateInstrument({
      ...instrument,
      samples: instrument.samples.map((item) => ({
        ...item,
        name: item.id === sampleId ? name : item.name,
      })),
      saved: false,
    });
  };

  const handleDeleteSample = async (sampleId: number) => {
    updateInstrument({
      ...instrument,
      samples: instrument.samples.filter(({ id }) => id !== sampleId),
      saved: false,
    });
  };

  useEffect(() => {
    setTempValue(name);
  }, [name]);

  return (
    <li
      className={`rounded-md px-4  py-0.5 text-slate-300 odd:bg-slate-800 odd:bg-opacity-50  ${
        draggable ? 'cursor-move border border-solid border-transparent hover:border-slate-300' : ''
      }`}
      draggable={draggable}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', id.toString());
      }}
    >
      <form className='flex items-center gap-2' onSubmit={handleSubmit}>
        <button
          className='hover:text-green-500'
          type='button'
          onClick={() => audioPlayer.play(`${instrument.path}/samples/${filename}`)}
        >
          <PlayIcon />
        </button>
        <input
          type='text'
          ref={inputRef}
          readOnly={!editing}
          onInput={({ currentTarget }) => setTempValue(currentTarget.value)}
          required
          value={tempValue}
          className={`w-full px-2 outline-none ${
            editing ? 'rounded-lg bg-slate-100 bg-opacity-10' : 'bg-transparent'
          } ${draggable && !editing ? 'pointer-events-none cursor-move' : ''}`}
        />
        <div className='mr-0 ml-auto flex items-center gap-2'>
          {editing ? (
            <>
              <button type='submit' className='text-green-500 hover:brightness-150'>
                <ValidateIcon />
              </button>
              <button
                type='button'
                className='block text-red-600 hover:brightness-150'
                onClick={() => {
                  setTempValue(name);
                  setEditing(false);
                }}
              >
                <CancelIcon />
              </button>
            </>
          ) : (
            <>
              {allowModification && (
                <button
                  className='hover:brightness-150'
                  type='button'
                  onClick={(e) => {
                    e.preventDefault();
                    setEditing(!editing);
                    inputRef.current?.focus();
                  }}
                >
                  <EditIcon />
                </button>
              )}
              <button
                className='hover:text-red-500'
                type='button'
                onClick={() => (removeOverride ? removeOverride(id) : handleDeleteSample(id))}
              >
                <DeleteIcon />
              </button>
            </>
          )}
        </div>
      </form>
    </li>
  );
};

export default SampleItem;
