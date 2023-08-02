import Slider from "react-slick";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2
};

export default function BlogSlider() {
    return <section className="section blog-part">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="section-heading"><h2>Read our articles</h2></div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="blog-slider slider-arrow">
            <Slider {...settings}>    
                <div className="blog-card">
                <div className="blog-media">
                    <a className="blog-img" href="#"
                    ><img src="/images/blog/01.jpg" alt="blog"
                    /></a>
                </div>
                <div className="blog-content">
                    <ul className="blog-meta">
                    <li><i className="fas fa-user"></i><span>admin</span></li>
                    <li>
                        <i className="fas fa-calendar-alt"></i
                        ><span>february 02, 2021</span>
                    </li>
                    </ul>
                    <h4 className="blog-title">
                    <a href="blog-details.html"
                        >Voluptate blanditiis provident Lorem ipsum dolor sit
                        amet</a
                    >
                    </h4>
                    <p className="blog-desc">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Alias autem recusandae deleniti nam dignissimos sequi ...
                    </p>
                    <a className="blog-btn" href="#"
                    ><span>read more</span><i className="icofont-arrow-right"></i
                    ></a>
                </div>
                </div>
                <div className="blog-card">
                <div className="blog-media">
                    <a className="blog-img" href="#"
                    ><img src="/images/blog/02.jpg" alt="blog"
                    /></a>
                </div>
                <div className="blog-content">
                    <ul className="blog-meta">
                    <li><i className="fas fa-user"></i><span>admin</span></li>
                    <li>
                        <i className="fas fa-calendar-alt"></i
                        ><span>february 02, 2021</span>
                    </li>
                    </ul>
                    <h4 className="blog-title">
                    <a href="blog-details.html"
                        >Voluptate blanditiis provident Lorem ipsum dolor sit
                        amet</a
                    >
                    </h4>
                    <p className="blog-desc">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Alias autem recusandae deleniti nam dignissimos sequi ...
                    </p>
                    <a className="blog-btn" href="#"
                    ><span>read more</span><i className="icofont-arrow-right"></i
                    ></a>
                </div>
                </div>
                <div className="blog-card">
                <div className="blog-media">
                    <a className="blog-img" href="#"
                    ><img src="/images/blog/03.jpg" alt="blog"
                    /></a>
                </div>
                <div className="blog-content">
                    <ul className="blog-meta">
                    <li><i className="fas fa-user"></i><span>admin</span></li>
                    <li>
                        <i className="fas fa-calendar-alt"></i
                        ><span>february 02, 2021</span>
                    </li>
                    </ul>
                    <h4 className="blog-title">
                    <a href="blog-details.html"
                        >Voluptate blanditiis provident Lorem ipsum dolor sit
                        amet</a
                    >
                    </h4>
                    <p className="blog-desc">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Alias autem recusandae deleniti nam dignissimos sequi ...
                    </p>
                    <a className="blog-btn" href="#"
                    ><span>read more</span><i className="icofont-arrow-right"></i
                    ></a>
                </div>
                </div>
                <div className="blog-card">
                <div className="blog-media">
                    <a className="blog-img" href="#"
                    ><img src="/images/blog/04.jpg" alt="blog"
                    /></a>
                </div>
                <div className="blog-content">
                    <ul className="blog-meta">
                    <li><i className="fas fa-user"></i><span>admin</span></li>
                    <li>
                        <i className="fas fa-calendar-alt"></i
                        ><span>february 02, 2021</span>
                    </li>
                    </ul>
                    <h4 className="blog-title">
                    <a href="blog-details.html"
                        >Voluptate blanditiis provident Lorem ipsum dolor sit
                        amet</a
                    >
                    </h4>
                    <p className="blog-desc">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Alias autem recusandae deleniti nam dignissimos sequi ...
                    </p>
                    <a className="blog-btn" href="#"
                    ><span>read more</span><i className="icofont-arrow-right"></i
                    ></a>
                </div>
                </div>
            </Slider>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="section-btn-25">
            <a href="blog-grid.html" className="btn btn-outline"
              ><i className="fas fa-eye"></i><span>view all blog</span></a
            >
          </div>
        </div>
      </div>
    </div>
  </section>
}