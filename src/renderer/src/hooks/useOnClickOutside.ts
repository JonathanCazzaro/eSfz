import { RefObject, useEffect } from 'react';

export const useOnClickOutside = (
  element: RefObject<HTMLElement>,
  callback: () => void,
  whitelist: RefObject<HTMLElement>[] | [],
) => {
  const handleClick = (event: MouseEvent) => {
    const whitelistBuffer = [...whitelist];
    whitelistBuffer.push(element as RefObject<HTMLElement>);
    for (const element of whitelistBuffer) {
      if ((element as RefObject<HTMLElement>).current?.contains(event.target as Node)) return;
    }
    callback();
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => void document.removeEventListener('click', handleClick);
  }, []);
};
