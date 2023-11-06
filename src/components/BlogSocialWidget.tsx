import { WebsiteContext } from "@/context/WebsiteProvider";
import { useContext } from "react";

export default function BlogSocialWidget() {
    const { website, websiteLoading } = useContext(WebsiteContext);

    return <div className="blog-widget">
    <h3 className="blog-widget-title">follow us</h3>
    <ul className="blog-widget-social">
        <li><a className="icofont-facebook" target="_blank" href={website.facebook}></a></li>
        <li><a className="icofont-instagram" target="_blank" href={website.instagram}></a></li>
        <li><a className="icofont-linkedin" target="_blank" href={website.linkedin}></a></li>
        <li><a className="fab fa-youtube" target="_blank" href={website.youtube}></a></li>
    </ul>
  </div>
}