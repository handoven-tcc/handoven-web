import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import {
  IProduct,
  ProductContext,
} from "../../../../../contexts/ProductsContext";
import { getCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import { z } from "zod";

enum Category {
  Outros,
  "Açúcares",
  Bebidas,
  Carnes,
  Chocolates,
  Condimentos,
  Conservas,
  Farinhas,
  Frutas,
  Verduras,
  Gorduras,
  "Grãos",
  "Laticínios",
  Legumes,
  "Líquidos",
  Massas,
  Molhos,
  "Pães",
  Temperos,
  Vegetais,
  Fungo,
  "Proteína",
}

interface createCardProps {
  open: boolean;
  handleOpen: () => void;
  name: string;
  type: string;
  validity: string;
  category: number;
  cost: string;
  amount: number;
  expiryProduct: boolean;
  unitMeasure: string;
  id: string;
  setField: () => IProduct;
}

export default function EditCard({ amount,category,cost,expiryProduct,handleOpen,id,name,open,setField,type,unitMeasure,validity}: createCardProps) {
  const [nameValue, setNameValue] = useState("");
  const [categoryValue, setCategoryValue] = useState(-1);
  const [typeValue, setTypeValue] = useState("");
  const [validityValue, setValidityValue] = useState("");
  const [unitMeasureValue, setUnitMeasureValue] = useState("");
  const [idValue, setIdValue] = useState("");
  const [costValue, setCostValue] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const [expiryProductValue, setExpiryProductValue] = useState(false);
  const [defaultProductValue, setDefaultProductValue] = useState<any>({});
  const { updateProduct } = useContextSelector(ProductContext, (context) => {
    return context;
  });
  const [ count, setCount ] = useState(0)
  const familyId = getCookie("familyId") ?? "";

  useEffect(() => {
    const fetchRepos = async () => {
      
      const result = await setField();
      const date = result.validity.slice(0, 10).split("-").reverse().join("/");
      result.validity = date;
      
      setDefaultProductValue(result);
      if(count > 0) {

        handleOpen();
      }
      setCount(count + 1)
    };

    fetchRepos();
  }, [name]);

  async function handleUpdateProduct() {
    const dateNow = new Date();

    console.log(defaultProductValue);
    if (name == "") {
      setNameValue(defaultProductValue.name);
    }
    if (type == "") {
      setTypeValue(defaultProductValue.type);
    }
    if (validity == "") {
      setValidityValue(defaultProductValue.validity);
    }
    if (unitMeasure == "") {
      setUnitMeasureValue(defaultProductValue.unitMeasure);
    }
    if (cost == "") {
      setCostValue(defaultProductValue.cost);
    }
    if (String(amount) == "") {
      setAmountValue(defaultProductValue.amount);
    }

    console.log(validity.charAt(2));
    if (validity.charAt(2) == "/") {
      const [day, month, year] = validity.split("/");
      const dateValidity = new Date(+year, +month - 1, +day);

      if (dateValidity > dateNow) {
        setExpiryProductValue(false);
        setValidityValue(dateValidity + "");
      } else {
        setExpiryProductValue(true);
      }
    }
    if (new Date(validity) > dateNow) {
      setExpiryProductValue(false);
    } else {
      setExpiryProductValue(true);
    }
    console.log(validity);
    await updateProduct({
      id: defaultProductValue.id,
      name,
      amount: parseInt(amountValue),
      category,
      cost,
      expiryProduct,
      familyId,
      type,
      unitMeasure,
      validity,
    });
    handleOpen();
  }

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Edite seu Produto.</DialogHeader>
      <DialogBody divider>
        <div className="flex gap-2 flex-col ">
          <div className="flex gap-2">
            <Input
              type="text"
              label="Nome do Produto"
              defaultValue={defaultProductValue.name}
              color="black"
              size="lg"
              width={130}
              onChange={(e) => setNameValue(e.target.value)}
            />

            <Input
              type="text"
              label="Tipo"
              defaultValue={defaultProductValue.type}
              color="black"
              size="lg"
              width={130}
              onChange={(e) => setTypeValue(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Input
              type="text"
              label="Validade"
              defaultValue={defaultProductValue.validity}
              color="black"
              size="lg"
              width={130}
              onChange={(e) => setValidityValue(e.target.value)}
            />
            <Input
              type="text"
              label="Unidade de Medida"
              defaultValue={defaultProductValue.unitMeasure}
              color="black"
              size="lg"
              width={130}
              onChange={(e) => setUnitMeasureValue(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Input
              type="text"
              label="Custo"
              color="black"
              defaultValue={defaultProductValue.cost}
              size="lg"
              width={130}
              // icon={<LockKey />}
              onChange={(e) => setCostValue(e.target.value)}
            />
            <Input
              type="text"
              label="Quantidade"
              color="black"
              defaultValue={defaultProductValue.amount}
              size="lg"
              width={130}
              // icon={<LockKey />}
              onChange={(e) => setAmountValue(e.target.value)}
            />
          </div>

          <Select
            label="Categoria"
            color="gray"
            className="text-black"
            defaultValue={Category[category]}
          >
            <Option onClick={() => setCategoryValue(0)}>Outros</Option>
            <Option onClick={() => setCategoryValue(1)}>Açúcares</Option>
            <Option onClick={() => setCategoryValue(2)}>Bebidas</Option>
            <Option onClick={() => setCategoryValue(3)}>Carnes</Option>
            <Option onClick={() => setCategoryValue(4)}>Chocolates</Option>
            <Option onClick={() => setCategoryValue(5)}>Condimentos</Option>
            <Option onClick={() => setCategoryValue(6)}>Conservas</Option>
            <Option onClick={() => setCategoryValue(7)}>Farinhas</Option>
            <Option onClick={() => setCategoryValue(8)}>Frutas</Option>
            <Option onClick={() => setCategoryValue(9)}>Verduras</Option>
            <Option onClick={() => setCategoryValue(10)}>Gorduras</Option>
            <Option onClick={() => setCategoryValue(11)}>Grãos</Option>
            <Option onClick={() => setCategoryValue(12)}>Laticínios</Option>
            <Option onClick={() => setCategoryValue(13)}>Legumes</Option>
            <Option onClick={() => setCategoryValue(14)}>Líquidos</Option>
            <Option onClick={() => setCategoryValue(15)}>Massas</Option>
            <Option onClick={() => setCategoryValue(16)}>Molhos</Option>
            <Option onClick={() => setCategoryValue(17)}>Pães</Option>
            <Option onClick={() => setCategoryValue(18)}>Temperos</Option>
            <Option onClick={() => setCategoryValue(19)}>Vegetais</Option>
            <Option onClick={() => setCategoryValue(20)}>Fungo</Option>
            <Option onClick={() => setCategoryValue(21)}>Proteína</Option>
          </Select>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-2 py-4 rounded-md"
        >
          <span>Cancelar</span>
        </Button>
        <button
          className="p-3 bg-green-500 text-white rounded-md flex items-center gap-1 hover:bg-green-300"
          onClick={handleUpdateProduct}
        >
          <span>Confirmar</span>
        </button>
      </DialogFooter>
    </Dialog>
  );
}
