import axios, { AxiosResponse } from "axios";
import { AnyARecord } from "dns";
import { ReactNode, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { AuthContext } from "./AuthContext";

interface PlateContextProviderProps {
  children: ReactNode;
}

export interface ISection {
  ingredients: {
    ingredients_name: string;
    ingredients_quantity: number;
    ingredients_unit_measure: string;
    ingredients_category: number;
    ingredients_notes: string;
  };
  prepare_mode: [];
  extras: [];
}

export class PlateRequest {
  constructor(
    public name: string,
    public image: string,
    public category: number,
    public favorites: boolean,
    public section: ISection,
    public id?: string
  ) {}
}

export interface IPlate {
  id?: string;
  name: string;
  image: string;
  category: number;
  favorites: boolean;
  section: ISection;
}

interface PlateContextProps {
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
  findPlates: (family: string) => Promise<void>;
  createPlate: (request: IPlate) => Promise<void>;
}

export const PlateContext = createContext({} as PlateContextProps);

export function PlateContextProvider({ children }: PlateContextProviderProps) {
  const { isAdminUser } = useContextSelector(AuthContext, (context) => context);

  const [loadingPlate, setLoadingPlate] = useState<boolean>(false);
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

  async function findPlates(family: string): Promise<void> {
    setLoadingPlate(true);
    try {
      const { data }: AxiosResponse<IPlate[]> = await axios.get(
        "https://handovenapi.onrender.com/plates",
        {
          headers: {
            "X-HandOven-Family": family,
            "X-HandOven-User": "111111111111111111111111",
          },
        }
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

      setLoadingPlate(false);
    } catch (error) {
      console.error(error);
      setLoadingPlate(false);
    }
  }

  async function createPlate(request: PlateRequest): Promise<any> {
    if (!isAdminUser()) {
      return;
    }

    setLoadingPlate(true);
    try {
      await axios.post("https://handovenapi.onrender.com/plates", request, {
        headers: {
          "X-HandOven-Family": "111111111111111111111111",
          "X-HandOven-User": "111111111111111111111111",
        },
      });

      setLoadingPlate(false);
    } catch (error) {
      console.error(error);
      setLoadingPlate(false);
    }
  }

  return (
    <PlateContext.Provider
      value={{
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
        findPlates,
        createPlate,
      }}
    >
      {children}
    </PlateContext.Provider>
  );
}
