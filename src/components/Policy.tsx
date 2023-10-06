import { api_routes } from "@/helper/routes";
import { FeatureResponseType } from "@/helper/types";
import useSWR from 'swr'

const loadingArr = [1, 2, 3, 4]

export default function Policy() {
    const { data, isLoading } = useSWR<FeatureResponseType>(api_routes.feature);

    return <section className="intro-part">
    <div className="container">
      <div className="row intro-content">
        {
            isLoading && loadingArr.map( i => <div className="col-sm-12 col-lg-3" key={i}>
                <div className="blog-small-img-loading"></div>
            </div>)
        }
        {
            data?.feature.map((item, i) =><div className="col-sm-12 col-lg-3" key={i}>
            <div className="intro-wrap">
              <div className="intro-icon">
                {/* <i className="fas fa-truck"></i> */}
                <img src={item.image} alt="feature" />
              </div>
              <div className="intro-content">
                <h5>{item.title}</h5>
                <p>{item.description}</p>
              </div>
            </div>
          </div>)
        }
      </div>
    </div>
  </section>
}