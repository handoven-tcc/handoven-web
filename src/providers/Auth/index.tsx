import { ReactNode, createContext, useContext, useState } from "react";

interface IAuthProviderProps {
  children: ReactNode;
}

interface IAuthProviderData {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<IAuthProviderData>(
  {} as IAuthProviderData
);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [token, setToken] = useState<string>("");

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
