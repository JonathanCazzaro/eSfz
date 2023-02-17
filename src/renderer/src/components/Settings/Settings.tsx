import React, { useContext } from 'react';
import Modal from '../Modal/Modal';
import { HiOutlineCog8Tooth as SettingsIcon, HiOutlineXMark as CloseIcon } from 'react-icons/hi2';
import { AiFillFolderOpen as FolderIcon } from 'react-icons/ai';
import MidiDeviceSelector from './MidiDeviceSelector';
import AudioDeviceSelector from './AudioDeviceSelector';
import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';
import { TranslationData } from '../Translation/Translation';

interface SettingsProps {
  isOpen: boolean;
  handleClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, handleClose }) => {
  const {
    saveDir: [saveDir, setSaveDir],
  } = useContext(AppData) as AppDataState;
  const { buttons, inputs, sections, headers } = useContext(TranslationData);

  const handleSetSaveDir = async () => {
    const { data } = await window.api.pickFolder({ defaultPath: saveDir, dialogTitle: headers.selectFolder[0], buttonLabel: buttons.select[0] });
    if (data) {
      localStorage.setItem('save_dir', data);
      setSaveDir(data);
    }
  };

  return (
    <Modal handleClose={handleClose} trigger={isOpen} className='modal-base w-[38rem]'>
      <button className='modal-close-button' onClick={handleClose}>
        <CloseIcon />
      </button>
      <header className='border-b border-slate-800 p-4 text-2xl font-bold uppercase'>
        <h1 className='flex items-center gap-4'>
          <SettingsIcon size={38} />
          {headers.settings[0]}
        </h1>
      </header>
      <div className='p-4'>
        <h2 className='w-full rounded-md bg-slate-800 py-1 pl-9 font-semibold text-slate-400'>{sections.settings_general[0]}</h2>
        <div className='my-4 px-2'>
          <div></div>
          <div className='flex items-center gap-3 whitespace-nowrap'>
            <p>{inputs.defaultDirectory_label} :</p>
            <div className='flex w-full items-center gap-2 rounded-lg bg-slate-100 px-2'>
              <input type='text' value={saveDir} readOnly className='w-full bg-transparent py-1 text-sm outline-none' />
              <button className='border-l border-slate-300 pl-2' onClick={handleSetSaveDir}>
                <FolderIcon />
              </button>
            </div>
          </div>
        </div>
        <h2 className='mb-2 w-full rounded-md bg-slate-800 py-1 pl-9 font-semibold text-slate-400'>{sections.settings_midiInput[0]}</h2>
        <div className='my-2 px-2'>
          <MidiDeviceSelector />
        </div>
        <h2 className='mb-2 w-full rounded-md bg-slate-800 py-1 pl-9 font-semibold text-slate-400'>{sections.settings_audioOut[0]}</h2>
        <div className='my-2 px-2'>
          <AudioDeviceSelector />
        </div>
        <button className='primary-button ml-auto mr-0 mt-4' onClick={handleClose}>
          {buttons.closeWindow[0]}
        </button>
      </div>
    </Modal>
  );
};

export default Settings;
