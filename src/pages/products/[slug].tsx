import Head from 'next/head'
import Hero from '@/components/Hero';
import Link from 'next/link';
import Slider from "react-slick";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { axiosPublic } from '../../../axios';
import { api_routes } from '@/helper/routes';
import { ProductType } from '@/helper/types';
import Pagination from '@/components/Pagination';
import useSWR from 'swr'
import { CategoryResponseType, CategoryType, ProductResponseType } from "@/helper/types";
import ProductCard from '@/components/ProductCard';
import { useContext, useState } from 'react';
import { WishlistContext } from '@/context/WishlistProvider';

const loadingArr = [1, 2, 3, 4, 5, 6, 7, 8]

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
};

type ServerSideProps = {
    product: ProductType;
}

export const getServerSideProps: GetServerSideProps<{
    repo: ServerSideProps
  }> = async (ctx: any) => {
    const productResponse = await axiosPublic.get(api_routes.products + `/${ctx?.params.slug}`);
  
    return { props: { repo: {
      product: productResponse.data.product,
    } } }
}

export default function ProductDetail({
    repo,
  }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const getCategoryStr = () => {
        return repo.product.categories.map(item=> item.id).join('_');
    }
    
    const getSubCategoryStr = () => {
        return repo.product.sub_categories.map(item=> item.id).join('_');
    }

    const [page, setPage] = useState("1")
    const { data, isLoading } = useSWR<ProductResponseType>(api_routes.products + `?total=8&page=${page}&filter[has_categories]=${getCategoryStr()}&filter[has_sub_categories]=${getSubCategoryStr()}`);
    const { wishlist, addItemWishlist, deleteItemWishlist, wishlistLoading } = useContext(WishlistContext);

    return (
        <>
            <Head>
                <title>DetoxFolks - {repo.product.meta_title}</title>
                <meta name="description" content={repo.product.meta_description} />
                <meta name="keywords" content={repo.product.meta_keywords} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            <Hero name={repo.product.name} />
            <section className="inner-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="details-gallery">
                                <div className="details-label-group">
                                    <label className="details-label new">new</label
                                    ><label className="details-label off">-10%</label>
                                </div>
                                <ul className="details-preview">
                                    <Slider {...settings}>
                                        <li><img src="https://5.imimg.com/data5/ANDROID/Default/2022/11/NH/SS/MO/4041306/product-jpeg-500x500.jpg" alt="product" /></li>
                                        <li><img src="https://m.media-amazon.com/images/I/51NfoHE61QL.jpg" alt="product" /></li>
                                        <li><img src="https://www.ikea.com/in/en/images/products/gamman-24-piece-cutlery-set-stainless-steel__0713267_pe729383_s5.jpg?f=s" alt="product" /></li>
                                    </Slider>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="details-content">
                                <h3 className="details-name">
                                    <Link href={`/products/${repo.product.slug}`}>{repo.product.name}</Link>
                                </h3>
                                {/* <div className="details-meta">
                                    <p>SKU:<span>1234567</span></p>
                                    <p>BRAND:<a href="#">radhuni</a></p>
                                </div> */}
                                {
                                    repo.product.product_prices.length>0 && <h3 className="details-price">
                                        {repo.product.product_prices[repo.product.product_prices.length-1].discount!==0 && <del>&#8377;{repo.product.product_prices[repo.product.product_prices.length-1].price}</del>}<span>&#8377;{repo.product.product_prices[repo.product.product_prices.length-1].discount_in_price}<small>/pieces</small></span>
                                    </h3>
                                }
                                {repo.product.product_prices.length>0 && <div className="orderlist-deliver">
                                    <h6 className='px-2 pt-3'>Bulk Offer :</h6>
                                    <hr />
                                    <ul>
                                        {
                                            repo.product.product_prices.map((item, i) => <li className='px-2 pb-1' key={i}>
                                            <code><i className='icofont-info-circle'></i> Buy {item.min_quantity} Pieces or more at &#8377;{item.discount_in_price}/Pieces</code>
                                        </li>)
                                        }
                                    </ul>
                                </div>}
                                <p className="details-desc">
                                   {repo.product.brief_description}
                                </p>
                                <div className="details-list-group">
                                    <label className="details-list-title">Categories:</label>
                                    <ul className="details-tag-list">
                                        {
                                            repo.product.categories.map((item, i) => <li key={i}><Link href={`/category/${item.slug}`}>{item.name}</Link></li>)
                                        }
                                    </ul>
                                </div>
                                <div className="details-list-group">
                                    <label className="details-list-title">Sub-Categories:</label>
                                    <ul className="details-tag-list">
                                        {
                                            repo.product.sub_categories.map((item, i) => <li key={i}><Link href={`/sub-category/${item.slug}`}>{item.name}</Link></li>)
                                        }
                                    </ul>
                                </div>
                                <div className="details-list-group">
                                    <label className="details-list-title">Share:</label>
                                    <ul className="details-share-list">
                                        <li>
                                            <a href="#" className="icofont-facebook" title="Facebook"></a>
                                        </li>
                                        <li>
                                            <a href="#" className="icofont-twitter" title="Twitter"></a>
                                        </li>
                                        <li>
                                            <a href="#" className="icofont-linkedin" title="Linkedin"></a>
                                        </li>
                                        <li>
                                            <a href="#" className="icofont-instagram" title="Instagram"></a>
                                        </li>
                                    </ul>
                                </div>
                                {/* <div className="details-add-group">
                                    <button className="product-add" title="Add to Cart">
                                        <i className="fas fa-shopping-basket"></i><span>add to cart</span>
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
                                </div> */}
                                <div className="details-action-group">
                                    <button className="product-add" title="Add to Cart">
                                        <i className="fas fa-shopping-basket"></i><span>add to cart</span>
                                    </button>
                                    <button className={`details-wish wish active`} disabled={wishlistLoading} onClick={()=> wishlist.wishlist.length>0 && wishlist.wishlist.filter(item=>item.product.id===repo.product.id).length>0 ? deleteItemWishlist(wishlist.wishlist.filter(item=>item.product.id===repo.product.id)[0].id) : addItemWishlist(repo.product.id)}
                                    ><i className="icofont-heart"></i><span className='mx-1'>{wishlist.wishlist.length>0 && wishlist.wishlist.filter(item=>item.product.id===repo.product.id).length>0 ? 'Remove From Wishlist' : 'Add To Wishlist'}</span></button
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="inner-section">
                <div className="container">
                    <Tabs selectedTabClassName="active">
                        <TabList className="nav nav-tabs">
                            <Tab className="tab-link">Description</Tab>
                            <Tab className="tab-link">Specifications</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="product-details-frame">
                                        <div className="tab-descrip"  dangerouslySetInnerHTML={{__html:repo.product.description}} />
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="product-details-frame">
                                        <table className="table table-bordered">
                                            <tbody>
                                                {
                                                    repo.product.product_specifications.map((item, i) => <tr key={i}>
                                                    <th scope="row">{item.title}</th>
                                                    <td>{item.description}</td>
                                                </tr>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </section>
            <section className="section recent-part">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-heading"><h2>related items</h2></div>
                        </div>
                    </div>
                    <div className="row">
                        {
                            isLoading && loadingArr.map(i => <div className="col-md-6 col-lg-4 col-sm-12 mb-4" key={i}>
                                <div className="product-img-loading"></div>
                            </div>)
                        }
                    </div>
                    <div
                        className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-3"
                    >
                        {
                            data?.data.map((item, i) => <ProductCard key={i} {...item} />)
                        }
                    </div>
                    <Pagination {...data?.meta} paginationHandler={setPage} />
                </div>
            </section>
        </>
    )
}
