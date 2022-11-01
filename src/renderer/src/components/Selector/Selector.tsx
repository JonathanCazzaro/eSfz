import { useOnClickOutside } from '@renderer/hooks/useOnClickOutside';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { HiOutlineChevronDown as ArrowDown } from 'react-icons/hi2';
import { HiOutlineRefresh as RefreshIcon } from 'react-icons/hi';

interface SelectorProps {
  selectedOption?: string;
  children: ReactNode;
  onRefresh?: () => void;
}

const Selector: React.FC<SelectorProps> = ({ children, selectedOption, onRefresh }) => {
  const [isOpen, setIsOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(componentRef, () => setIsOpen(false), []);

  useEffect(() => {
    setIsOpen(false);
  }, [selectedOption]);

  return (
    <div className='flex items-center gap-2 w-fit mx-auto'>
      <div
        className={`relative bg-slate-100 w-96 px-6 shadow-lg my-4 ${
          isOpen ? 'rounded-t-[1.2rem]' : 'rounded-full'
        }`}
        ref={componentRef}
      >
        <button
          className={`flex items-center gap-4 text-center justify-between w-full border-b py-1.5 ${
            isOpen ? ' border-slate-300' : 'border-transparent'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption}
          <ArrowDown className='scale-125' />
        </button>
        {isOpen && (
          <ul className='absolute top-full py-2 left-0 bg-slate-100 w-full rounded-b-[1.2rem] overflow-hidden'>
            {children}
          </ul>
        )}
      </div>
      {!!onRefresh && (
        <button onClick={onRefresh} className="rounded-full flex p-1 items-center justify-center hover:bg-slate-300 transition">
          <RefreshIcon className='text-3xl text-slate-700' />
        </button>
      )}
    </div>
  );
};

export default Selector;
