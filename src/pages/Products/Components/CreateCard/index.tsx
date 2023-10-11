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
import { useState } from "react";
import { useAuth } from "../../../../providers/Auth";
import { useProducts } from "../../../../providers/Products";

interface createCardProps {
  open: boolean;
  handleOpen: () => void;
}

const CreateCard = (req: createCardProps) => {
  const { getFamilyId } = useAuth();
  const { createProduct } = useProducts();

  const [name, setName] = useState("");
  const [category, setCategory] = useState(-1);
  const [type, setType] = useState("");
  const [validity, setValidity] = useState("");
  const [unitMeasure, setUnitMeasure] = useState("");
  const [cost, setCost] = useState("");
  const [amount, setAmount] = useState("");
  const [expiryProduct, setExpiryProduct] = useState(false);

  async function handleCreateProduct() {
    req.handleOpen();

    if (
      name != "" &&
      category != -1 &&
      type != "" &&
      validity != "" &&
      unitMeasure != "" &&
      cost != "" &&
      amount != ""
    ) {
      const [day, month, year] = validity.split("/");
      let dateValidity = new Date(+year, +month - 1, +day);
      let date = dateValidity + "";
      let dateNow = new Date();

      if (dateValidity > dateNow) {
        setExpiryProduct(false);
      } else {
        setExpiryProduct(true);
      }
      const familyId = getFamilyId();
      await createProduct({
        name,
        amount: parseInt(amount),
        category,
        cost,
        expiryProduct,
        familyId,
        type,
        unitMeasure,
        validity: date,
      });
    }
  }

  return (
    <Dialog open={req.open} handler={req.handleOpen}>
      <DialogHeader>Crie seu Produto.</DialogHeader>
      <DialogBody divider>
        <div className="flex gap-2 flex-col ">
          <div className="flex gap-2">
            <Input
              type="text"
              label="Nome do Produto"
              color="black"
              size="lg"
              width={130}
              onChange={(e) => setName(e.target.value)}
              crossOrigin={undefined}
            />
            <Input
              type="text"
              label="Tipo"
              color="black"
              size="lg"
              width={130}
              onChange={(e) => setType(e.target.value)}
              crossOrigin={undefined}
            />
          </div>

          <div className="flex gap-2">
            <Input
              type="text"
              label="Validade"
              color="black"
              size="lg"
              width={130}
              onChange={(e) => setValidity(e.target.value)}
              crossOrigin={undefined}
            />
            <Input
              type="text"
              label="Unidade de Medida"
              color="black"
              size="lg"
              width={130}
              onChange={(e) => setUnitMeasure(e.target.value)}
              crossOrigin={undefined}
            />
          </div>

          <div className="flex gap-2">
            <Input
              type="text"
              label="Custo"
              color="black"
              size="lg"
              width={130}
              // icon={<LockKey />}
              onChange={(e) => setCost(e.target.value)}
              crossOrigin={undefined}
            />
            <Input
              type="text"
              label="Quantidade"
              color="black"
              size="lg"
              width={130}
              // icon={<LockKey />}
              onChange={(e) => setAmount(e.target.value)}
              crossOrigin={undefined}
            />
          </div>

          <Select label="Categoria" color="gray" className="text-black">
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
          onClick={handleCreateProduct}
        >
          <span>Confirmar</span>
        </button>
      </DialogFooter>
    </Dialog>
  );
};
export default CreateCard;
