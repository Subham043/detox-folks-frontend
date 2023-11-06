import Link from "next/link";
import { FC, useContext } from "react";
import useSWR from 'swr'
import { api_routes } from "@/helper/routes";
import { LegalResponseType } from "@/helper/types";
import Policy from "./Policy";
import { WebsiteContext } from "@/context/WebsiteProvider";

const Footer: FC = () => {
  const { data, isLoading } = useSWR<LegalResponseType>(api_routes.legal);
  const { website, websiteLoading } = useContext(WebsiteContext);

  return <>
    <Policy />
    <footer className="footer-part">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-4 col-xl-4">
            <div className="footer-widget">
              <Link className="footer-logo" href="/"
              ><img src="/images/logo.png" alt="logo"
                /></Link>
              <ul className="footer-social text-center">
                <li><a className="icofont-facebook" target="_blank" href={website.facebook}></a></li>
                <li><a className="icofont-instagram" target="_blank" href={website.instagram}></a></li>
                <li><a className="icofont-linkedin" target="_blank" href={website.linkedin}></a></li>
                <li><a className="fab fa-youtube" target="_blank" href={website.youtube}></a></li>
              </ul>
              <img src="/images/payments.webp" className="payment-img" />
            </div>
          </div>
          <div className="col-sm-12 col-lg-4 col-xl-4">
            <div className="footer-widget">
              <div className="footer-links">
                <ul>
                  <h3 className="footer-title">quick Links</h3>
                  <li><Link href="/" target="_blank">Home</Link></li>
                  <li><Link href="/about" target="_blank">About Us</Link></li>
                  <li><Link href="/category" target="_blank">Products</Link></li>
                  <li><Link href="/blogs" target="_blank">Blogs</Link></li>
                  <li><Link href="/contact" target="_blank">Contact Us</Link></li>
                </ul>
                <ul>
                  <h3 className="footer-title">legal Links</h3>
                  {
                    isLoading && <>
                    <li><div className="blog-heading-loading"></div></li>
                    <li><div className="blog-heading-loading"></div></li>
                    <li><div className="blog-heading-loading"></div></li>
                    <li><div className="blog-heading-loading"></div></li>
                    </>
                  }
                  {
                    data?.legal.map((item, i)=><li key={i}><Link href={`/legal/${item.slug}`} target="_blank">{item.page_name}</Link></li>)
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-3 col-xl-3">
            <div className="footer-widget contact">
              <h3 className="footer-title">contact us</h3>
              <ul className="footer-contact">
                <li>
                  <i className="icofont-ui-email"></i>
                  {websiteLoading ? <div className="blog-heading-loading"></div>: <p><span>{website.email}</span></p>}
                </li>
                <li>
                  <i className="icofont-ui-touch-phone"></i>
                  {websiteLoading ? <div className="blog-heading-loading"></div>: <p><span>{website.phone}</span></p>}
                </li>
                <li>
                  <i className="icofont-location-pin"></i>
                  {websiteLoading ? <div className="blog-heading-loading"></div>: <p>{website.address}</p>}
                </li>
              </ul>
              <div className="footer-app mt-3">
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
                &copy; All Copyrights Reserved by <Link href="/">{website.website_name}</Link>
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