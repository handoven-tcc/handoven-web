import { ReactNode } from "react";
import { AuthProvider } from "./Auth";
import { PlatesProvider } from "./Plates";
import { ProductsProvider } from "./Products";

interface IProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: IProvidersProps) => {
  return (
    <AuthProvider>
      <ProductsProvider>
        <PlatesProvider>{children}</PlatesProvider>
      </ProductsProvider>
    </AuthProvider>
  );
};

export default Providers;
