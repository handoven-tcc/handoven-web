//@ts-ignore
import FileBase64 from "react-file-base64";
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
import { getCookie } from "cookies-next";
import { useContextSelector } from "use-context-selector";
import {
  ISection,
  PlateContext,
  PlateRequest,
} from "../../../../../contexts/PlateContext";

interface ICreatePlateProps {
  open: boolean;
  handleOpen: () => void;
}

export default function CreatePlate(req: ICreatePlateProps) {
  const [name, setName] = useState("");
  const [image, setImage] = useState<any>();
  const [category, setCategory] = useState<number>(0);
  const [favorited, setFavorited] = useState<boolean>(false);
  // section
  const [ingredients_name] = useState<string>("");
  const [ingredients_quantity] = useState<number>();
  const [ingredients_unit_measure] = useState<string>("");
  const [ingredients_category] = useState<number>();
  const [ingredients_notes] = useState<string>("");
  const [prepare_mode] = useState<any[]>();
  // extras
  const [prepare_time] = useState<string>("");
  const [cooler_time] = useState<string>("");
  const [income] = useState<string>("");

  const { createPlate } = useContextSelector(
    PlateContext,
    (context) => context
  );

  const familyId = getCookie("familyId") ?? "";

  async function handleCreatePlate() {
    req.handleOpen();

    const section: ISection = {
      ingredients: {
        ingredients_name: "",
        ingredients_quantity: 0,
        ingredients_unit_measure: "",
        ingredients_category: 0,
        ingredients_notes: "",
      },
      prepare_mode: [],
      extras: [],
    };

    const request = new PlateRequest(name, image, category, favorited, section);

    await createPlate(request);
  }

  function getFiles(files: any) {
    setImage(files);
  }

  return (
    <Dialog open={req.open} handler={req.handleOpen}>
      <DialogHeader>Crie sua receita.</DialogHeader>
      <DialogBody divider>
        <div className="flex gap-2 flex-col ">
          <div className="flex gap-2">
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }: any) => setImage({ image: base64 })}
              onChange={(e: any) => e.target.files[0]}
            />
            <Input
              type="text"
              label="Nome do Produto"
              color="black"
              size="lg"
              width={130}
              onChange={(e) => setName(e.target.value)}
            />
            {/* <Input
              type="text"
              label="Tipo"
              color="black"
              size="lg"
              width={130}
              onChange={(e) => setType(e.target.value)}
            /> */}
          </div>

          <div className="flex gap-2">
            <Input
              type="text"
              label="Validade"
              color="black"
              size="lg"
              width={130}
              // onChange={(e) => setValidity(e.target.value)}
            />
            <Input
              type="text"
              label="Unidade de Medida"
              color="black"
              size="lg"
              width={130}
              // onChange={(e) => setUnitMeasure(e.target.value)}
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
              // onChange={(e) => setCost(e.target.value)}
            />
            <Input
              type="text"
              label="Quantidade"
              color="black"
              size="lg"
              width={130}
              // icon={<LockKey />}
              // onChange={(e) => setAmount(e.target.value)}
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
          onClick={handleCreatePlate}
        >
          <span>Confirmar</span>
        </button>
      </DialogFooter>
    </Dialog>
  );
}
