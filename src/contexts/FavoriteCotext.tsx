import { ReactNode, useState } from "react";
import { createContext } from "use-context-selector";
import { cookies } from "next/headers";
// import { api } from '../pages/api/auth/authInterceptor.api'
import { serialize } from "cookie";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

interface FavoriteContextProviderProps {
  children: ReactNode;
}

interface FavoriteContextProps {
  addFavorite: (plateId: string, familyId:string) => Promise<void>;
  removeFavorite: (plateId: string, familyId: string) => Promise<void>;
  findFavoritesByFamily: (familyId: string) => Promise<void>;
  favorites: any[];
}
export const api = axios.create({
  baseURL: process.env.URL_API ?? "", // Replace with your API base URL
});

export const FavoriteContext = createContext({} as FavoriteContextProps);

export function FavoriteContextProvider({ children }: FavoriteContextProviderProps) {
  const [ favorites, setFavorites ] = useState([]);

  async function findFavoritesByFamily(familyId: string): Promise<void> {
    const res: any = await axios.get(
      `https://handovenapi.onrender.com/favorites?familyId=${familyId}`,
      {
      }
    );
    if (res) {
      setFavorites(res.data);
    }
  }

  async function addFavorite(
    plateId:string, familyId:string
  ): Promise<void> {
    const res: any = await axios.put
    (    
      `https:/handovenapi.onrender.com/family/${familyId}/plateId/${plateId}/favorite`,{},
      {
        headers: {
          "Content-Type": "application/json",
          "X-HandOven-Family":familyId,
          "X-HandOven-User": "111111111111111111111111",
        },
      }
    );

  }

  async function removeFavorite(
    plateId:string, familyId:string): Promise<any> {
    const res: any = await api.delete(
      `https:/handovenapi.onrender.com/family/${familyId}/plateId/${plateId}/favorite`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-HandOven-Family": familyId,
          "X-HandOven-User": "111111111111111111111111",
        },
      }
    );
    console.log(res)
  }

  return (
    <FavoriteContext.Provider
      value={{
        addFavorite,
        removeFavorite,
        findFavoritesByFamily,
        favorites
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
