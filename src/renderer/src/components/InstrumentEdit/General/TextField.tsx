import React, { useEffect, useRef, useState } from 'react';
import {
  AiTwotoneEdit as EditIcon,
  AiOutlineCheck as ValidateIcon,
  AiOutlineUndo as CancelIcon,
} from 'react-icons/ai';

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

const TextField: React.FC<TextFieldProps> = ({ label, setValue, value, id, required, placeholder, className }) => {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setValue(tempValue);
    setEditing(false);
  };

  return (
    <form
      className={`flex flex-col overflow-hidden rounded border border-slate-600 shadow-lg shrink-0 ${className || ''}`}
      onSubmit={handleSubmit}
    >
      <label
        htmlFor={id}
        className='flex items-center justify-between bg-gradient-to-t from-slate-800 to-slate-700 py-0.5 px-6 text-lg text-slate-300'
      >
        {label}
        <div className='flex items-center gap-3'>
          {editing ? (
            <>
              <button type='submit' className='block text-green-500 hover:brightness-150'>
                <ValidateIcon />
              </button>
              <button
                type='button'
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
              type='button'
              className='block hover:brightness-200'
              onClick={(e) => {
                e.preventDefault();
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
        className='bg-white text-slate-300 bg-opacity-10 px-6 py-1 outline-none placeholder:italic'
        required={required}
        placeholder={placeholder}
      />
    </form>
  );
};

export default TextField;
