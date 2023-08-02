import Slider from "react-slick";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2
};

export default function CategorySlider() {
    return <section className="section suggest-part">
    <div className="container">
      <ul className="suggest-slider slider-arrow">
        <Slider {...settings}>    
            <li>
            <a className="suggest-card" href="shop-4column.html"
                ><img src="/images/suggest/01.jpg" alt="suggest" />
                <h5>vegetables <span>34 items</span></h5></a
            >
            </li>
            <li>
            <a className="suggest-card" href="shop-4column.html"
                ><img src="/images/suggest/02.jpg" alt="suggest" />
                <h5>fruits <span>89 items</span></h5></a
            >
            </li>
            <li>
            <a className="suggest-card" href="shop-4column.html"
                ><img src="/images/suggest/03.jpg" alt="suggest" />
                <h5>groceries <span>45 items</span></h5></a
            >
            </li>
            <li>
            <a className="suggest-card" href="shop-4column.html"
                ><img src="/images/suggest/04.jpg" alt="suggest" />
                <h5>dairy farm <span>83 items</span></h5></a
            >
            </li>
            <li>
            <a className="suggest-card" href="shop-4column.html"
                ><img src="/images/suggest/05.jpg" alt="suggest" />
                <h5>sea foods <span>40 items</span></h5></a
            >
            </li>
            <li>
            <a className="suggest-card" href="shop-4column.html"
                ><img src="/images/suggest/06.jpg" alt="suggest" />
                <h5>vegan foods <span>57 items</span></h5></a
            >
            </li>
            <li>
            <a className="suggest-card" href="shop-4column.html"
                ><img src="/images/suggest/07.jpg" alt="suggest" />
                <h5>dry foods <span>23 items</span></h5></a
            >
            </li>
            <li>
            <a className="suggest-card" href="shop-4column.html"
                ><img src="/images/suggest/08.jpg" alt="suggest" />
                <h5>fast foods <span>97 items</span></h5></a
            >
            </li>
        </Slider>
      </ul>
    </div>
  </section>
}