import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-tabs/style/react-tabs.css';
import 'react-modern-drawer/dist/index.css'
import 'react-toastify/dist/ReactToastify.css';
import { Rubik } from 'next/font/google'
import '../styles/index.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';
import {fetcher} from '../../axios';
import { ToastContainer } from 'react-toastify';
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import WishlistProvider from "../context/WishlistProvider";
import CartProvider from "../context/CartProvider";
import LoginModalProvider from "../context/LoginModalProvider";
import WebsiteProvider from "../context/WebsiteProvider";

const roboto = Rubik({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return <SWRConfig
  value={{
   fetcher
  }}
 >
  <SessionProvider session={session}>
    <main className={roboto.className}>
      <WebsiteProvider>
        <LoginModalProvider>
          <CartProvider>
            <WishlistProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
              <ToastContainer />
            </WishlistProvider>
          </CartProvider>
        </LoginModalProvider>
      </WebsiteProvider>
    </main>
  </SessionProvider>
 </SWRConfig>
}
