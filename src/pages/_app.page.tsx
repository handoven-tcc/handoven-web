import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { AuthContextProvider } from '../contexts/AuthContext'
import Script from 'next/script'
import { ProductContextProvider } from '../contexts/ProductsContext'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
      <AuthContextProvider>
        <ProductContextProvider>
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
        </ProductContextProvider>
      </AuthContextProvider>
    )
}
