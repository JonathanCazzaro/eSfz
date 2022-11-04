import { AppData } from '@renderer/store';
import { AppDataState, Instrument } from '@renderer/types/types';
import React, { useContext, useState } from 'react';
import Modal from '../Modal/Modal';
import { AiFillFolderOpen as FolderIcon } from 'react-icons/ai';
import { generateId } from '@renderer/utils/utils';

interface NewInstrumentProps {
  isOpen: boolean;
  handleClose: () => void;
}

const NewInstrument: React.FC<NewInstrumentProps> = ({ handleClose, isOpen }) => {
  const {
    saveDir: [saveDir],
    instruments: [instruments, setInstruments],
    currentTab: [, setCurrentTab],
  } = useContext(AppData) as AppDataState;
  const [path, setPath] = useState(saveDir);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');

  const handleSetSaveDir = async () => {
    const chosenPath = await window.api.pickFolder(saveDir);
    if (chosenPath) setPath(chosenPath);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const record: Instrument = {
      id: generateId(6),
      name,
      author,
      path,
      samples: [],
    };
    window.api.writeNewInstrument(record).then((result) => {
      if (result) {
        setInstruments([...instruments, { ...record, saved: true }]);
        setCurrentTab({ ...record, saved: true });
        handleClose();
      }
    });
  };

  return (
    <Modal trigger={isOpen} handleClose={handleClose}>
      <form name='new-instrument' onSubmit={handleSubmit} className='w-[25rem] p-6'>
        <h1 className='text-center text-2xl font-bold leading-4'>Nouvel instrument</h1>
        <div className='mt-8 flex flex-col gap-3'>
          <div className='flex gap-4 whitespace-nowrap'>
            <label htmlFor='instrument-name'>Nom :</label>
            <input
              type='text'
              className='w-full rounded-md px-2 shadow-m focus:outline-amber-700'
              name='instrument-name'
              id='instrument-name'
              value={name}
              onInput={({ currentTarget }) => setName(currentTarget.value)}
              required
              autoFocus
              placeholder='Orgue Hammond'
            />
          </div>
          <div className='flex gap-4 whitespace-nowrap'>
            <label htmlFor='instrument-author'>Auteur :</label>
            <input
              type='text'
              className='w-full rounded-md px-2 shadow-m focus:outline-amber-700'
              name='instrument-author'
              id='instrument-author'
              value={author}
              onInput={({ currentTarget }) => setAuthor(currentTarget.value)}
              placeholder='Joe Buck'
            />
          </div>
          <div className='flex items-center gap-3 whitespace-nowrap'>
            <p>Répertoire de travail :</p>
            <div className='flex w-full items-center gap-2 rounded-lg bg-slate-100 px-2 shadow-m'>
              <input
                type='text'
                value={path}
                readOnly
                className='w-full bg-transparent py-1 text-sm outline-none'
                required
              />
              <button
                type='button'
                className='border-l border-slate-300 pl-2'
                onClick={handleSetSaveDir}
              >
                <FolderIcon />
              </button>
            </div>
          </div>
          <div className='mt-4 flex justify-end gap-3'>
            <button className='cancel-button' type='button' onClick={handleClose}>
              Annuler
            </button>
            <button className='primary-button' type='submit'>
              Valider
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default NewInstrument;
