import Head from 'next/head'
import { Inter } from 'next/font/google'
import Banner from '@/components/Banner';
import PartnerSlider from '@/components/PartnerSlider';
import TestimonialSlider from '@/components/TestimonialSlider';
import BlogSlider from '@/components/BlogSlider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};


export default function Home() {
  return (
    <>
      <Head>
        <title>Detox-Folks</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
    <Header />
    <Banner />
    <AboutSection />

    <section className="section feature-part">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading"><h2>our featured items</h2></div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2">
          <div className="col">
            <div className="feature-card">
              <div className="feature-media">
                <div className="feature-label">
                  <label className="label-text feat">feature</label>
                </div>
                <button className="feature-wish wish">
                  <i className="fas fa-heart"></i></button
                ><Link className="feature-image" href="/products/test"
                  ><img src="data:image/jpeg;base64,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" alt="product"
                /></Link>
              </div>
              <div className="feature-content">
                <h6 className="feature-name">
                  <Link href="/products/test">fresh organic green chilis</Link>
                </h6>
                <h6 className="feature-price">
                  <del>$34</del><span>$28<small>/piece</small></span>
                </h6>
                <p className="feature-desc">
                  Lorem ipsum dolor sit consectetur adipisicing xpedita dicta
                  amet olor ut eveniet commodi...
                </p>
                <button className="product-add" title="Add to Cart">
                  <i className="fas fa-shopping-basket"></i><span>add</span>
                </button>
                <div className="product-action">
                  <button className="action-minus" title="Quantity Minus">
                    <i className="icofont-minus"></i></button
                  ><input
                    className="action-input"
                    title="Quantity Number"
                    type="text"
                    name="quantity"
                    defaultValue="1"
                  /><button className="action-plus" title="Quantity Plus">
                    <i className="icofont-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="feature-card">
              <div className="feature-media">
                <div className="feature-label">
                  <label className="label-text feat">feature</label>
                </div>
                <button className="feature-wish wish">
                  <i className="fas fa-heart"></i></button
                ><Link className="feature-image" href="/products/test"
                  ><img src="https://3.imimg.com/data3/RY/JL/MY-11348186/aluminium-foil-pouch-1000x1000.jpg" alt="product"
                /></Link>
              </div>
              <div className="feature-content">
                <h6 className="feature-name">
                  <Link href="/products/test">fresh organic green chilis</Link>
                </h6>
                <h6 className="feature-price">
                  <del>$34</del><span>$28<small>/piece</small></span>
                </h6>
                <p className="feature-desc">
                  Lorem ipsum dolor sit consectetur adipisicing xpedita dicta
                  amet olor ut eveniet commodi...
                </p>
                <button className="product-add" title="Add to Cart">
                  <i className="fas fa-shopping-basket"></i><span>add</span>
                </button>
                <div className="product-action">
                  <button className="action-minus" title="Quantity Minus">
                    <i className="icofont-minus"></i></button
                  ><input
                    className="action-input"
                    title="Quantity Number"
                    type="text"
                    name="quantity"
                    defaultValue="1"
                  /><button className="action-plus" title="Quantity Plus">
                    <i className="icofont-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="feature-card">
              <div className="feature-media">
                <div className="feature-label">
                  <label className="label-text feat">feature</label>
                </div>
                <button className="feature-wish wish">
                  <i className="fas fa-heart"></i></button
                ><Link className="feature-image" href="/products/test"
                  ><img src="https://5.imimg.com/data5/ANDROID/Default/2022/11/NH/SS/MO/4041306/product-jpeg-500x500.jpg" alt="product"
                /></Link>
              </div>
              <div className="feature-content">
                <h6 className="feature-name">
                  <Link href="/products/test">fresh organic green chilis</Link>
                </h6>
                <h6 className="feature-price">
                  <del>$34</del><span>$28<small>/piece</small></span>
                </h6>
                <p className="feature-desc">
                  Lorem ipsum dolor sit consectetur adipisicing xpedita dicta
                  amet olor ut eveniet commodi...
                </p>
                <button className="product-add" title="Add to Cart">
                  <i className="fas fa-shopping-basket"></i><span>add</span>
                </button>
                <div className="product-action">
                  <button className="action-minus" title="Quantity Minus">
                    <i className="icofont-minus"></i></button
                  ><input
                    className="action-input"
                    title="Quantity Number"
                    type="text"
                    name="quantity"
                    defaultValue="1"
                  /><button className="action-plus" title="Quantity Plus">
                    <i className="icofont-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="feature-card">
              <div className="feature-media">
                <div className="feature-label">
                  <label className="label-text feat">feature</label>
                </div>
                <button className="feature-wish wish">
                  <i className="fas fa-heart"></i></button
                ><Link className="feature-image" href="/products/test"
                  ><img src="https://m.media-amazon.com/images/I/51NfoHE61QL.jpg" alt="product"
                /></Link>
              </div>
              <div className="feature-content">
                <h6 className="feature-name">
                  <Link href="/products/test">fresh organic green chilis</Link>
                </h6>
                <h6 className="feature-price">
                  <del>$34</del><span>$28<small>/piece</small></span>
                </h6>
                <p className="feature-desc">
                  Lorem ipsum dolor sit consectetur adipisicing xpedita dicta
                  amet olor ut eveniet commodi...
                </p>
                <button className="product-add" title="Add to Cart">
                  <i className="fas fa-shopping-basket"></i><span>add</span>
                </button>
                <div className="product-action">
                  <button className="action-minus" title="Quantity Minus">
                    <i className="icofont-minus"></i></button
                  ><input
                    className="action-input"
                    title="Quantity Number"
                    type="text"
                    name="quantity"
                    defaultValue="1"
                  /><button className="action-plus" title="Quantity Plus">
                    <i className="icofont-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="feature-card">
              <div className="feature-media">
                <div className="feature-label">
                  <label className="label-text feat">feature</label>
                </div>
                <button className="feature-wish wish">
                  <i className="fas fa-heart"></i></button
                ><Link className="feature-image" href="/products/test"
                  ><img src="https://www.ikea.com/in/en/images/products/gamman-24-piece-cutlery-set-stainless-steel__0713267_pe729383_s5.jpg?f=s" alt="product"
                /></Link>
              </div>
              <div className="feature-content">
                <h6 className="feature-name">
                  <Link href="/products/test">fresh organic green chilis</Link>
                </h6>
                <h6 className="feature-price">
                  <del>$34</del><span>$28<small>/piece</small></span>
                </h6>
                <p className="feature-desc">
                  Lorem ipsum dolor sit consectetur adipisicing xpedita dicta
                  amet olor ut eveniet commodi...
                </p>
                <button className="product-add" title="Add to Cart">
                  <i className="fas fa-shopping-basket"></i><span>add</span>
                </button>
                <div className="product-action">
                  <button className="action-minus" title="Quantity Minus">
                    <i className="icofont-minus"></i></button
                  ><input
                    className="action-input"
                    title="Quantity Number"
                    type="text"
                    name="quantity"
                    defaultValue="1"
                  /><button className="action-plus" title="Quantity Plus">
                    <i className="icofont-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="feature-card">
              <div className="feature-media">
                <div className="feature-label">
                  <label className="label-text feat">feature</label>
                </div>
                <button className="feature-wish wish">
                  <i className="fas fa-heart"></i></button
                ><Link className="feature-image" href="/products/test"
                  ><img src="http://atlas-content-cdn.pixelsquid.com/stock-images/trash-bag-garbage-e1XEqNE-600.jpg" alt="product"
                /></Link>
              </div>
              <div className="feature-content">
                <h6 className="feature-name">
                  <Link href="/products/test">fresh organic green chilis</Link>
                </h6>
                <div className="feature-rating">
                  <i className="active icofont-star"></i
                  ><i className="active icofont-star"></i
                  ><i className="active icofont-star"></i
                  ><i className="active icofont-star"></i
                  ><i className="icofont-star"></i
                  ><a href="/products/test">(3 Reviews)</a>
                </div>
                <h6 className="feature-price">
                  <del>$34</del><span>$28<small>/piece</small></span>
                </h6>
                <p className="feature-desc">
                  Lorem ipsum dolor sit consectetur adipisicing xpedita dicta
                  amet olor ut eveniet commodi...
                </p>
                <button className="product-add" title="Add to Cart">
                  <i className="fas fa-shopping-basket"></i><span>add</span>
                </button>
                <div className="product-action">
                  <button className="action-minus" title="Quantity Minus">
                    <i className="icofont-minus"></i></button
                  ><input
                    className="action-input"
                    title="Quantity Number"
                    type="text"
                    name="quantity"
                    defaultValue="1"
                  /><button className="action-plus" title="Quantity Plus">
                    <i className="icofont-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="section-btn-25">
              <Link href="/products" className="btn btn-outline"
                ><i className="fas fa-eye"></i><span>show more</span></Link
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section recent-part">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading"><h2>recently sold items</h2></div>
          </div>
        </div>
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
          <div className="col">
            <div className="product-card">
              <div className="product-media">
                <div className="product-label">
                  <label className="label-text sale">sale</label>
                </div>
                <button className="product-wish wish">
                  <i className="fas fa-heart"></i></button
                ><Link className="product-image" href="/products/test"
                  ><img src="data:image/jpeg;base64,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" alt="product"
                /></Link>
              </div>
              <div className="product-content">
                <h6 className="product-name">
                  <Link href="/products/test">fresh green chilis</Link>
                </h6>
                <h6 className="product-price">
                  <del>$34</del><span>$28<small>/piece</small></span>
                </h6>
                <button className="product-add" title="Add to Cart">
                  <i className="fas fa-shopping-basket"></i><span>add</span>
                </button>
                <div className="product-action">
                  <button className="action-minus" title="Quantity Minus">
                    <i className="icofont-minus"></i></button
                  ><input
                    className="action-input"
                    title="Quantity Number"
                    type="text"
                    name="quantity"
                    defaultValue="1"
                  /><button className="action-plus" title="Quantity Plus">
                    <i className="icofont-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="product-card">
              <div className="product-media">
                <div className="product-label">
                  <label className="label-text sale">sale</label
                  ><label className="label-text new">new</label>
                </div>
                <button className="product-wish wish">
                  <i className="fas fa-heart"></i></button
                ><Link className="product-image" href="/products/test"
                  ><img src="https://3.imimg.com/data3/RY/JL/MY-11348186/aluminium-foil-pouch-1000x1000.jpg" alt="product"
                /></Link>
              </div>
              <div className="product-content">
                <h6 className="product-name">
                  <Link href="/products/test">fresh green chilis</Link>
                </h6>
                <h6 className="product-price">
                  <del>$34</del><span>$28<small>/piece</small></span>
                </h6>
                <button className="product-add" title="Add to Cart">
                  <i className="fas fa-shopping-basket"></i><span>add</span>
                </button>
                <div className="product-action">
                  <button className="action-minus" title="Quantity Minus">
                    <i className="icofont-minus"></i></button
                  ><input
                    className="action-input"
                    title="Quantity Number"
                    type="text"
                    name="quantity"
                    defaultValue="1"
                  /><button className="action-plus" title="Quantity Plus">
                    <i className="icofont-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="product-card">
              <div className="product-media">
                <div className="product-label">
                  <label className="label-text sale">sale</label>
                </div>
                <button className="product-wish wish">
                  <i className="fas fa-heart"></i></button
                ><Link className="product-image" href="/products/test"
                  ><img src="https://5.imimg.com/data5/ANDROID/Default/2022/11/NH/SS/MO/4041306/product-jpeg-500x500.jpg" alt="product"
                /></Link>
              </div>
              <div className="product-content">
                <h6 className="product-name">
                  <Link href="/products/test">fresh green chilis</Link>
                </h6>
                <h6 className="product-price">
                  <del>$34</del><span>$28<small>/piece</small></span>
                </h6>
                <button className="product-add" title="Add to Cart">
                  <i className="fas fa-shopping-basket"></i><span>add</span>
                </button>
                <div className="product-action">
                  <button className="action-minus" title="Quantity Minus">
                    <i className="icofont-minus"></i></button
                  ><input
                    className="action-input"
                    title="Quantity Number"
                    type="text"
                    name="quantity"
                    defaultValue="1"
                  /><button className="action-plus" title="Quantity Plus">
                    <i className="icofont-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="product-card">
              <div className="product-media">
                <div className="product-label">
                  <label className="label-text sale">sale</label>
                </div>
                <button className="product-wish wish">
                  <i className="fas fa-heart"></i></button
                ><Link className="product-image" href="/products/test"
                  ><img src="https://m.media-amazon.com/images/I/51NfoHE61QL.jpg" alt="product"
                /></Link>
              </div>
              <div className="product-content">
                <h6 className="product-name">
                  <Link href="/products/test">fresh green chilis</Link>
                </h6>
                <h6 className="product-price">
                  <del>$34</del><span>$28<small>/piece</small></span>
                </h6>
                <button className="product-add" title="Add to Cart">
                  <i className="fas fa-shopping-basket"></i><span>add</span>
                </button>
                <div className="product-action">
                  <button className="action-minus" title="Quantity Minus">
                    <i className="icofont-minus"></i></button
                  ><input
                    className="action-input"
                    title="Quantity Number"
                    type="text"
                    name="quantity"
                    defaultValue="1"
                  /><button className="action-plus" title="Quantity Plus">
                    <i className="icofont-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="product-card">
              <div className="product-media">
                <div className="product-label">
                  <label className="label-text sale">sale</label>
                </div>
                <button className="product-wish wish">
                  <i className="fas fa-heart"></i></button
                ><Link className="product-image" href="/products/test"
                  ><img src="https://www.ikea.com/in/en/images/products/gamman-24-piece-cutlery-set-stainless-steel__0713267_pe729383_s5.jpg?f=s" alt="product"
                /></Link>
              </div>
              <div className="product-content">
                <h6 className="product-name">
                  <Link href="/products/test">fresh green chilis</Link>
                </h6>
                <h6 className="product-price">
                  <del>$34</del><span>$28<small>/piece</small></span>
                </h6>
                <button className="product-add" title="Add to Cart">
                  <i className="fas fa-shopping-basket"></i><span>add</span>
                </button>
                <div className="product-action">
                  <button className="action-minus" title="Quantity Minus">
                    <i className="icofont-minus"></i></button
                  ><input
                    className="action-input"
                    title="Quantity Number"
                    type="text"
                    name="quantity"
                    defaultValue="1"
                  /><button className="action-plus" title="Quantity Plus">
                    <i className="icofont-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="product-card">
              <div className="product-media">
                <div className="product-label">
                  <label className="label-text sale">sale</label>
                </div>
                <button className="product-wish wish">
                  <i className="fas fa-heart"></i></button
                ><Link className="product-image" href="/products/test"
                  ><img src="http://atlas-content-cdn.pixelsquid.com/stock-images/trash-bag-garbage-e1XEqNE-600.jpg" alt="product"
                /></Link>
              </div>
              <div className="product-content">
                <h6 className="product-name">
                  <Link href="/products/test">fresh green chilis</Link>
                </h6>
                <h6 className="product-price">
                  <del>$34</del><span>$28<small>/piece</small></span>
                </h6>
                <button className="product-add" title="Add to Cart">
                  <i className="fas fa-shopping-basket"></i><span>add</span>
                </button>
                <div className="product-action">
                  <button className="action-minus" title="Quantity Minus">
                    <i className="icofont-minus"></i></button
                  ><input
                    className="action-input"
                    title="Quantity Number"
                    type="text"
                    name="quantity"
                    defaultValue="1"
                  /><button className="action-plus" title="Quantity Plus">
                    <i className="icofont-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="product-card">
              <div className="product-media">
                <div className="product-label">
                  <label className="label-text sale">sale</label>
                </div>
                <button className="product-wish wish">
                  <i className="fas fa-heart"></i></button
                ><Link className="product-image" href="/products/test"
                  ><img src="https://static.vecteezy.com/system/resources/previews/016/694/735/original/tissue-with-transparent-background-png.png" alt="product"
                /></Link>
              </div>
              <div className="product-content">
                <h6 className="product-name">
                  <Link href="/products/test">fresh green chilis</Link>
                </h6>
                <h6 className="product-price">
                  <del>$34</del><span>$28<small>/piece</small></span>
                </h6>
                <button className="product-add" title="Add to Cart">
                  <i className="fas fa-shopping-basket"></i><span>add</span>
                </button>
                <div className="product-action">
                  <button className="action-minus" title="Quantity Minus">
                    <i className="icofont-minus"></i></button
                  ><input
                    className="action-input"
                    title="Quantity Number"
                    type="text"
                    name="quantity"
                    defaultValue="1"
                  /><button className="action-plus" title="Quantity Plus">
                    <i className="icofont-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="product-card">
              <div className="product-media">
                <div className="product-label">
                  <label className="label-text sale">sale</label>
                </div>
                <button className="product-wish wish">
                  <i className="fas fa-heart"></i></button
                ><Link className="product-image" href="/products/test"
                  ><img src="data:image/jpeg;base64,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" alt="product"
                /></Link>
              </div>
              <div className="product-content">
                <h6 className="product-name">
                  <Link href="/products/test">fresh green chilis</Link>
                </h6>
                <h6 className="product-price">
                  <del>$34</del><span>$28<small>/piece</small></span>
                </h6>
                <button className="product-add" title="Add to Cart">
                  <i className="fas fa-shopping-basket"></i><span>add</span>
                </button>
                <div className="product-action">
                  <button className="action-minus" title="Quantity Minus">
                    <i className="icofont-minus"></i></button
                  ><input
                    className="action-input"
                    title="Quantity Number"
                    type="text"
                    name="quantity"
                    defaultValue="1"
                  /><button className="action-plus" title="Quantity Plus">
                    <i className="icofont-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="section-btn-25">
              <Link href="/products" className="btn btn-outline"
                ><i className="fas fa-eye"></i><span>show more</span></Link
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <PartnerSlider />
    <TestimonialSlider />
    <BlogSlider />
    <Footer />
    </>
  )
}
