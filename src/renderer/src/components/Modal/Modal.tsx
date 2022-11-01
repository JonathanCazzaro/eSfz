import { useOnClickOutside } from '@renderer/hooks/useOnClickOutside';
import React, { ReactNode, RefObject, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  trigger: boolean;
  className?: string;
  handleClose: () => void;
  closeWhitelist?: RefObject<HTMLElement>[];
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  children,
  trigger,
  className,
  handleClose,
  closeWhitelist,
}) => {
  const mountElement = document.getElementById('root');
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = trigger ? 'hidden' : 'auto';
  }, [trigger]);

  useOnClickOutside(childrenRef, handleClose, closeWhitelist || []);

  return !!mountElement && trigger
    ? createPortal(
        <div className='fixed inset-0 z-30 flex items-center justify-center'>
          <div className='fixed inset-0 z-30 bg-black bg-opacity-30 flex items-center justify-center'></div>
          <div
            className={`relative z-40 bg-slate-400 rounded-xl shadow-md ${className || ''}`}
            ref={childrenRef}
          >
            {children}
          </div>
        </div>,
        mountElement,
      )
    : null;
};

export default Modal;
