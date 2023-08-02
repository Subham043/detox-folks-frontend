import { FC } from "react";

const Footer: FC = () => {
  return <>
    <section className="intro-part">
      <div className="container">
        <div className="row intro-content">
          <div className="col-sm-6 col-lg-3">
            <div className="intro-wrap">
              <div className="intro-icon"><i className="fas fa-truck"></i></div>
              <div className="intro-content">
                <h5>free home delivery</h5>
                <p>Lorem ipsum dolor sit amet adipisicing elit nobis.</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="intro-wrap">
              <div className="intro-icon"><i className="fas fa-sync-alt"></i></div>
              <div className="intro-content">
                <h5>instant return policy</h5>
                <p>Lorem ipsum dolor sit amet adipisicing elit nobis.</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="intro-wrap">
              <div className="intro-icon"><i className="fas fa-headset"></i></div>
              <div className="intro-content">
                <h5>quick support system</h5>
                <p>Lorem ipsum dolor sit amet adipisicing elit nobis.</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="intro-wrap">
              <div className="intro-icon"><i className="fas fa-lock"></i></div>
              <div className="intro-content">
                <h5>secure payment way</h5>
                <p>Lorem ipsum dolor sit amet adipisicing elit nobis.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer className="footer-part">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-xl-3">
            <div className="footer-widget">
              <a className="footer-logo" href="#"
              ><img src="/images/logo.png" alt="logo"
                /></a>
              <p className="footer-desc">
                Adipisci asperiores ipsum ipsa repellat consequatur repudiandae
                quisquam assumenda dolor perspiciatis sit ipsum dolor amet.
              </p>
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
                    <span>support@example.com</span
                    ><span>carrer@example.com</span>
                  </p>
                </li>
                <li>
                  <i className="icofont-ui-touch-phone"></i>
                  <p>
                    <span>+120 279 532 13</span><span>+120 279 532 14</span>
                  </p>
                </li>
                <li>
                  <i className="icofont-location-pin"></i>
                  <p>1Hd- 50, 010 Avenue, NY 90001 United States</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <div className="footer-widget">
              <h3 className="footer-title">quick Links</h3>
              <div className="footer-links">
                <ul>
                  <li><a href="#">My Account</a></li>
                  <li><a href="#">Order History</a></li>
                  <li><a href="#">Order Tracking</a></li>
                  <li><a href="#">Best Seller</a></li>
                  <li><a href="#">New Arrivals</a></li>
                </ul>
                <ul>
                  <li><a href="#">Location</a></li>
                  <li><a href="#">Affiliates</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Carrer</a></li>
                  <li><a href="#">Faq</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
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
            <div className="footer-bottom">
              <p className="footer-copytext">
                &copy; All Copyrights Reserved by <a href="#">Detox-Folks</a>
              </p>
              <div className="footer-card">
                <a href="#"
                ><img src="/images/payment/jpg/01.jpg" alt="payment" /></a
                ><a href="#"
                ><img src="/images/payment/jpg/02.jpg" alt="payment" /></a
                ><a href="#"
                ><img src="/images/payment/jpg/03.jpg" alt="payment" /></a
                ><a href="#"
                ><img src="/images/payment/jpg/04.jpg" alt="payment"
                  /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </>
}

export default Footer;