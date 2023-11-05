import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-tabs/style/react-tabs.css';
import 'react-modern-drawer/dist/index.css'
import 'react-toastify/dist/ReactToastify.css';
import "nprogress/nprogress.css";
import { Rubik } from 'next/font/google'
import '../styles/index.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
// import WishlistProvider from "../context/WishlistProvider";
import LoginModalProvider from "../context/LoginModalProvider";
import WebsiteProvider from "../context/WebsiteProvider";
import dynamic from "next/dynamic";
import CartProvider from "@/context/CartProvider";
import SwrLayout from "@/components/SwrLayout";

const roboto = Rubik({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const TopProgressBar = dynamic(
  () => {
    return import("@/components/TopProgressBar");
  },
  { ssr: false },
);

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return <>
  <TopProgressBar />
  <SessionProvider session={session}>
    <SwrLayout>
      <main className={roboto.className}>
        <LoginModalProvider>
          <CartProvider>
            <WebsiteProvider>
              {/* <WishlistProvider> */}
                <Layout>
                  <Component {...pageProps} />
                </Layout>
                <ToastContainer />
              {/* </WishlistProvider> */}
              </WebsiteProvider>
          </CartProvider>
        </LoginModalProvider>
      </main>
    </SwrLayout>
  </SessionProvider>
 </>
}
