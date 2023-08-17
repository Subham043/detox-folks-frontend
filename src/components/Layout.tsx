import Footer from "./Footer"
import Header from "./Header"

export default function Layout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        <Header />
        {children}
        <Footer />
      </>
    )
}