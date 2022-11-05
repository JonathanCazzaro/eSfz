import { AppData } from '@renderer/store';
import { AppDataState } from '@renderer/types/types';
import React, { useContext } from 'react';

const QuitConfirm: React.FC<{ instrumentIds: number[] }> = ({ instrumentIds }) => {
  const {
    instruments: [instruments],
  } = useContext(AppData) as AppDataState;

  const unsavedInstruments = instruments.filter(({ id }) => instrumentIds.includes(id));
  console.log(unsavedInstruments);

  return <></>;
};

export default QuitConfirm;
