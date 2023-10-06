import Slider from "react-slick";
import useSWR from 'swr'
import { api_routes } from "@/helper/routes";
import { BlogResponseType } from "@/helper/types";
import Link from "next/link";
import BlogCard from "./BlogCard";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToScroll: 2,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0
      }
    }
  ]
};

const loadingArr = [1, 2, 3]

export default function BlogSlider() {
  const { data, isLoading } = useSWR<BlogResponseType>(api_routes.blog + '?total=6');

  if (isLoading) {
    return <section className="section blog-part">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-heading"><h2>Read our articles</h2></div>
          </div>
        </div>
        <div className="row">
          {
            loadingArr.map(i => <div className="col-lg-4 col-md-6 col-sm-12" key={i}>
              <div className="blog-img-loading"></div>
              <div className="blog-heading-loading"></div>
              <div className="blog-paragraph-loading"></div>
            </div>)
          }
        </div>
      </div>
    </section>
  }

  return (!isLoading && data!==undefined && data?.data.length>0) && <section className="section blog-part">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="section-heading"><h2>Read our articles</h2></div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="blog-slider slider-arrow">
            <Slider {...settings} slidesToShow={data?.data?.length !== undefined && data?.data?.length > 2 ? 3 : data?.data?.length}>
              {
                data?.data.map((item, i) => <BlogCard key={i} {...item} />)
              }
            </Slider>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="section-btn-25">
            <Link href="/blogs" className="btn btn-outline"
            ><i className="fas fa-eye"></i><span>view all blog</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
}