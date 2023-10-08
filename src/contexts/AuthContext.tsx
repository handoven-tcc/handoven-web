import { ReactNode, useState } from "react";
import { createContext } from "use-context-selector";
import { cookies } from "next/headers";
// import { api } from '../pages/api/auth/authInterceptor.api'
import { serialize } from "cookie";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

interface AuthContextProviderProps {
  children: ReactNode;
}

export interface IUser {
  id?: string;
  name: string;
  birthDate: Date;
  email: string;
  cell: string;
  familyName: string;
  password?: string;
}

export interface reqAuthenticate {
  email: string;
  password: string;
}

interface AuthContextProps {
  authenticateUser: (reqUser: reqAuthenticate) => Promise<boolean>;
  createUser: (user: IUser) => Promise<any>;
  isAdminUser: () => boolean;
}
export const api = axios.create({
  baseURL: process.env.URL_API ?? "", // Replace with your API base URL
});

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  async function authenticateUser(
    reqAuthenticate: reqAuthenticate
  ): Promise<boolean> {
    const res: any = await axios.post(
      "https://handovenapi.onrender.com/user/login",
      {
        email: reqAuthenticate.email,
        password: reqAuthenticate.password,
      },
      {
        headers: {
          "X-HandOven-Family": "111111111111111111111111",
          "X-HandOven-User": "111111111111111111111111",
        },
      }
    );
    if (res.data) {
      setCookie("token", "token", { maxAge: 60 * 60 * 24 });
      setCookie("familyId", res.data.familyId, { maxAge: 60 * 60 * 24 });
      setCookie("email", res.data.email, { maxAge: 60 * 60 * 24 });
      return true;
    }
    return false;
  }

  async function createUser(user: IUser): Promise<any> {
    const oneDay = 24 * 60 * 60 * 1000;
    const responseFamily: any = await api.post(
      "https://handovenapi.onrender.com/family",
      {
        name: user.familyName,
        headers: {
          "Content-Type": "application/json",
          "X-HandOven-Service": true,
          "X-HandOven-Family": "111111111111111111111111",
          "X-HandOven-User": "111111111111111111111111",
        },
      }
    );
    if (!responseFamily) {
      return "Erro no cadastro da Familia";
    }
    setCookie("familyId", responseFamily.data.id, { maxAge: 60 * 60 * 24 });

    const responseUser: any = await api.post(
      "https://handovenapi.onrender.com/user/addUser",
      {
        name: user.name,
        birthDate: user.birthDate,
        email: user.email,
        cell: user.cell,
        password: user.password,
        familyId: responseFamily.data.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-HandOven-Service": true,
          "X-HandOven-Family": responseFamily.data.id,
          "X-HandOven-User": "111111111111111111111111",
        },
      }
    );
    setCookie("token", "token", { maxAge: 60 * 60 * 24 });
    return true;
  }

  function isAdminUser(): boolean {
    const email = getCookie("email");
    if (email === "admin@admin.com") {
      return true;
    }
    return false;
  }

  return (
    <AuthContext.Provider
      value={{
        authenticateUser,
        createUser,
        isAdminUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
