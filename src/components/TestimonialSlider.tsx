import Slider from "react-slick";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

export default function TestimonialSlider(){
    return <section className="section testimonial-part">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="section-heading"><h2>client&apos;s feedback</h2></div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="testimonial-slider slider-arrow">
            <Slider {...settings}>    
                <div className="testimonial-card">
                <i className="fas fa-quote-left"></i>
                <p>
                    Lorem ipsum dolor consectetur adipisicing elit neque earum
                    sapiente vitae obcaecati magnam doloribus magni provident
                    ipsam
                </p>
                <h5>mahmud hasan</h5>
                <ul>
                    <li className="fas fa-star"></li>
                    <li className="fas fa-star"></li>
                    <li className="fas fa-star"></li>
                    <li className="fas fa-star"></li>
                    <li className="fas fa-star"></li>
                </ul>
                <img src="/images/avatar/01.jpg" alt="testimonial" />
                </div>
                <div className="testimonial-card">
                <i className="fas fa-quote-left"></i>
                <p>
                    Lorem ipsum dolor consectetur adipisicing elit neque earum
                    sapiente vitae obcaecati magnam doloribus magni provident
                    ipsam
                </p>
                <h5>mahmud hasan</h5>
                <ul>
                    <li className="fas fa-star"></li>
                    <li className="fas fa-star"></li>
                    <li className="fas fa-star"></li>
                    <li className="fas fa-star"></li>
                    <li className="fas fa-star"></li>
                </ul>
                <img src="/images/avatar/02.jpg" alt="testimonial" />
                </div>
                <div className="testimonial-card">
                <i className="fas fa-quote-left"></i>
                <p>
                    Lorem ipsum dolor consectetur adipisicing elit neque earum
                    sapiente vitae obcaecati magnam doloribus magni provident
                    ipsam
                </p>
                <h5>mahmud hasan</h5>
                <ul>
                    <li className="fas fa-star"></li>
                    <li className="fas fa-star"></li>
                    <li className="fas fa-star"></li>
                    <li className="fas fa-star"></li>
                    <li className="fas fa-star"></li>
                </ul>
                <img src="/images/avatar/03.jpg" alt="testimonial" />
                </div>
                <div className="testimonial-card">
                <i className="fas fa-quote-left"></i>
                <p>
                    Lorem ipsum dolor consectetur adipisicing elit neque earum
                    sapiente vitae obcaecati magnam doloribus magni provident
                    ipsam
                </p>
                <h5>mahmud hasan</h5>
                <ul>
                    <li className="fas fa-star"></li>
                    <li className="fas fa-star"></li>
                    <li className="fas fa-star"></li>
                    <li className="fas fa-star"></li>
                    <li className="fas fa-star"></li>
                </ul>
                <img src="/images/avatar/04.jpg" alt="testimonial" />
                </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  </section>
}