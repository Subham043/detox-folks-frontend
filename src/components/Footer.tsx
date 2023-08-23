import Link from "next/link";
import { FC } from "react";
import useSWR from 'swr'
import { api_routes } from "@/helper/routes";
import { LegalResponseType } from "@/helper/types";
import Policy from "./Policy";

const Footer: FC = () => {
  const { data, isLoading } = useSWR<LegalResponseType>(api_routes.legal);

  return <>
    <Policy />
    <footer className="footer-part">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-xl-3">
            <div className="footer-widget">
              <Link className="footer-logo" href="/"
              ><img src="/images/logo.png" alt="logo"
                /></Link>
              <ul className="footer-social">
                <li><a className="icofont-facebook" href="#"></a></li>
                <li><a className="icofont-twitter" href="#"></a></li>
                <li><a className="icofont-linkedin" href="#"></a></li>
                <li><a className="icofont-instagram" href="#"></a></li>
                <li><a className="icofont-pinterest" href="#"></a></li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <div className="footer-widget contact">
              <h3 className="footer-title">contact us</h3>
              <ul className="footer-contact">
                <li>
                  <i className="icofont-ui-email"></i>
                  <p>
                    <span>support@example.com</span>
                  </p>
                </li>
                <li>
                  <i className="icofont-ui-touch-phone"></i>
                  <p>
                    <span>+120 279 532 13</span>
                  </p>
                </li>
                <li>
                  <i className="icofont-location-pin"></i>
                  <p>1Hd- 50, 010 Avenue, NY 90001 United States</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-xl-4">
            <div className="footer-widget">
              <h3 className="footer-title">quick Links</h3>
              <div className="footer-links">
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/about">About Us</Link></li>
                  <li><Link href="/products">Products</Link></li>
                  <li><Link href="/blogs">Blogs</Link></li>
                  <li><Link href="/contact">Contact Us</Link></li>
                </ul>
                <ul>
                  {
                    data?.legal.map((item, i)=><li key={i}><Link href={`/legal/${item.slug}`}>{item.page_name}</Link></li>)
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-2">
            <div className="footer-widget">
              <h3 className="footer-title">Download App</h3>
              <p className="footer-desc">
                Lorem ipsum dolor sit amet tenetur dignissimos ipsum eligendi
                autem obcaecati minus ducimus totam reprehenderit
                exercitationem!
              </p>
              <div className="footer-app">
                <a href="#"
                ><img src="/images/google-store.png" alt="google" /></a
                ><a href="#"><img src="/images/app-store.png" alt="app" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="footer-bottom justify-content-center">
              <p className="footer-copytext">
                &copy; All Copyrights Reserved by <Link href="/">DetoxFolks</Link>
              </p>
              {/* <div className="footer-card">
                <a href="#"
                ><img src="/images/payment/jpg/01.jpg" alt="payment" /></a
                ><a href="#"
                ><img src="/images/payment/jpg/02.jpg" alt="payment" /></a
                ><a href="#"
                ><img src="/images/payment/jpg/03.jpg" alt="payment" /></a
                ><a href="#"
                ><img src="/images/payment/jpg/04.jpg" alt="payment"
                  /></a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  </>
}

export default Footer;