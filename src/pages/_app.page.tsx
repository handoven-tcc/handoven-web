import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { AuthContextProvider } from '../contexts/AuthContext'
import Script from 'next/script'
import { ProductContextProvider } from '../contexts/ProductsContext'
import { PlateContextProvider } from '../contexts/PlateContext'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
      <AuthContextProvider>
        <ProductContextProvider>
        <PlateContextProvider>
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
        </PlateContextProvider>
        </ProductContextProvider>
      </AuthContextProvider>
    )
}
