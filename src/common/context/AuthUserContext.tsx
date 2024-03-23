import { useLocalStorage } from 'common/hooks/useStorage';
import { IAuthUserModel } from 'pages/login/model/data/IAuthUserModel';
import { createContext, useState } from 'react';

export type AuthUserContextType = {
  authUser: IAuthUserModel | null;
  storeAuthUserData: (currentUser: IAuthUserModel) => void;
  clearAuthUserData: () => void;
};

const initialValue = {
  authUser: null,
  storeAuthUserData: () => {},
  clearAuthUserData: () => {},
};

const AuthUserContext = createContext<AuthUserContextType>(initialValue);

export const AuthUserContextProvider = ({ children }: any) => {
  const [user, setUser, removeUser] = useLocalStorage('authUser', null);
  const [authUser, setAuthUser] = useState<IAuthUserModel | null>(user);

  const storeAuthUserData = (userData: IAuthUserModel | null) => {
    setUser(userData);
    setAuthUser(userData);
  };

  const clearAuthUserData = () => {
    setAuthUser(null);
    removeUser();
  };

  return (
    <AuthUserContext.Provider
      value={{
        authUser,
        storeAuthUserData,
        clearAuthUserData,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserContext;
