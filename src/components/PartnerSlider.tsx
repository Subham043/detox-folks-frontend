import Slider from "react-slick";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2
};

export default function PartnerSlider() {
    return <section className="section brand-part">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="section-heading"><h2>Trusted By</h2></div>
        </div>
      </div>
      <div className="brand-slider slider-arrow">
        <Slider {...settings}>    
            <div className="brand-wrap">
            <div className="brand-media">
                <img src="/images/brand/01.jpg" alt="brand" />
                <div className="brand-overlay">
                <a href="brand-single.html"><i className="fas fa-link"></i></a>
                </div>
            </div>
            <div className="brand-meta">
                <h4>natural greeny</h4>
            </div>
            </div>
            <div className="brand-wrap">
            <div className="brand-media">
                <img src="/images/brand/02.jpg" alt="brand" />
                <div className="brand-overlay">
                <a href="brand-single.html"><i className="fas fa-link"></i></a>
                </div>
            </div>
            <div className="brand-meta">
                <h4>vegan lover</h4>
            </div>
            </div>
            <div className="brand-wrap">
            <div className="brand-media">
                <img src="/images/brand/03.jpg" alt="brand" />
                <div className="brand-overlay">
                <a href="brand-single.html"><i className="fas fa-link"></i></a>
                </div>
            </div>
            <div className="brand-meta">
                <h4>organic foody</h4>
            </div>
            </div>
            <div className="brand-wrap">
            <div className="brand-media">
                <img src="/images/brand/04.jpg" alt="brand" />
                <div className="brand-overlay">
                <a href="brand-single.html"><i className="fas fa-link"></i></a>
                </div>
            </div>
            <div className="brand-meta">
                <h4>ecomart limited</h4>
            </div>
            </div>
            <div className="brand-wrap">
            <div className="brand-media">
                <img src="/images/brand/05.jpg" alt="brand" />
                <div className="brand-overlay">
                <a href="brand-single.html"><i className="fas fa-link"></i></a>
                </div>
            </div>
            <div className="brand-meta">
                <h4>fresh fortune</h4>
            </div>
            </div>
            <div className="brand-wrap">
            <div className="brand-media">
                <img src="/images/brand/06.jpg" alt="brand" />
                <div className="brand-overlay">
                <a href="brand-single.html"><i className="fas fa-link"></i></a>
                </div>
            </div>
            <div className="brand-meta">
                <h4>econature</h4>
            </div>
            </div>
        </Slider>
      </div>
    </div>
  </section>
}