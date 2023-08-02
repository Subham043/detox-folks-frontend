import Head from 'next/head'
import Image from 'next/image'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';


export default function About() {
  return (
    <>
      <Head>
        <title>Detox-Folks</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <Header />
      <Hero name='About Us' />
      <AboutSection />
      <section className="about-choose pb-5">
        <div className="container">
          <div className="row">
            <div className="col-11 col-md-9 col-lg-7 col-xl-6 mx-auto">
              <div className="section-heading">
                <h2>Why People Choose Their Daily Organic Life With Us</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="choose-card my-4">
                <div className="choose-icon"><i className="icofont-fruits"></i></div>
                <div className="choose-text">
                  <h4>100% fresh organic food</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing tempora
                    pariatur provident animi error dignissimo cumque minus facere
                    dolores cupiditate debitis
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="choose-card my-4">
                <div className="choose-icon">
                  <i className="icofont-vehicle-delivery-van"></i>
                </div>
                <div className="choose-text">
                  <h4>Delivery within one hour</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing tempora
                    pariatur provident animi error dignissimo cumque minus facere
                    dolores cupiditate debitis
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="choose-card my-4">
                <div className="choose-icon"><i className="icofont-loop"></i></div>
                <div className="choose-text">
                  <h4>quickly return policy</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing tempora
                    pariatur provident animi error dignissimo cumque minus facere
                    dolores cupiditate debitis
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="choose-card my-4">
                <div className="choose-icon"><i className="icofont-support"></i></div>
                <div className="choose-text">
                  <h4>instant support team</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing tempora
                    pariatur provident animi error dignissimo cumque minus facere
                    dolores cupiditate debitis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
