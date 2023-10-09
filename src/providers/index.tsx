import { ReactNode } from "react";
import { AuthProvider } from "./Auth";

interface IProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: IProvidersProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Providers;
