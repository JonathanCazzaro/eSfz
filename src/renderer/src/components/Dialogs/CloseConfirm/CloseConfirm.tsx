import Modal from '@renderer/components/Modal/Modal';
import { RiErrorWarningFill as WarningIcon } from 'react-icons/ri';
import React, { useContext } from 'react';
import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';

interface CloseConfirmProps {
  actionType: 'close' | 'quit' | null;
  instrumentIds: number[];
  resetIds: () => void;
}

const CloseConfirm: React.FC<CloseConfirmProps> = ({ instrumentIds, resetIds, actionType }) => {
  const { closeInstrument, saveInstruments } = useContext(AppData) as AppDataState;

  const handleClose = () => {
    closeInstrument(instrumentIds[0], false);
  };

  const handleQuit = () => {
    window.api.quitApp();
  };

  const handleSaveAndCloseOrQuit = async () => {
    await saveInstruments(instrumentIds);
    actionType === 'close' ? handleClose() : handleQuit();
  };

  return (
    <Modal trigger={!!instrumentIds.length} handleClose={resetIds}>
      <div className='w-fit p-6'>
        <p className='inline-flex flex-nowrap items-center gap-4'>
          <WarningIcon className='scale-150 rounded-full bg-gray-800 text-yellow-400' />
          {`Attention, ${
            instrumentIds.length === 1
              ? 'un instrument comporte'
              : 'plusieurs instruments comportent'
          } des modifications non sauvegardées.`}
        </p>
        <div className='mt-4 flex justify-between gap-4'>
          <button className='cancel-button' onClick={resetIds}>
            Annuler
          </button>
          <button
            className='primary-button'
            onClick={actionType === 'close' ? handleClose : handleQuit}
          >{`${actionType === 'close' ? 'Fermer' : 'Quitter'} sans enregistrer`}</button>
          <button className='primary-button' onClick={handleSaveAndCloseOrQuit}>
            {instrumentIds.length === 1
              ? `Enregistrer et ${actionType === 'close' ? 'fermer' : 'quitter'}`
              : `Tout enregistrer et ${actionType === 'close' ? 'fermer' : 'quitter'}`}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CloseConfirm;
