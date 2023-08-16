import { AboutSectionType } from "@/helper/types";
import { FC } from "react";

const AboutSection: FC<AboutSectionType> = ({id, image, heading, description, description_unfiltered}) => {
    return <section className="inner-section about-company">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="about-content">
                        <h2>{heading}</h2>
                        <div dangerouslySetInnerHTML={{__html:description}} />
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
                        <img src={image} alt="about" />
                    </div>
                </div>
            </div>
        </div>
    </section>
};

export default AboutSection;