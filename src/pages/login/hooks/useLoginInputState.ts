import { useState } from 'react';
import { initialLoginInputState } from '../constants/initialLoginInputState';

const useLoginInputState = () => {
  const [loginInputState, setLoginInputState] = useState(
    initialLoginInputState
  );

  const updateLoginInputState = (fieldName: string, fieldValue: any) => {
    setLoginInputState((prevState) => {
      return {
        ...prevState,
        [fieldName]: fieldValue,
      };
    });
  };

  return {
    loginInputState,
    setLoginInputState,
    updateLoginInputState,
  };
};

export default useLoginInputState;
