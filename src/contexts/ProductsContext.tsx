import { ReactNode, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import axios from "axios";
import { AuthContext } from "./AuthContext";

interface ProductContextProviderProps {
  children: ReactNode;
}

export interface IProduct {
  id?: string;
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

interface ProductContextProps {
  products: any[];
  findProductsByFamily: (family: string) => Promise<void>;
  deleteProduct: (id: string, familyId: string) => Promise<void>;
  createProduct: (product: IProduct) => Promise<void>;
  updateProduct: (product: IProduct) => Promise<void>;
}

export const ProductContext = createContext({} as ProductContextProps);

export function ProductContextProvider({
  children,
}: ProductContextProviderProps) {
  const [products, setProducts] = useState<any[]>([]);

  async function findProductsByFamily(family: string): Promise<void> {
    const res: any = await axios.get(
      "https://handovenapi.onrender.com/products?familyId=" + family,
      {
        headers: {
          "X-HandOven-Family": family,
          "X-HandOven-User": "111111111111111111111111",
        },
      }
    );
    if (res) {
      setProducts(res.data);
    }
  }

  async function deleteProduct(id: string, familyId: string): Promise<void> {
    try {
      const res: any = await axios.delete(
        "https://handovenapi.onrender.com/products/" + id,
        {
          headers: {
            "X-HandOven-Family": familyId,
            "X-HandOven-User": "111111111111111111111111",
          },
        }
      );
      findProductsByFamily(familyId);
    } catch (err) {
      console.log(err);
    }
  }

  async function createProduct(req: IProduct) {
    try {
      const res: any = await axios.post(
        "https://handovenapi.onrender.com/products",
        {
          name: req.name,
          type: req.type,
          validity: req.validity,
          category: req.category,
          cost: req.cost,
          amount: req.amount,
          unitMeasure: req.unitMeasure,
          familyId: req.familyId,
          expiryProduct: req.expiryProduct,
        },
        {
          headers: {
            "X-HandOven-Family": req.familyId,
            "X-HandOven-User": "111111111111111111111111",
          },
        }
      );

      findProductsByFamily(req.familyId);
    } catch (err) {
      console.log(err);
    }
  }

  async function updateProduct(req: IProduct) {
    const res: any = await axios.put(
      `https://handovenapi.onrender.com/products/${req.id}`,
      {
        name: req.name,
        type: req.type,
        validity: req.validity,
        category: req.category,
        cost: req.cost,
        amount: req.amount,
        unitMeasure: req.unitMeasure,
        familyId: req.familyId,
        expiryProduct: req.expiryProduct,
      },
      {
        headers: {
          "X-HandOven-Family": req.familyId,
          "X-HandOven-User": "111111111111111111111111",
        },
      }
    );
    findProductsByFamily(req.familyId);
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        findProductsByFamily,
        deleteProduct,
        createProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
