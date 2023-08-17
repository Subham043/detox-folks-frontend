import Head from 'next/head'
import Hero from '@/components/Hero';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { axiosPublic } from '../../../axios';
import { api_routes } from '@/helper/routes';
import { BlogType } from '@/helper/types';
import Layout from '@/components/Layout';

type ServerSideProps = {
  blog: BlogType;
}

export const getServerSideProps: GetServerSideProps<{
  repo: ServerSideProps
}> = async (ctx: any) => {
  const blogResponse = await axiosPublic.get(api_routes.blog + `/${ctx?.params.slug}`);

  return { props: { repo: {
    blog: blogResponse.data.blog,
  } } }
}


export default function BlogDetail({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <Head>
        <title>DetoxFolks - {repo.blog.meta_title}</title>
        <meta name="description" content={repo.blog.meta_description} />
        <meta name="keywords" content={repo.blog.meta_keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <Hero name={repo.blog.name} />

      <section className="inner-section blog-details-part">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xl-8">
              <article className="blog-details">
                <a className="blog-details-thumb w-100" href="#"
                ><img src={repo.blog.image} alt="blog"
                  /></a>
                <div className="blog-details-content">
                  <ul className="blog-details-meta">
                    <li>
                      <i className="icofont-ui-calendar"></i>
                      <span>{repo.blog.created_at}</span>
                    </li>
                    <li>
                      <i className="icofont-user-alt-3"></i><span>Admin</span>
                    </li>
                  </ul>
                  <h2 className="blog-details-title">
                    {repo.blog.heading}
                  </h2>
                  <div className="blog-details-desc" dangerouslySetInnerHTML={{__html:repo.blog.description}} />
                  <div className="blog-details-footer">
                    <ul className="blog-details-share">
                      <li><span>share:</span></li>
                      <li><a href="#" className="icofont-facebook"></a></li>
                      <li><a href="#" className="icofont-twitter"></a></li>
                      <li><a href="#" className="icofont-linkedin"></a></li>
                      <li><a href="#" className="icofont-pinterest"></a></li>
                      <li><a href="#" className="icofont-instagram"></a></li>
                    </ul>
                  </div>
                </div>
              </article>
            </div>
            <div className="col-xl-4 col-lg-4">
              <div className="blog-widget">
                <h3 className="blog-widget-title">Find blogs</h3>
                <form className="blog-widget-form">
                  <input type="text" placeholder="Search blogs" /><button
                    className="icofont-search-1"
                  ></button>
                </form>
              </div>
              <div className="blog-widget">
                <h3 className="blog-widget-title">popular feeds</h3>
                <ul className="blog-widget-feed">
                  <li>
                    <a className="blog-widget-media" href="#"
                    ><img src="/images/blog-widget/01.jpg" alt="blog-widget"
                      /></a>
                    <h6 className="blog-widget-text">
                      <a href="#">Lorem ipsum dolor sit amet consectetur</a
                      ><span>february 02, 2021</span>
                    </h6>
                  </li>
                  <li>
                    <a className="blog-widget-media" href="#"
                    ><img src="/images/blog-widget/02.jpg" alt="blog-widget"
                      /></a>
                    <h6 className="blog-widget-text">
                      <a href="#">Lorem ipsum dolor sit amet consectetur</a
                      ><span>february 02, 2021</span>
                    </h6>
                  </li>
                  <li>
                    <a className="blog-widget-media" href="#"
                    ><img src="/images/blog-widget/03.jpg" alt="blog-widget"
                      /></a>
                    <h6 className="blog-widget-text">
                      <a href="#">Lorem ipsum dolor sit amet consectetur</a
                      ><span>february 02, 2021</span>
                    </h6>
                  </li>
                  <li>
                    <a className="blog-widget-media" href="#"
                    ><img src="/images/blog-widget/04.jpg" alt="blog-widget"
                      /></a>
                    <h6 className="blog-widget-text">
                      <a href="#">Lorem ipsum dolor sit amet consectetur</a
                      ><span>february 02, 2021</span>
                    </h6>
                  </li>
                  <li>
                    <a className="blog-widget-media" href="#"
                    ><img src="/images/blog-widget/05.jpg" alt="blog-widget"
                      /></a>
                    <h6 className="blog-widget-text">
                      <a href="#">Lorem ipsum dolor sit amet consectetur</a
                      ><span>february 02, 2021</span>
                    </h6>
                  </li>
                </ul>
              </div>
              <div className="blog-widget">
                <h3 className="blog-widget-title">follow us</h3>
                <ul className="blog-widget-social">
                  <li><a href="#" className="icofont-facebook"></a></li>
                  <li><a href="#" className="icofont-twitter"></a></li>
                  <li><a href="#" className="icofont-linkedin"></a></li>
                  <li><a href="#" className="icofont-pinterest"></a></li>
                  <li><a href="#" className="icofont-instagram"></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  )
}
