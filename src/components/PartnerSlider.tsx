import { api_routes } from "@/helper/routes";
import { PartnerResponseType } from "@/helper/types";
import Slider from "react-slick";
import useSWR from 'swr'

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1
};

const loadingArr = [1,2,3,4]

export default function PartnerSlider() {
    const { data, isLoading } = useSWR<PartnerResponseType>(api_routes.partner);

    if(isLoading){
        return <section className="section brand-part">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-heading"><h2>Trusted By</h2></div>
                    </div>
                </div>
                <div className="row">
                    {
                        loadingArr.map( i => <div className="col-lg-3 col-md-6 col-sm-12" key={i}>
                            <div className="partner-loading"></div>
                        </div>)
                    }
                </div>
            </div>
        </section>
    }

    return <section className="section brand-part">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="section-heading"><h2>Trusted By</h2></div>
                </div>
            </div>
            <div className="brand-slider slider-arrow">
                <Slider {...settings} slidesToShow={data?.partner?.length!== undefined && data?.partner?.length>4 ? 5 : data?.partner?.length}>
                    {data?.partner.map((item, i)=> <div className="brand-wrap" key={i}>
                        <div className="brand-media">
                            <img src={item.image} alt={item.image_alt} title={item.image_title} />
                        </div>
                        <div className="brand-meta">
                            <h4>{item.image_title}</h4>
                        </div>
                    </div>)}
                </Slider>
            </div>
        </div>
    </section>
}