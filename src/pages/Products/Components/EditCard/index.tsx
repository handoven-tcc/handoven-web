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
import { IProduct } from "../../../../types";
import { useAuth } from "../../../../providers/Auth";
import { useProducts } from "../../../../providers/Products";

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

const EditCard = ({
  amount,
  category,
  cost,
  expiryProduct,
  handleOpen,
  name,
  open,
  setField,
  type,
  unitMeasure,
  validity,
}: createCardProps) => {
  const [_nameValue, setNameValue] = useState("");
  const [_categoryValue, setCategoryValue] = useState(-1);
  const [_typeValue, setTypeValue] = useState("");
  const [_validityValue, setValidityValue] = useState("");
  const [_unitMeasureValue, setUnitMeasureValue] = useState("");
  const [_costValue, setCostValue] = useState("");
  const [_expiryProductValue, setExpiryProductValue] = useState(false);
  const [amountValue, setAmountValue] = useState("");
  const [defaultProductValue, setDefaultProductValue] = useState<any>({});
  const { getFamilyId } = useAuth();
  const { updateProduct } = useProducts();
  const [ count, setCount ] = useState(0);

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


  const handleUpdateProduct = async () => {
    const dateNow = new Date();
    if (_nameValue != "") {
      defaultProductValue.name = _nameValue
    }
    if (_typeValue != "") {
      defaultProductValue.type = _typeValue
    }
    if (_validityValue != "") {
      defaultProductValue.validity = _validityValue
    }
    if (_unitMeasureValue != "") {
      defaultProductValue.unitMeasure = _unitMeasureValue
    }
    if (_costValue != "") {
      defaultProductValue.cost = _costValue
    }
    if (amountValue != "") {
      defaultProductValue.amount = amountValue
    }
console.log(validity)
    if (validity.charAt(2) == "/") {
      const [day, month, year] = validity.split("/");
      const dateValidity = new Date(+year, +month - 1, +day);

      if (dateValidity > dateNow) {
        setExpiryProductValue(false);
        defaultProductValue.validity = dateValidity;
      } else {
        setExpiryProductValue(true);
        defaultProductValue.validity = dateValidity;
      }
    }
    if (new Date(validity) > dateNow) {
      setExpiryProductValue(false);
      defaultProductValue.validity = new Date(validity);
    } else {
      setExpiryProductValue(true);
      defaultProductValue.validity = new Date(validity);
    }
    await updateProduct({
      id: defaultProductValue.id,
      name:defaultProductValue.name,
      amount: parseInt(defaultProductValue.amount),
      category: _categoryValue,
      cost:defaultProductValue.cost,
      expiryProduct:defaultProductValue.expiryProduct,
      familyId:defaultProductValue.familyId,
      type:defaultProductValue.type,
      unitMeasure:defaultProductValue.unitMeasure,
      validity:defaultProductValue.validity,
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
            id="name"
              type="text"
              label="Nome do Produto"
              defaultValue={defaultProductValue.name}
              color="gray"
              size="lg"
              width={130}
              onChange={(e) => setNameValue(e.target.value)}
            />

            <Input
            id="type"
              type="text"
              label="Tipo"
              defaultValue={defaultProductValue.type}
              color="gray"
              size="lg"
              width={130}
              onChange={(e) => setTypeValue(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Input
            id="validate"
              type="text"
              label="Validade"
              defaultValue={defaultProductValue.validity}
              color="gray"
              size="lg"
              width={130}
              onChange={(e) => setValidityValue(e.target.value)}
            />
            <Select label="Unidadede Medida" color="gray" className="text-black" id="measure">
            <Option onClick={() => setUnitMeasureValue("Copos")}>Copos</Option>
            <Option onClick={() => setUnitMeasureValue("Colher de sopa")}>Colher de sopa</Option>
            <Option onClick={() => setUnitMeasureValue("Colher de chá")}>Colher de chá</Option>
            <Option onClick={() => setUnitMeasureValue("Fatias")}>Fatias</Option>
            <Option onClick={() => setUnitMeasureValue("Gramas")}>Gramas</Option>
            <Option onClick={() => setUnitMeasureValue("Litros")}>Litros</Option>
            <Option onClick={() => setUnitMeasureValue("Miligramas")}>Miligramas</Option>
            <Option onClick={() => setUnitMeasureValue("Mililitros")}>Mililitros</Option>
            <Option onClick={() => setUnitMeasureValue("Pitada")}>Pitada</Option>
            <Option onClick={() => setUnitMeasureValue("Quilogramas")}>Quilogramas</Option>
            <Option onClick={() => setUnitMeasureValue("Xícaras")}>Xícaras</Option>
            <Option onClick={() => setUnitMeasureValue("Unidades")}>Unidades</Option>
          </Select>
          </div>

          <div className="flex gap-2">
            <Input
            id="cost"
              type="text"
              label="Custo"
              color="gray"
              defaultValue={defaultProductValue.cost}
              size="lg"
              width={130}
              // icon={<LockKey />}
              onChange={(e) => setCostValue(e.target.value)}
            />
            <Input
            id="quantity"
              type="text"
              label="Quantidade"
              color="gray"
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
            id="category"
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
          id="editProduct"
        >
          <span>Confirmar</span>
        </button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditCard;
