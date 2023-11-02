import Head from 'next/head'
import Hero from '@/components/Hero';
import Link from 'next/link';
import Slider from "react-slick";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { axiosPublic } from '../../../axios';
import { api_routes } from '@/helper/routes';
import { ProductType } from '@/helper/types';
import useSWR from 'swr'
import { ProductResponseType } from "@/helper/types";
import { useCallback, useContext, useEffect, useState } from 'react';
import CartQuantity from '@/components/CartQuantity';
import { CartContext } from '@/context/CartProvider';
import ProductSection from '@/components/ProductSection';
import PriceFactor2 from '@/components/PriceFactor2';
import BulkOfferFactor from '@/components/BulkOfferFactor';
import { useCart } from '@/hook/useCart';

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
    try {
        const productResponse = await axiosPublic.get(api_routes.products + `/${ctx?.params.slug}`);
        return {
            props: {
                repo: {
                    product: productResponse.data.product,
                }
            }
        }
    } catch (error) {
        return {
            notFound: true,
        }
    }

}

export default function ProductDetail({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const getCategoryStr = () => {
        return repo.product.categories.map(item => item.id).join('_');
    }

    const getSubCategoryStr = () => {
        return repo.product.sub_categories.map(item => item.id).join('_');
    }

    const [page, setPage] = useState("1")
    const { data, isLoading } = useSWR<ProductResponseType>(api_routes.products + `?total=12&page=${page}&filter[has_categories]=${getCategoryStr()}&filter[has_sub_categories]=${getSubCategoryStr()}`);
    const {quantity, cartLoading, cart_product_item, incrementQuantity, changeQuantity, decrementQuantity} = useCart({id: repo.product.id, product_prices: repo.product.product_prices, min_cart_quantity: repo.product.min_cart_quantity, cart_quantity_interval: repo.product.cart_quantity_interval});
    
    return (
        <>
            <Head>
                <title>DetoxFolks - {repo.product.name}</title>
                <meta name="description" content="Parcelcounter, headquartered in Bengaluru, is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware." />
                <meta name="keywords" content={repo.product.meta_keywords} />
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <Hero name={repo.product.name} />
            <section className="inner-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="details-gallery p-sticky-product">
                                <div className="details-label-group">
                                    {
                                        repo.product.is_new && <label className="details-label new">new</label>
                                    }
                                    {
                                        repo.product.is_featured && <label className="label-text feat">feature</label>
                                    }
                                    {
                                        repo.product.is_on_sale && <label className="label-text sale">sale</label>
                                    }
                                </div>
                                <ul className="details-preview">
                                    <Slider {...settings}>
                                        {
                                            repo.product.product_images.map((item, i) => <li key={i}><img src={item.image} alt={item.image_alt} title={item.image_title} /></li>)
                                        }
                                    </Slider>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="details-content mb-5">
                                <h3 className="details-name">
                                    <Link href={`/products/${repo.product.slug}`}>{repo.product.name}</Link>
                                </h3>
                                <PriceFactor2 product_prices={repo.product.product_prices} cart_quantity_specification={repo.product.cart_quantity_specification} cart_product_item={cart_product_item} />
                                <BulkOfferFactor product_prices={repo.product.product_prices} cart_quantity_specification={repo.product.cart_quantity_specification} cart_product_item={cart_product_item} />
                                {
                                    repo.product.categories.length > 0 &&
                                    <div className="details-list-group mt-3">
                                        <label className="details-list-title">Categories:</label>
                                        <ul className="details-tag-list">
                                            {
                                                repo.product.categories.map((item, i) => <li key={i}><Link href={repo.product.sub_categories.length>0 ? `/category/${item.slug}` : `/category/${item.slug}/product`}>{item.name}</Link></li>)
                                            }
                                        </ul>
                                    </div>
                                }
                                {
                                    repo.product.sub_categories.length > 0 &&
                                    <div className="details-list-group">
                                        <label className="details-list-title">Sub-Categories:</label>
                                        <ul className="details-tag-list">
                                            {
                                                repo.product.sub_categories.map((item, i) => <li key={i}><Link href={`/sub-category/${item.slug}/product`}>{item.name}</Link></li>)
                                            }
                                        </ul>
                                    </div>
                                }
                                <div className="details-list-group">
                                    <label className="details-list-title">Share:</label>
                                    <ul className="details-share-list">
                                        <li>
                                            <a target='_blank' href={`https://www.facebook.com/share.php?u=https://parcelcounter.in/products/${repo.product.slug}&title=${repo.product.name}`} className="icofont-facebook" title="Facebook"></a>
                                        </li>
                                        <li>
                                            <a target='_blank' href={`https://twitter.com/share?text=${repo.product.name}&url=https://parcelcounter.in/products/${repo.product.slug}`} className="icofont-twitter" title="Twitter"></a>
                                        </li>
                                        <li>
                                            <a target='_blank' href={`https://www.linkedin.com/shareArticle?mini=true&url=https://parcelcounter.in/products/${repo.product.slug}&title=${repo.product.name}&source=${repo.product.name}`} className="icofont-linkedin" title="Linkedin"></a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="details-action-group">
                                    <div className="details-add-group m-0 col-md-6 col-sm-12">
                                        <CartQuantity quantity={quantity} min_cart_quantity={repo.product.min_cart_quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} changeQuantity={changeQuantity} loading={cartLoading} />
                                    </div>
                                </div>
                            </div>
                            <Tabs selectedTabClassName="active">
                                <TabList className="nav nav-tabs">
                                    <Tab className="tab-link">Specifications</Tab>
                                    <Tab className="tab-link">Description</Tab>
                                </TabList>

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
                                <TabPanel>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="product-details-frame">
                                                <div className="tab-descrip" dangerouslySetInnerHTML={{ __html: repo.product.description }} />
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </section>

            <ProductSection 
                displayFilter={false} 
                displayHeading={true} 
                displayPagination={true} 
                title='Related Items'
                total='12' 
                page={page}
                sort='id' 
                isLoading={isLoading}
                data={data}
                setPage={setPage}
            />
        </>
    )
}
