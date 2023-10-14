import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { Header } from "../../../components/Header";
import { CardItem } from "../../../components/CardItem";
import { useEffect, useState } from "react";
import { ProductContext } from "../../../contexts/ProductsContext";
import { useContextSelector } from "use-context-selector";
import { AuthContext } from "../../../contexts/AuthContext";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { INext } from "../../home/index.page";
import { ArrowCircleRight, ArrowFatRight, Plus } from "phosphor-react";
import CreateCard from "./components/createCard/index.page";
import EditCard from "./components/editCard/index.page";
interface IProduct {
  id: string;
  name: string;
  type: string;
  validity: string;
  category: number;
  cost: string;
  amount: number;
  unitMeasure: string;
  familyId: string;
  expiryProduct: boolean;
}

export default function EstoquePage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(-1);
  const [type, setType] = useState("");
  const [validity, setValidity] = useState("");
  const [unitMeasure, setUnitMeasure] = useState("");
  const [ id, setId ] = useState("");
  const [cost, setCost] = useState("");
  const [amount, setAmount] = useState("");
  const [expiryProduct, setExpiryProduct] = useState(false);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { products, findProductsByFamily } = useContextSelector(
    ProductContext,
    (context) => {
      return context;
    }
  );

  const familyId = getCookie("familyId") ?? "";

  function handleOpen() {
    setOpen(!open);
  }

  function handleOpenEdit() {
    setOpenEdit(!openEdit);
  }

  async function handleEditInformation({
    amount,
    category,
    cost,
    expiryProduct,
    name,
    type,
    unitMeasure,
    validity,
    id,
  }: IProduct) {
    setAmount(amount.toString());
    setCategory(category);
    setCost(cost);
    setExpiryProduct(expiryProduct);
    setName(name);
    setType(type);
    setId(id)
    setUnitMeasure(unitMeasure);
    setValidity(validity);
  }
    
  function addProductInField(): IProduct {
    const amountInt = parseInt(amount) 
    return {
      id,
      name,
      type,
      validity,
      category,
      cost,
      amount:amountInt,
      unitMeasure,
      familyId,
      expiryProduct
    }
  }



  async function findProducts(family: string): Promise<void> {
    try {
        await findProductsByFamily(family);
      }
     catch (err) {
      console.log("find" + err);
    }
  }

  useEffect(() => {
    findProducts(familyId);
  });

  return (
    <div>
      <Header />
      <div className="flex item-center justify-center gap-4 p-6">
        <div className="grid grid-cols-5 gap-2">
          {products.length > 0 ? (
            products.map((product) => (
              // eslint-disable-next-line react/jsx-key
              <CardItem
                unitMeasure={product.unitMeasure}
                type={product.type}
                name={product.name}
                validity={product.validity}
                expiryProduct={product.expiryProduct}
                category={product.category}
                cost={product.cost}
                amount={product.amount}
                id={product.id}
                openEdit={openEdit}
                handleOpenEdit={handleEditInformation}
              />
            ))
          ) : (
            <span>não ha produtos em seu estoque</span>
          )}
        </div>
      </div>
      <div className="left-2 absolute bottom-2">
        <button
          className="p-3 bg-green-500 text-white rounded-md flex items-center gap-1"
          onClick={handleOpen}
        >
          Criar <Plus size={18} color="#fff" weight="bold" />
        </button>
      </div>
      <CreateCard open={open} handleOpen={handleOpen} />
      <EditCard
        amount={parseFloat(amount)}
        category={category}
        cost={cost}
        open={openEdit}
        handleOpen={handleOpenEdit}
        expiryProduct={expiryProduct}
        name={name}
        id={id}
        type={type}
        unitMeasure={unitMeasure}
        validity={validity}
        setField={addProductInField}
      />
    </div>
  );
}

export async function getServerSideProps({ req, res }: INext) {
  const token = getCookie("token", { req, res });
  const familyId = getCookie("familyId", { req, res });
  if (token == undefined || familyId == undefined) {
    res.writeHead(302, { Location: "/login" });
    res.end();
    return { props: {} };
  }
  return { props: {} };
}
