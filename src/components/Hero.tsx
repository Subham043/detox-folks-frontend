import Link from "next/link";
import { FC } from "react";

type HeroProps = {
    name: string;
};

const Hero:FC<HeroProps> = ({name}) => {
    return <section
        className="inner-section single-banner"
        style={{background: "url('https://www.nakodaplast.com/uploads/product_images/banner4.png') no-repeat center"}}
    >
        <div className="container">
            <h2>{name}</h2>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{name}</li>
            </ol>
        </div>
    </section>
}

export default Hero