import axios from "axios";
import { ReactNode, createContext, useContext, useState } from "react";

interface IAlgorithmProviderProps {
  children: ReactNode;
}

interface IAlgorithmProviderData {
  findPlatesPossibilityByFamily: (familyId: string) => Promise<void>;
  platesPossibility: any[];
}

export const AlgorithmContext = createContext<IAlgorithmProviderData>(
  {} as IAlgorithmProviderData
);

export const AlgorithmProvider = ({ children }: IAlgorithmProviderProps) => {
  const [ platesPossibility, setPlatesPossibility ] = useState([]);

  const findPlatesPossibilityByFamily = async (familyId: string): Promise<void> => {
    const res: any[] = await axios.get(
      `https://handovenapi.onrender.com/plates/algorithm/${familyId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-HandOven-Family": familyId,
          "X-HandOven-User": "111111111111111111111111",
        },
      }
    );
    console.log()
    if (res) {
      setPlatesPossibility(res.data.available_plates);
    }
  }

  return (
    <AlgorithmContext.Provider
      value={{
        findPlatesPossibilityByFamily,
        platesPossibility,

      }}
    >
      {children}
    </AlgorithmContext.Provider>
  );
};

export const useAlgorithm = () => useContext(AlgorithmContext);
