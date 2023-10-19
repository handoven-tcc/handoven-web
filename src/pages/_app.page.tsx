import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { AuthContextProvider } from "../contexts/AuthContext";
import { ProductContextProvider } from "../contexts/ProductsContext";
import { PlateContextProvider } from "../contexts/PlateContext";
import { FavoriteContextProvider } from "../contexts/FavoriteCotext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <PlateContextProvider>
          <FavoriteContextProvider>
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
          </FavoriteContextProvider>
        </PlateContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  );
}
