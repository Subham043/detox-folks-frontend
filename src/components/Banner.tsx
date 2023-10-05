import { BannerType } from "@/helper/types";
import Link from "next/link";
import Slider from "react-slick";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

type BannerProps = {
  banner: BannerType[]
}

export default function Banner({banner}: BannerProps) {
    return <section className="home-index-slider slider-arrow slider-dots mb-3">
    <Slider {...settings}>
      {banner.map((item, i) => {
        return (
          <div className={`banner-part banner-${(i+1)%2===0 ? '2' : '1'}`} key={i}>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6 col-lg-6">
                  <div className="banner-content">
                    <h1>{item.title}</h1>
                    <p>
                      {item.description}
                    </p>
                    <div className="banner-btn">
                      <Link className="btn btn-inline" target="_blank" href={item.button_link}
                        ><i className="fas fa-shopping-basket"></i
                        ><span>{item.button_text}</span></Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="banner-img">
                    <img src={item.banner_image} alt={item.banner_image_alt} title={item.banner_image_title} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </Slider>
  </section>
}