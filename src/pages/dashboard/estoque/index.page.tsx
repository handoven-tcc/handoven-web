import { Header } from "../../../components/Header";
import { CardItem } from "../../../components/CardItem";
import { useEffect, useState } from "react";
import { IProduct, ProductContext } from "../../../contexts/ProductsContext";
import { useContextSelector } from "use-context-selector";
import { getCookie } from "cookies-next";
import { Plus } from "phosphor-react";
import CreateCard from "./components/createCard/index.page";
import EditCard from "./components/editCard/index.page";
import { INextApi } from "../../../types";

export default function EstoquePage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(-1);
  const [type, setType] = useState("");
  const [validity, setValidity] = useState("");
  const [unitMeasure, setUnitMeasure] = useState("");
  const [id, setId] = useState("");
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

  function handleEditInformation(req: IProduct) {
    setAmount(req.amount.toString());
    setCategory(req.category);
    setCost(req.cost);
    setExpiryProduct(req.expiryProduct);
    setName(req.name);
    setType(req.type);
    setId(req.id ?? "");
    setUnitMeasure(req.unitMeasure);
    setValidity(req.validity);
  }

  function addProductInField(): IProduct {
    const amountInt = parseInt(amount);
    return {
      id,
      name,
      type,
      validity,
      category,
      cost,
      amount: amountInt,
      unitMeasure,
      familyId,
      expiryProduct,
    };
  }

  async function findProducts(family: string): Promise<void> {
    try {
      if (count == 0) {
        await findProductsByFamily(family);
        setCount(count + 1);
      }
    } catch (err) {
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
            products.map((product, index) => (
              <CardItem
                key={index}
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

export async function getServerSideProps({ req, res }: INextApi) {
  const token = getCookie("token", { req, res });
  const familyId = getCookie("familyId", { req, res });
  if (token == undefined || familyId == undefined) {
    res.writeHead(302, { Location: "/login" });
    res.end();
    return { props: {} };
  }
  return { props: {} };
}
