import Head from 'next/head'
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { axiosPublic } from '../../axios';
import { api_routes } from '@/helper/routes';
import { AboutSectionType } from '@/helper/types';

type ServerSideProps = {
  about: AboutSectionType;
}

export const getServerSideProps: GetServerSideProps<{
  repo: ServerSideProps
}> = async () => {
  const aboutResponse = await axiosPublic.get(api_routes.about_section);
  return { props: { repo: {
    about: aboutResponse.data.about,
  } } }
}

export default function About({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Parcelcounter - About Us</title>
        <meta name="description" content="Parcelcounter, headquartered in Bengaluru, is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware." />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=no" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Hero name='About Us' />
      <AboutSection  {...repo.about} />
      {/* <section className="about-choose pb-5">
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
      </section> */}
    </>
  )
}
