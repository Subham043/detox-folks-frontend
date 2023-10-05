import Head from 'next/head'
import Hero from '@/components/Hero';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { axiosPublic } from '../../../axios';
import { api_routes } from '@/helper/routes';
import { BlogType } from '@/helper/types';
import PopularBlogs from '@/components/PopularBlogs';
import BlogSocialWidget from '@/components/BlogSocialWidget';

type ServerSideProps = {
  blog: BlogType;
}

export const getServerSideProps: GetServerSideProps<{
  repo: ServerSideProps
}> = async (ctx: any) => {
  try {
    const blogResponse = await axiosPublic.get(api_routes.blog + `/${ctx?.params.slug}`);
    return { props: { repo: {
      blog: blogResponse.data.blog,
    } } }
  } catch (error) {
    return {
        notFound: true,
    }
  }

}


export default function BlogDetail({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
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
                      <li><a href={`https://www.facebook.com/share.php?u=http://localhost:3000/blogs/${repo.blog.slug}&title=${repo.blog.name}`} target='_blank' className="icofont-facebook"></a></li>
                      <li><a href={`https://twitter.com/share?text=${repo.blog.name}&url=http://localhost:3000/blogs/${repo.blog.slug}`} target='_blank' className="icofont-twitter"></a></li>
                      <li><a href={`https://www.linkedin.com/shareArticle?mini=true&url=http://localhost:3000/blogs/${repo.blog.slug}&title=${repo.blog.name}&source=${repo.blog.name}`} target='_blank' className="icofont-linkedin"></a></li>
                    </ul>
                  </div>
                </div>
              </article>
            </div>
            <div className="col-xl-4 col-lg-4">
              <PopularBlogs />
              <BlogSocialWidget />
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
