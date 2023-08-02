import Link from "next/link";
import Slider from "react-slick";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

export default function Banner() {
    return <section className="home-index-slider slider-arrow slider-dots mb-5">
    <Slider {...settings}>
      <div className="banner-part banner-1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-lg-6">
              <div className="banner-content">
                <h1>free home delivery within 24 hours now.</h1>
                <p>
                  Lorem ipsum dolor consectetur adipisicing elit modi
                  consequatur eaque expedita porro necessitatibus eveniet
                  voluptatum quis pariatur Laboriosam molestiae architecto
                  excepturi
                </p>
                <div className="banner-btn">
                  <Link className="btn btn-inline" href="/products/test"
                    ><i className="fas fa-shopping-basket"></i
                    ><span>shop now</span></Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6">
              <div className="banner-img">
                <img src="https://static.vecteezy.com/system/resources/previews/009/886/744/original/brown-paper-box-file-png.png" alt="index" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="banner-part banner-2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-lg-6">
              <div className="banner-img">
                <img src="https://i.pinimg.com/originals/45/4d/f9/454df968118a124807d3c7fe7155a63d.png" alt="index" />
              </div>
            </div>
            <div className="col-md-6 col-lg-6">
              <div className="banner-content">
                <h1>free home delivery within 24 hours now.</h1>
                <p>
                  Lorem ipsum dolor consectetur adipisicing elit modi
                  consequatur eaque expedita porro necessitatibus eveniet
                  voluptatum quis pariatur Laboriosam molestiae architecto
                  excepturi
                </p>
                <div className="banner-btn">
                  <Link className="btn btn-inline" href="/products/test"
                    ><i className="fas fa-shopping-basket"></i
                    ><span>shop now</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slider>
  </section>
}