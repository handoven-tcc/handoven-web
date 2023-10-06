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

export function EditCard(req: createCardProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(-1);
  const [type, setType] = useState("");
  const [validity, setValidity] = useState("");
  const [unitMeasure, setUnitMeasure] = useState("");
  const [id, setId] = useState("");
  const [cost, setCost] = useState("");
  const [amount, setAmount] = useState("");
  const [expiryProduct, setExpiryProduct] = useState(false);
  const [defaultProduct, setDefaultProduct] = useState<any>({});
  const { updateProduct } = useContextSelector(ProductContext, (context) => {
    return context;
  });
  const familyId = getCookie("familyId") ?? "";

  useEffect(() => {
    const fetchRepos = async () => {
      const result = await req.setField();
      req.handleOpen();
      const date = result.validity.slice(0, 10).split("-").reverse().join("/");
      result.validity = date;

      setDefaultProduct(result);
    };

    fetchRepos();
  }, [req.name]);

  async function handleUpdateProduct() {
    const dateNow = new Date();

    console.log(defaultProduct);
    if (name == "") {
      setName(defaultProduct.name);
    }
    if (type == "") {
      setType(defaultProduct.type);
    }
    if (validity == "") {
      setValidity(defaultProduct.validity);
    }
    if (unitMeasure == "") {
      setUnitMeasure(defaultProduct.unitMeasure);
    }
    if (cost == "") {
      setCost(defaultProduct.cost);
    }
    if (amount == "") {
      setAmount(defaultProduct.amount);
    }

    console.log(validity.charAt(2));
    if (validity.charAt(2) == "/") {
      const [day, month, year] = validity.split("/");
      const dateValidity = new Date(+year, +month - 1, +day);

      if (dateValidity > dateNow) {
        setExpiryProduct(false);
        setValidity(dateValidity + "");
      } else {
        setExpiryProduct(true);
      }
    }
    if (new Date(validity) > dateNow) {
      setExpiryProduct(false);
    } else {
      setExpiryProduct(true);
    }
    console.log(validity);
    await updateProduct({
      id: defaultProduct.id,
      name,
      amount: parseInt(amount),
      category,
      cost,
      expiryProduct,
      familyId,
      type,
      unitMeasure,
      validity,
    });
    req.handleOpen();
  }

  return (
    <Dialog open={req.open} handler={req.handleOpen}>
      <DialogHeader>Edite seu Produto.</DialogHeader>
      <DialogBody divider>
        <div className="flex gap-2 flex-col ">
          <div className="flex gap-2">
            <Input
              type="text"
              label="Nome do Produto"
              defaultValue={defaultProduct.name}
              color="black"
              size="lg"
              width={130}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              type="text"
              label="Tipo"
              defaultValue={defaultProduct.type}
              color="black"
              size="lg"
              width={130}
              onChange={(e) => setType(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Input
              type="text"
              label="Validade"
              defaultValue={defaultProduct.validity}
              color="black"
              size="lg"
              width={130}
              onChange={(e) => setValidity(e.target.value)}
            />
            <Input
              type="text"
              label="Unidade de Medida"
              defaultValue={defaultProduct.unitMeasure}
              color="black"
              size="lg"
              width={130}
              onChange={(e) => setUnitMeasure(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Input
              type="text"
              label="Custo"
              color="black"
              defaultValue={defaultProduct.cost}
              size="lg"
              width={130}
              // icon={<LockKey />}
              onChange={(e) => setCost(e.target.value)}
            />
            <Input
              type="text"
              label="Quantidade"
              color="black"
              defaultValue={defaultProduct.amount}
              size="lg"
              width={130}
              // icon={<LockKey />}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <Select
            label="Categoria"
            color="gray"
            className="text-black"
            defaultValue={Category[category]}
          >
            <Option onClick={() => setCategory(0)}>Outros</Option>
            <Option onClick={() => setCategory(1)}>Açúcares</Option>
            <Option onClick={() => setCategory(2)}>Bebidas</Option>
            <Option onClick={() => setCategory(3)}>Carnes</Option>
            <Option onClick={() => setCategory(4)}>Chocolates</Option>
            <Option onClick={() => setCategory(5)}>Condimentos</Option>
            <Option onClick={() => setCategory(6)}>Conservas</Option>
            <Option onClick={() => setCategory(7)}>Farinhas</Option>
            <Option onClick={() => setCategory(8)}>Frutas</Option>
            <Option onClick={() => setCategory(9)}>Verduras</Option>
            <Option onClick={() => setCategory(10)}>Gorduras</Option>
            <Option onClick={() => setCategory(11)}>Grãos</Option>
            <Option onClick={() => setCategory(12)}>Laticínios</Option>
            <Option onClick={() => setCategory(13)}>Legumes</Option>
            <Option onClick={() => setCategory(14)}>Líquidos</Option>
            <Option onClick={() => setCategory(15)}>Massas</Option>
            <Option onClick={() => setCategory(16)}>Molhos</Option>
            <Option onClick={() => setCategory(17)}>Pães</Option>
            <Option onClick={() => setCategory(18)}>Temperos</Option>
            <Option onClick={() => setCategory(19)}>Vegetais</Option>
            <Option onClick={() => setCategory(20)}>Fungo</Option>
            <Option onClick={() => setCategory(21)}>Proteína</Option>
          </Select>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={req.handleOpen}
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
