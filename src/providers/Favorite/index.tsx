import axios from "axios";
import { ReactNode, createContext, useContext, useState } from "react";
import { useAuth } from "../Auth";

interface IFavoriteProviderProps {
  children: ReactNode;
}

interface IFavoriteProviderData {
  addFavorite: (plateId: string, familyId:string) => Promise<void>;
  removeFavorite: (plateId: string, familyId: string) => Promise<void>;
  findFavoritesByFamily: (familyId: string) => Promise<any[]>;
  favorites: any[];
}

export const FavoriteContext = createContext<IFavoriteProviderData>(
  {} as IFavoriteProviderData
);

export const FavoriteProvider = ({ children }: IFavoriteProviderProps) => {
  const { getUserId } = useAuth();
  const [ favorites, setFavorites ] = useState([]);

  const findFavoritesByFamily = async (familyId: string): Promise<void> => {
    const { data } : any = await axios.get(
      `https://handovenapi.onrender.com/family/${familyId}`,
      {
        headers: {
          "X-HandOven-User": getUserId(),
          "X-handOven-Service": "false",
          "X-HandOven-Family": familyId,
        },
      }
    )
    const res: any = await axios.get(
      `https://handovenapi.onrender.com/plates`,
      {
        headers: {
          "X-HandOven-User": getUserId(),
          "X-handOven-Service": "false",
          "X-HandOven-Family": familyId,
        },
      }
    );
    setFavorites([]);
      if(data.plates_favorites) {
      data.plates_favorites.map((id: any) => {res.data.map((plate: any) => {if(plate.id == id) {setFavorites([plate, ...favorites])}})})}
    }

  const removeFavorite = async (plateId:string, familyId:string): Promise<any>  => {
    const res: any = await axios.delete(
      `https:/handovenapi.onrender.com/family/${familyId}/plateId/${plateId}/favorite`,
      {
        headers: {
          "X-HandOven-User": getUserId(),
          "X-handOven-Service": "false",
          "X-HandOven-Family": familyId,
        },
      }
    );
  }

  const addFavorite = async (plateId:string, familyId:string): Promise<void> => {
    const res: any = await axios.put(
      `https:/handovenapi.onrender.com/family/${familyId}/plateId/${plateId}/favorite`, null,
      {
        headers: {
          "X-HandOven-User": getUserId(),
          "X-handOven-Service": "false",
          "X-HandOven-Family": familyId,
        },
      }
    );
  };
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
};

export const useFavorite = () => useContext(FavoriteContext);
