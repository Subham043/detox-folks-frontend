import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-tabs/style/react-tabs.css';
import 'react-modern-drawer/dist/index.css'
import "@/styles/fonts/flaticon/flaticon.css";
import "@/styles/fonts/icofont/icofont.min.css";
import "@/styles/fonts/fontawesome/fontawesome.min.css";
import '@/styles/bootstrap.min.css'
import '@/styles/main.css'
import '@/styles/index.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
