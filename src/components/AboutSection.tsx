import { FC } from "react";

const AboutSection: FC = () => {
    return <section className="inner-section about-company">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="about-content">
                        <h2>Our Motive is to Provide Best for Those Who Deserve</h2>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Officiis exercitationem commodi aliquam necessitatibus vero
                            reiciendis quaerat illo est fuga ea temporibus natus doloremque
                            ipsum voluptas quod deserunt expedita reprehenderit pariatur
                            quidem quisquam, recusandae animi non! Voluptas totam
                            repudiandae rerum molestiae possimus quis numquam sapiente sunt
                            architecto quisquam Aliquam odio optio
                        </p>
                    </div>
                    <ul className="about-list">
                        <li>
                            <h3>34785</h3>
                            <h6>registered users</h6>
                        </li>
                        <li>
                            <h3>2623</h3>
                            <h6>per day visitors</h6>
                        </li>
                        <li>
                            <h3>189</h3>
                            <h6>total products</h6>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-6">
                    <div className="about-img">
                        <img src="/images/about/01.jpg" alt="about" /><img
                            src="/images/about/02.jpg"
                            alt="about"
                        /><img src="/images/about/03.jpg" alt="about" /><img
                            src="/images/about/04.jpg"
                            alt="about"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
};

export default AboutSection;