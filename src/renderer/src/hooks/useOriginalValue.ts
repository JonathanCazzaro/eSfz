import { useEffect, useRef } from 'react';

export const usePrevious = <T>(_value: T) => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = _value;
  });
  return ref.current;
};
