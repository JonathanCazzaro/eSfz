import React, { useContext, useRef, useState } from 'react';
import Modal from '../Modal/Modal';
import Navbutton from '../Navbar/Navbutton';
import { HiOutlineCog8Tooth as SettingsIcon, HiOutlineXMark as CloseIcon } from 'react-icons/hi2';
import { AiFillFolderOpen as FolderIcon } from 'react-icons/ai';
import MidiDeviceSelector from './MidiDeviceSelector';
import AudioDeviceSelector from './AudioDeviceSelector';
import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';

const Settings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    welcomeScreen: [welcomeScreen, setWelcomeScreen],
    saveDir: [saveDir, setSaveDir],
  } = useContext(AppData) as AppDataState;
  const actionerRef = useRef<HTMLLIElement>(null);

  const handleSetWelcomeScreen: React.ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { checked },
  }) => {
    localStorage.setItem('welcome_screen', checked ? 'on' : '');
    setWelcomeScreen(checked);
  };

  const handleSetSaveDir = async () => {
    const path = await window.fs.pickFolder(saveDir);
    if (path) {
      localStorage.setItem('save_dir', path);
      setSaveDir(path);
    }
  };

  return (
    <>
      <Navbutton
        Icon={{ Component: SettingsIcon, className: 'scale-110' }}
        label='Paramètres'
        onClick={() => setIsOpen(true)}
        nodeRef={actionerRef}
      />
      <Modal
        handleClose={() => setIsOpen(false)}
        trigger={isOpen}
        closeWhitelist={[actionerRef]}
        className='modal-base w-[38rem]'
      >
        <button className='modal-close-button' onClick={() => setIsOpen(false)}>
          <CloseIcon />
        </button>
        <header className='border-b border-slate-800 p-4 text-2xl font-bold uppercase'>
          <h1 className='flex items-center gap-4'>
            <SettingsIcon size={38} />
            Paramètres
          </h1>
        </header>
        <div className='p-4'>
          <h2 className='w-full rounded-md bg-slate-800 py-1 pl-9 font-semibold text-slate-400'>
            Général
          </h2>
          <div className='mt-2 mb-2 border-b border-slate-500 px-2 pb-2'>
            <div className='flex items-center gap-3'>
              <input
                type='checkbox'
                name='welcome-screen'
                id='welcome-screen'
                checked={welcomeScreen}
                onChange={handleSetWelcomeScreen}
              />
              <label htmlFor='welcome-screen'>Ouvrir l'écran d'accueil au démarrage</label>
            </div>
          </div>
          <div className='mb-4 px-2'>
            <div className='flex items-center gap-3 whitespace-nowrap'>
              <p>Répertoire d'enregistrement par défaut :</p>
              <div className='flex w-full items-center gap-2 rounded-lg bg-slate-100 px-2'>
                <input
                  type='text'
                  value={saveDir}
                  readOnly
                  className='w-full bg-transparent py-1 text-sm outline-none'
                />
                <button className='border-l border-slate-300 pl-2' onClick={handleSetSaveDir}>
                  <FolderIcon />
                </button>
              </div>
            </div>
          </div>
          <h2 className='mb-2 w-full rounded-md bg-slate-800 py-1 pl-9 font-semibold text-slate-400'>
            Entrée midi
          </h2>
          <div className='mt-2 mb-4 px-2'>
            <MidiDeviceSelector />
          </div>
          <h2 className='mb-2 w-full rounded-md bg-slate-800 py-1 pl-9 font-semibold text-slate-400'>
            Sortie audio principale
          </h2>
          <div className='mt-2 mb-4 px-2'>
            <AudioDeviceSelector />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Settings;
