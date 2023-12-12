import { ReactNode } from "react";
import { AuthProvider } from "./Auth";
import { PlatesProvider } from "./Plates";
import { ProductsProvider } from "./Products";
import { FavoriteProvider } from "./Favorite";
import { AlgorithmProvider } from "./Augorithm";

interface IProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: IProvidersProps) => {
  return (
    <AuthProvider>
      <AlgorithmProvider>
      <ProductsProvider>
        <PlatesProvider>
          <FavoriteProvider>
            {children}
            </FavoriteProvider>
        </PlatesProvider>
      </ProductsProvider>
      </AlgorithmProvider>
    </AuthProvider>
  );
};

export default Providers;
