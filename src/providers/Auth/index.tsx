import axios, { AxiosResponse } from "axios";
import { ReactNode, createContext, useContext, useState } from "react";
import { FamilyRequest, LoginRequest, UserRequest } from "../../models";
import { IFamilyResponse, ILoginResponse, IUserResponse } from "../../types";

interface IAuthProviderProps {
  children: ReactNode;
}

interface IAuthProviderData {
  login: (request: LoginRequest) => void;
  createUser: (request: UserRequest) => void;
  isAdminUser: () => boolean;
  logout: () => void;
  token: string;
  userId: string;
  email: string;
  familyId: string;
  isLoadingAuth: boolean;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_URL_API as string,
});

export const AuthContext = createContext<IAuthProviderData>(
  {} as IAuthProviderData
);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [familyId, setFamilyId] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const login = async (request: LoginRequest) => {
    setIsLoadingAuth(true);
    try {
      const { data }: AxiosResponse<ILoginResponse> = await api.post(
        "user/login",
        request,
        {
          headers: {
            "Content-Type": "application/json",
            "X-HandOven-Service": false,
            "X-HandOven-Family": "111111111111111111111111",
            "X-HandOven-User": "111111111111111111111111",
          },
        }
      );

      setUserId(data.id);
      setFamilyId(data.familyId);
      setEmail(data.email);
      setToken("token");
      setIsLoadingAuth(false);
    } catch (error) {
      console.error(error);
      setIsLoadingAuth(false);
    }
  };

  const createUser = async (request: UserRequest) => {
    const requestFamily = new FamilyRequest(request.familyName);
    const family = await createFamily(requestFamily);
    request.familyId = family.id;
    setIsLoadingAuth(true);
    try {
      const { data }: AxiosResponse<IUserResponse> = await api.post(
        "user/addUser",
        request,
        {
          headers: {
            "Content-Type": "application/json",
            "X-HandOven-Service": false,
            "X-HandOven-Family": "111111111111111111111111",
            "X-HandOven-User": "111111111111111111111111",
          },
        }
      );
      setToken("token");
      setUserId(data.id);
      setFamilyId(data.familyId);
      setEmail(data.email);
      setIsLoadingAuth(false);
    } catch (error) {
      console.error(error);
      setIsLoadingAuth(false);
    }
  };

  const createFamily = async (
    request: FamilyRequest
  ): Promise<IFamilyResponse> => {
    setIsLoadingAuth(true);
    let family;
    try {
      const { data }: AxiosResponse<IFamilyResponse> = await api.post(
        "family",
        request,
        {
          headers: {
            "Content-Type": "application/json",
            "X-HandOven-Service": false,
            "X-HandOven-Family": "111111111111111111111111",
            "X-HandOven-User": "111111111111111111111111",
          },
        }
      );
      family = data;
      setFamilyId(data.id);
      setIsLoadingAuth(false);
    } catch (error) {
      console.error(error);
      setIsLoadingAuth(false);
    }

    return family as IFamilyResponse;
  };

  const logout = () => {
    setUserId("");
    setFamilyId("");
    setEmail("");
    setToken("");
  };

  const isAdminUser = (): boolean => {
    const emailAdmin = import.meta.env.VITE_ADMIN_EMAIL as string;
    return email === emailAdmin;
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        createUser,
        logout,
        isAdminUser,
        token,
        userId,
        familyId,
        email,
        isLoadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
