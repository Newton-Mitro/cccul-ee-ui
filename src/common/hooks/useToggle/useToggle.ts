import { useCallback, useState } from 'react';

export const useToggle = (
  defaultValue: boolean
): [boolean, () => void, () => void, () => void] => {
  const [value, setValue] = useState<boolean>(defaultValue);

  const toggle = useCallback(() => {
    setValue((previousState) => !previousState);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return [value, toggle, setTrue, setFalse];
};
