import Slider from "react-slick";
import useSWR from 'swr'
import { api_routes } from "@/helper/routes";
import { TestimonialResponseType } from "@/helper/types";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

const loadingArr = [1,2,3,4]

export default function TestimonialSlider(){
  const { data, isLoading } = useSWR<TestimonialResponseType>(api_routes.testimonial);
  
  if(isLoading){
    return <section className="section testimonial-part">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-heading"><h2>client&apos;s feedback</h2></div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="testimonial-loading"></div>
          </div>
        </div>
      </div>
    </section>
  }

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
              {
                data?.testimonial.map((item, i)=><div className="testimonial-card" key={i}>
                  <i className="fas fa-quote-left"></i>
                  <p>
                      {item.message}
                  </p>
                  <h5>{item.name}</h5>
                  <ul>
                      {
                        Array.from({ length: item.star }, (value, index) => <li className="fas fa-star" key={index}></li>)
                      }
                  </ul>
                  <img src={item.image} alt="testimonial" />
                </div>)
              }
            </Slider>
          </div>
        </div>
      </div>
    </div>
  </section>
}