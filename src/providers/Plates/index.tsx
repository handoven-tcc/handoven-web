import { AxiosResponse } from "axios";
import { ReactNode, createContext, useContext, useState } from "react";
import { IPlate } from "../../types";
import { PlateRequest } from "../../models";
import { useAuth } from "../Auth";

interface IPlatesProviderProps {
  children: ReactNode;
}

interface IPlatesProviderData {
  getPlates: () => void;
  createPlate: (request: PlateRequest) => void;
  sobremesas: IPlate[];
  saladas: IPlate[];
  sopas: IPlate[];
  omeletes: IPlate[];
  asiaticos: IPlate[];
  brasileiro: IPlate[];
  risotos: IPlate[];
  frangos: IPlate[];
  massas: IPlate[];
  peixes: IPlate[];
  pizzas: IPlate[];
  bebidas: IPlate[];
  aperitivos: IPlate[];
  vegetarianas: IPlate[];
  isLoadingPlate: boolean;
}

export const PlatesContext = createContext<IPlatesProviderData>(
  {} as IPlatesProviderData
);

export const PlatesProvider = ({ children }: IPlatesProviderProps) => {
  const { api, isAdminUser } = useAuth();

  const [isLoadingPlate, setIsLoadingPlate] = useState<boolean>(false);
  const [sobremesas, setSobremesas] = useState<IPlate[]>([]);
  const [saladas, setSaladas] = useState<IPlate[]>([]);
  const [sopas, setSopas] = useState<IPlate[]>([]);
  const [omeletes, setOmeletes] = useState<IPlate[]>([]);
  const [asiaticos, setAsiaticos] = useState<IPlate[]>([]);
  const [brasileiro, setBrasileiro] = useState<IPlate[]>([]);
  const [risotos, setRisotos] = useState<IPlate[]>([]);
  const [frangos, setFrangos] = useState<IPlate[]>([]);
  const [massas, setMassas] = useState<IPlate[]>([]);
  const [peixes, setPeixes] = useState<IPlate[]>([]);
  const [pizzas, setPizzas] = useState<IPlate[]>([]);
  const [bebidas, setBebidas] = useState<IPlate[]>([]);
  const [aperitivos, setAperitivos] = useState<IPlate[]>([]);
  const [vegetarianas, setVegetarianas] = useState<IPlate[]>([]);

  const getPlates = async () => {
    const url = import.meta.env.VITE_URL_API as string;
    setIsLoadingPlate(true);
    try {
      const { data }: AxiosResponse<IPlate[]> = await api.get(
        `${url}plates`
        // ,
        // {
        //   headers: {
        //     "X-HandOven-Family": getFamilyId(),
        //     "X-HandOven-User": "111111111111111111111111",
        //   },
        // }
      );

      setSobremesas(data.filter((o: IPlate) => o.category == 1));
      setSaladas(data.filter((o: IPlate) => o.category == 2));
      setSopas(data.filter((o: IPlate) => o.category == 3));
      setOmeletes(data.filter((o: IPlate) => o.category == 4));
      setAsiaticos(data.filter((o: IPlate) => o.category == 5));
      setBrasileiro(data.filter((o: IPlate) => o.category == 6));
      setRisotos(data.filter((o: IPlate) => o.category == 7));
      setFrangos(data.filter((o: IPlate) => o.category == 8));
      setMassas(data.filter((o: IPlate) => o.category == 9));
      setPeixes(data.filter((o: IPlate) => o.category == 10));
      setPizzas(data.filter((o: IPlate) => o.category == 11));
      setBebidas(data.filter((o: IPlate) => o.category == 12));
      setAperitivos(data.filter((o: IPlate) => o.category == 13));
      setVegetarianas(data.filter((o: IPlate) => o.category == 14));

      setIsLoadingPlate(false);
    } catch (error) {
      console.error(error);
      setIsLoadingPlate(false);
    }
  };

  const createPlate = async (request: PlateRequest) => {
    if (!isAdminUser()) {
      return;
    }
    setIsLoadingPlate(true);
    try {
      await api.post("plates", request);

      getPlates();
      setIsLoadingPlate(false);
    } catch (error) {
      console.error(error);
      setIsLoadingPlate(false);
    }
  };

  return (
    <PlatesContext.Provider
      value={{
        getPlates,
        createPlate,
        sobremesas,
        saladas,
        sopas,
        omeletes,
        asiaticos,
        brasileiro,
        risotos,
        frangos,
        massas,
        peixes,
        pizzas,
        bebidas,
        aperitivos,
        vegetarianas,
        isLoadingPlate,
      }}
    >
      {children}
    </PlatesContext.Provider>
  );
};

export const usePlates = () => useContext(PlatesContext);
