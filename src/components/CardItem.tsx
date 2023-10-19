import { Pen, Trash } from "phosphor-react";
import { Button, Card, CardBody, CardFooter } from "@material-tailwind/react";
import { useContextSelector } from "use-context-selector";
import { IProduct, ProductContext } from "../contexts/ProductsContext";
import { getCookie } from "cookies-next";
import { useEffect } from "react";

interface CardProps {
  unitMeasure: string;
  type: string;
  name: string;
  validity: string;
  expiryProduct: boolean;
  category: number;
  cost: string;
  amount: number;
  id: string;
  openEdit: boolean;
  handleOpenEdit: (req: IProduct) => void;
}

enum ColorCategory {
  "blue-500",
  // @ts-ignore
  "lime-500",
  // @ts-ignore
  "gray-500",
  // @ts-ignore
  "purple-500",
  "green-500",
  // @ts-ignore
  "gray-500",
  // @ts-ignore
  "gray-500",
  "yellow-500",
  // @ts-ignore
  "lime-500",
  "orange-500",
  // @ts-ignore
  "violet-500",
  // @ts-ignore
  "sky-500",
  // @ts-ignore
  "indigo-500",
  // @ts-ignore
  "indigo-500",
  // @ts-ignore
  "indigo-500",
  // @ts-ignore
  "purple-500",
  // @ts-ignore
  "fuchsia-500",
  "pink-500",
  // @ts-ignore
  "rose-500",
  // @ts-ignore
  "fuchsia-500",
  "cyan-500",
  // @ts-ignore
  "violet-500",
}

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

export function CardItem({
  unitMeasure,
  type,
  name,
  validity,
  expiryProduct,
  category,
  cost,
  amount,
  id,
  openEdit,
  handleOpenEdit,
}: CardProps) {
  const { deleteProduct } = useContextSelector(ProductContext, (context) => {
    return context;
  });

  const familyId = getCookie("familyId") ?? "";

  function ConvertDate(date: string) {
    const data = new Date(date);
    return data.toLocaleDateString("pt-BR");
  }

  async function HandleDeleteProduct() {
    await deleteProduct(id, familyId);
  }

  return (
    <div>
      <Card
        className={`w-74 h-full border border-gray-100 hover:border-${ColorCategory[category]} shadow-md hover:shadow-${ColorCategory[category]} duration-300`}
        variant="filled"
        color="white"
      >
        <CardBody className="text-center flex flex-col">
          <div className="w-full h-16 ">
            {expiryProduct ? (
              <h2 className="text-default text-xl text-red-500 font-bold">
                {name} (vencido)
              </h2>
            ) : (
              <h2 className="text-default text-xl text-black font-bold">
                {name}
              </h2>
            )}
          </div>
          <div className="flex items-start justify-start py-2 w-full gap-2">
            <div className={`p-2 bg-${ColorCategory[category]} rounded-md`}>
              <h3 className="font-bold text-white text-sm">
                {Category[category]}
              </h3>
            </div>

            <div className={`p-2 bg-${ColorCategory[category]} rounded-md`}>
              <h3 className="font-bold text-white text-sm">{type}</h3>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-col items-start">
              <span>Valor:</span>
              <strong>R$ {cost}</strong>
            </div>
            <div className="flex flex-col items-end">
              <span>Quantidade</span>
              <strong>
                {amount} {unitMeasure}
              </strong>
            </div>
          </div>

          <div className="flex flex-col items-start pt-4 mb-[-12px]">
            <span>Data de validade</span>

            <div>
              <strong>{ConvertDate(validity)}</strong>
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex mt-[-12px] h-full items-end">
          {expiryProduct ? (
            <div className="flex w-full justify-between ">
              <div className="flex ">
                <Button
                  color="orange"
                  className="p-3 rounded-md flex justify-center items-center "
                  onClick={() =>
                    handleOpenEdit({
                      id: id,
                      name: name,
                      type: type,
                      validity: validity,
                      category: category,
                      cost: cost,
                      amount: amount,
                      unitMeasure: unitMeasure,
                      familyId: familyId,
                      expiryProduct: expiryProduct,
                    })
                  }
                >
                  <Pen size={16} color="#fff" weight="bold" />
                </Button>
              </div>
              <div className="flex">
                <Button
                  color="red"
                  className="p-3 rounded-md flex justify-center items-center"
                  onClick={HandleDeleteProduct}
                >
                  <Trash size={16} color="#fff" weight="bold" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex w-full justify-between ">
              <div className="flex ">
                <Button
                  color="orange"
                  className="p-3 rounded-md flex justify-center items-center "
                  onClick={async () =>
                    await handleOpenEdit({
                      id: id,
                      name: name,
                      type: type,
                      validity: validity,
                      category: category,
                      cost: cost,
                      amount: amount,
                      unitMeasure: unitMeasure,
                      familyId: familyId,
                      expiryProduct: expiryProduct,
                    })
                  }
                >
                  <Pen size={16} color="#fff" weight="bold" />
                </Button>
              </div>

              <div className="flex">
                <Button
                  className="p-3 rounded-md flex justify-center items-center transition duration-300"
                  color="red"
                  onClick={HandleDeleteProduct}
                >
                  <Trash size={16} color="#fff" weight="bold" />
                </Button>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
