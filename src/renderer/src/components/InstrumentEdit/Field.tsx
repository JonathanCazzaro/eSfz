import React, { useEffect, useRef, useState } from 'react';
import {
  AiTwotoneEdit as EditIcon,
  AiOutlineCheck as ValidateIcon,
  AiOutlineUndo as CancelIcon,
} from 'react-icons/ai';

interface FieldProps {
  id: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
}

const Field: React.FC<FieldProps> = ({ label, setValue, value, id }) => {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  return (
    <div className='flex flex-col overflow-hidden rounded border border-slate-600 shadow-lg'>
      <label
        htmlFor={id}
        className='flex items-center justify-between bg-gradient-to-t from-slate-800 to-slate-700 py-0.5 px-6 text-lg text-slate-300'
      >
        {label}
        <div className='flex items-center gap-3'>
          {editing ? (
            <>
              <button
                className='block text-green-500 hover:brightness-150'
                onClick={() => {
                  setValue(tempValue);
                  setEditing(false);
                }}
              >
                <ValidateIcon />
              </button>
              <button
                className='block text-red-600 hover:brightness-150'
                onClick={() => {
                  setTempValue(value);
                  setEditing(false);
                }}
              >
                <CancelIcon />
              </button>
            </>
          ) : (
            <button
              className='block hover:brightness-200'
              onClick={() => {
                setEditing(!editing);
                inputRef.current?.focus();
              }}
            >
              <EditIcon />
            </button>
          )}
        </div>
      </label>
      <input
        type='text'
        ref={inputRef}
        name={id}
        id={id}
        readOnly={!editing}
        value={tempValue}
        onInput={({ currentTarget }) => setTempValue(currentTarget.value)}
        className='bg-white bg-opacity-10 px-6 py-1 outline-none'
      />
    </div>
  );
};

export default Field;
