import { useEffect, useState } from "react";
import { Plus } from "phosphor-react";
import Header from "../../components/Header";
import { useProducts } from "../../providers/Products";
import { IProduct } from "../../types";
import { useAuth } from "../../providers/Auth";
import CardItem from "./Components/CardItem";
import EditCard from "./Components/EditCard";
import CreateCard from "./Components/CreateCard";

const Products = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(-1);
  const [type, setType] = useState("");
  const [validity, setValidity] = useState("");
  const [unitMeasure, setUnitMeasure] = useState("");
  const [id, setId] = useState("");
  const [cost, setCost] = useState("");
  const [amount, setAmount] = useState("");
  const [expiryProduct, setExpiryProduct] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { getFamilyId } = useAuth();
  const { products, findProductsByFamily } = useProducts();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };

  const handleEditInformation = async ({
    amount,
    category,
    cost,
    expiryProduct,
    name,
    type,
    unitMeasure,
    validity,
    id,
  }: IProduct) => {
    setAmount(amount.toString());
    setCategory(category);
    setCost(cost);
    setExpiryProduct(expiryProduct);
    setName(name);
    setType(type);
    setId(id ?? "");
    setUnitMeasure(unitMeasure);
    setValidity(validity);
  };

  const addProductInField = (): IProduct => {
    const familyId = getFamilyId();
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
  };

  useEffect(() => {
    (async () => await findProductsByFamily())();
  }, []);

  return (
    <div>
    <Header />
    <div className="flex item-center justify-center gap-4 p-6">
      <div className="grid grid-cols-5 gap-2">
        {products.length > 0 ? (
          products.map((product) => (
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
    <div className="top-2 absolute right-1/3">
      <button
        className="p-3 bg-red-500 text-white rounded-md flex hover:bg-red-700 items-center gap-1"
        onClick={handleOpen}
        id="criar"
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
};

export default Products;
