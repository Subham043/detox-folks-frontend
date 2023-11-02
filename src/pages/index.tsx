import Head from 'next/head'
import Banner from '@/components/Banner';
import PartnerSlider from '@/components/PartnerSlider';
import TestimonialSlider from '@/components/TestimonialSlider';
import BlogSlider from '@/components/BlogSlider';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { axiosPublic } from '../../axios';
import { api_routes } from '@/helper/routes';
import { AboutSectionType, BannerType } from '@/helper/types';
import CategoryMain from '@/components/CategoryMain';
import SpecialProducts from '@/components/SpecialProducts';

type ServerSideProps = {
  banner: BannerType[];
  about: AboutSectionType;
}

export const getServerSideProps: GetServerSideProps<{
  repo: ServerSideProps
}> = async () => {
  const bannerResponse = await axiosPublic.get(api_routes.home_page_banner);
  // const aboutResponse = await axiosPublic.get(api_routes.about_section);
  return { props: { repo: {
    banner: bannerResponse.data.banner,
    // about: aboutResponse.data.about,
    // banner: [],
    about: {
      id: 0,
      slug: '',
      description: '',
      heading: '',
      description_unfiltered: '',
      image: '',
      created_at: '',
      updated_at: '',
    },
  } } }
}

export default function Home({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <>
      <Head>
        <title>Parcelcounter</title>
        <meta name="description" content="Parcelcounter, headquartered in Bengaluru, is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware." />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Banner banner={repo.banner} />
      {/* <AboutSection  {...repo.about} /> */}

      <CategoryMain displayFilter={false} />

      <SpecialProducts title='Our Featured Products' filter='is_featured' displayShowMoreBtn={true} />

      <SpecialProducts title='New Products' filter='is_new' displayShowMoreBtn={true} />

      <SpecialProducts title='On Sale Products' filter='is_on_sale' displayShowMoreBtn={true} />
      
      <PartnerSlider />
      <TestimonialSlider />
      <BlogSlider />
    </>
  )
}
