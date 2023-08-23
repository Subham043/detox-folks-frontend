import { AboutSectionType, CounterResponseType } from "@/helper/types";
import useSWR from 'swr'
import { FC } from "react";
import { api_routes } from "@/helper/routes";

const AboutSection: FC<AboutSectionType> = ({id, image, heading, description, description_unfiltered}) => {
    const { data, isLoading } = useSWR<CounterResponseType>(api_routes.counter);

    return <section className="inner-section about-company">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="about-content">
                        <h2>{heading}</h2>
                        <div dangerouslySetInnerHTML={{__html:description}} />
                    </div>
                    {
                        (data?.counter && data?.counter.length>0) && <ul className="about-list">
                            {
                                data.counter.map((item, i)=><li key={i}>
                                <h3>{item.counter}</h3>
                                <h6>{item.title}</h6>
                            </li>)
                            }
                    </ul>
                    }
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