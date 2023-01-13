import Modal from '@renderer/components/Modal/Modal';
import { RiErrorWarningFill as WarningIcon } from 'react-icons/ri';
import React, { useContext } from 'react';
import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';
import { TranslationData } from '@renderer/components/Translation/Translation';

interface CloseConfirmProps {
  actionType: 'close' | 'quit' | null;
  instrumentIds: number[];
  resetIds: () => void;
}

const CloseConfirm: React.FC<CloseConfirmProps> = ({ instrumentIds, resetIds, actionType }) => {
  const {
    closeInstrument,
    saveInstruments,
    instruments: [instruments],
  } = useContext(AppData) as AppDataState;
  const { textContent, buttons } = useContext(TranslationData);

  const handleClose = () => {
    closeInstrument(instrumentIds[0], false);
    resetIds();
  };

  const handleQuit = () => {
    window.api.quitApp();
  };

  const handleSaveAndCloseOrQuit = async (save: boolean) => {
    if (save) await saveInstruments(instrumentIds);
    else {
      await window.api.cleanInstruments(instruments.filter(({ id }) => instrumentIds.includes(id)).map(({ id, path }) => ({ id, path })));
    }
    if (actionType === 'close') handleClose();
    else handleQuit();
  };

  return (
    <Modal trigger={!!instrumentIds.length} handleClose={resetIds}>
      <div className='w-fit p-6'>
        <p className='inline-flex flex-nowrap items-center gap-4'>
          <WarningIcon className='scale-150 rounded-full bg-gray-800 text-yellow-400' />
          {textContent.unsavedInstrumentsWarning[instrumentIds.length === 1 ? 0 : 1]}
        </p>
        <div className='mt-4 flex justify-between gap-4'>
          <button className='cancel-button' onClick={resetIds}>
            {buttons.cancel[0]}
          </button>
          <button className='primary-button' onClick={() => handleSaveAndCloseOrQuit(false)}>
            {actionType === 'close' ? buttons.closeWithoutSaving[0] : buttons.quitWithoutSaving[0]}
          </button>
          <button className='primary-button' onClick={() => handleSaveAndCloseOrQuit(true)}>
            {instrumentIds.length === 1
              ? actionType === 'close'
                ? buttons.saveAndClose[0]
                : buttons.saveAndQuit[0]
              : actionType === 'close'
              ? buttons.saveAllAndClose[0]
              : buttons.saveAllAndQuit[0]}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CloseConfirm;
