import { ReactNode, createContext, useContext, useState } from "react";
import { useAuth } from "../Auth";
import { AxiosResponse } from "axios";
import { IProduct } from "../../types";
import { ProductRequest } from "../../models";

interface IProductsProviderProps {
  children: ReactNode;
}

interface IProductsProviderData {
  findProductsByFamily: () => void;
  createProduct: (product: ProductRequest) => void;
  updateProduct: (product: ProductRequest) => void;
  deleteProduct: (id: string) => void;
  products: any[];
  isLoadingProducts: boolean;
}

export const ProductsContext = createContext<IProductsProviderData>(
  {} as IProductsProviderData
);

export const ProductsProvider = ({ children }: IProductsProviderProps) => {
  const { api, getFamilyId } = useAuth();

  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);

  const findProductsByFamily = async () => {
    setIsLoadingProducts(true);
    try {
      const { data }: AxiosResponse = await api.get("products", {
        params: {
          familyId: getFamilyId(),
        },
      });

      setProducts(data);
      setIsLoadingProducts(false);
    } catch (error) {
      console.error(error);
      setIsLoadingProducts(false);
    }
  };

  const createProduct = async (request: ProductRequest) => {
    setIsLoadingProducts(true);

    try {
      await api.post("products", request);

      findProductsByFamily();
      setIsLoadingProducts(false);
    } catch (error) {
      console.error(error);
      setIsLoadingProducts(false);
    }
  };

  const updateProduct = async (request: ProductRequest) => {
    setIsLoadingProducts(true);

    try {
      await api.put(`products/${request.id}`, request);

      findProductsByFamily();
      setIsLoadingProducts(false);
    } catch (error) {
      console.error(error);
      setIsLoadingProducts(false);
    }
  };

  const deleteProduct = async (id: string) => {
    setIsLoadingProducts(true);
    try {
      await api.delete(`products/${id}`);
      findProductsByFamily();
      setIsLoadingProducts(false);
    } catch (error) {
      console.error(error);
      setIsLoadingProducts(false);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        findProductsByFamily,
        createProduct,
        updateProduct,
        deleteProduct,
        products,
        isLoadingProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
