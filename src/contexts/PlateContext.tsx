import axios from "axios";
import { AnyARecord } from "dns";
import { ReactNode, useState } from "react";
import { createContext } from "use-context-selector";

interface PlateContextProviderProps {
  children: ReactNode;
}

interface ISection {
  igredients: {
    igredientes_name: string;
    igredients_quantity: number;
    igredients_unit_measure: string;
    igredients_category: number;
    igredients_notes: string;
  };
  prepare_mode: [];
  extras: [];
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
  sobremesas: IPlate[]
  saladas: IPlate[]
  sopas: IPlate[]
  omeletes: IPlate[]
  asiaticos: IPlate[]
  brasileiro: IPlate[]
  risotos: IPlate[]
  frangos: IPlate[]
  massas: IPlate[]
  peixes : IPlate[]
  pizzas : IPlate[]
  bebidas : IPlate[]
  aperitivos : IPlate[]
  vegetarianas : IPlate[]
  findPlates: (family: string) => Promise<void>
}

export const PlateContext = createContext({} as PlateContextProps);

export function PlateContextProvider({ children }: PlateContextProviderProps) {
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
    const res: any = await axios.get(
      "https://handovenapi.onrender.com/plates",
      {
        headers: {
          "X-HandOven-Family": family,
          "X-HandOven-User": "111111111111111111111111",
        },
      }
    );

    setSobremesas( res.data.filter((o:IPlate) => o.category == 1))
    setSaladas( res.data.filter((o:IPlate) => o.category == 2))
    setSopas( res.data.filter((o:IPlate) => o.category == 3))
    setOmeletes( res.data.filter((o:IPlate) => o.category == 4))
    setAsiaticos( res.data.filter((o:IPlate) => o.category == 5))
    setBrasileiro( res.data.filter((o:IPlate) => o.category == 6))
    setRisotos( res.data.filter((o:IPlate) => o.category == 7))
    setFrangos( res.data.filter((o:IPlate) => o.category == 8))
    setMassas( res.data.filter((o:IPlate) => o.category == 9))
    setPeixes( res.data.filter((o:IPlate) => o.category == 10))
    setPizzas( res.data.filter((o:IPlate) => o.category == 11))
    setBebidas( res.data.filter((o:IPlate) => o.category == 12))
    setAperitivos( res.data.filter((o:IPlate) => o.category == 13))
    setVegetarianas( res.data.filter((o:IPlate) => o.category == 14))
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
        peixes ,
        pizzas ,
        bebidas ,
        aperitivos ,
        vegetarianas ,
        findPlates
      }}
    >
      {children}
    </PlateContext.Provider>
  );
}
