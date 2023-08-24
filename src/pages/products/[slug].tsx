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
import { useCallback, useContext, useEffect, useState } from 'react';
import { WishlistContext } from '@/context/WishlistProvider';
import CartQuantity from '@/components/CartQuantity';
import { CartContext } from '@/context/CartProvider';

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

    return {
        props: {
            repo: {
                product: productResponse.data.product,
            }
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
    const [quantity, setQuantity] = useState<number>(0);
    const { data, isLoading } = useSWR<ProductResponseType>(api_routes.products + `?total=8&page=${page}&filter[has_categories]=${getCategoryStr()}&filter[has_sub_categories]=${getSubCategoryStr()}`);
    const { wishlist, addItemWishlist, deleteItemWishlist, wishlistLoading } = useContext(WishlistContext);
    const { cart, addItemCart, updateItemCart, deleteItemCart, cartLoading } = useContext(CartContext);

    const cart_product_item = useCallback(
        () => cart.cart.filter(item=>item.product.id===repo.product.id),
        [repo.product.id, cart.cart],
    )

    useEffect(() => {
        setQuantity(cart.cart.filter(item => item.product.id === repo.product.id).length === 0 ? 0 : cart.cart.filter(item => item.product.id === repo.product.id)[0].quantity)

        return () => { }
    }, [cart.cart])

    const incrementQuantity = () => {
        const cart_product = cart.cart.filter(item => item.product.id === repo.product.id)
        const price = repo.product.product_prices.filter(item => (quantity + 50) <= item.min_quantity).length > 0 ? repo.product.product_prices.filter(item => (quantity + 50) <= item.min_quantity)[0] : repo.product.product_prices[repo.product.product_prices.length - 1];
        if (cart_product.length === 0) {
            addItemCart({
                product_id: repo.product.id,
                product_price_id: price.id,
                quantity: quantity + 50,
                amount: (quantity + 50) * price.discount_in_price,
            })
        } else {
            updateItemCart({
                cartItemId: cart_product[0].id,
                product_id: repo.product.id,
                product_price_id: price.id,
                quantity: quantity + 50,
                amount: (quantity + 50) * price.discount_in_price,
            })
        }
    };

    const decrementQuantity = () => {
        const cart_product = cart.cart.filter(item => item.product.id === repo.product.id)
        const price = repo.product.product_prices.filter(item => (Math.max(0, quantity - 50)) <= item.min_quantity).length > 0 ? repo.product.product_prices.filter(item => (Math.max(0, quantity - 50)) <= item.min_quantity)[0] : repo.product.product_prices[repo.product.product_prices.length - 1];
        if (cart_product.length !== 0 && Math.max(0, quantity - 50) !== 0) {
            updateItemCart({
                cartItemId: cart_product[0].id,
                product_id: repo.product.id,
                product_price_id: price.id,
                quantity: Math.max(0, quantity - 50),
                amount: (Math.max(0, quantity - 50)) * price.discount_in_price,
            })
        } else {
            deleteItemCart(cart_product[0].id)
        }
    };

    const PriceFactor = () => {
        if(cart_product_item().length>0){
            return (<h3 className="details-price">
                {cart_product_item()[0].product_price.discount !== 0 && <del>&#8377;{cart_product_item()[0].product_price.price}</del>}<span>&#8377;{cart_product_item()[0].product_price.discount_in_price}<small>/pieces</small></span>
            </h3>);
        }
        if(repo.product.product_prices.length > 0){
            return (<h3 className="details-price">
                {repo.product.product_prices[repo.product.product_prices.length - 1].discount !== 0 && <del>&#8377;{repo.product.product_prices[repo.product.product_prices.length - 1].price}</del>}<span>&#8377;{repo.product.product_prices[repo.product.product_prices.length - 1].discount_in_price}<small>/pieces</small></span>
            </h3>);
        }
        return <></>;
    }

    const BulkOfferFactor = () => {
        return repo.product.product_prices.length > 0 && <div className="orderlist-deliver">
            <h6 className='px-2 pt-3'>Bulk Offer :</h6>
            <hr />
            <ul className='pb-2'>
                {
                    repo.product.product_prices.map((item, i) => <li className='px-2 pb-1' key={i}>
                        {
                            (cart_product_item().length>0 && item.min_quantity===cart_product_item()[0].product_price.min_quantity) ? 
                            <code><i className='icofont-check'></i> Buy {item.min_quantity} Pieces or more at &#8377;{item.discount_in_price}/Pieces</code> : 
                            <code className='text-dark'><i className='icofont-info-circle'></i> Buy {item.min_quantity} Pieces or more at &#8377;{item.discount_in_price}/Pieces</code>
                        }
                    </li>)
                }
            </ul>
        </div>
    }


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
                            <div className="details-gallery mb-5">
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
                            <Tabs selectedTabClassName="active">
                                <TabList className="nav nav-tabs">
                                    <Tab className="tab-link">Description</Tab>
                                    <Tab className="tab-link">Specifications</Tab>
                                </TabList>

                                <TabPanel>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="product-details-frame">
                                                <div className="tab-descrip" dangerouslySetInnerHTML={{ __html: repo.product.description }} />
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
                        <div className="col-lg-6">
                            <div className="details-content p-sticky-product">
                                <h3 className="details-name">
                                    <Link href={`/products/${repo.product.slug}`}>{repo.product.name}</Link>
                                </h3>
                                <PriceFactor />
                                <BulkOfferFactor />
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
                                <div className="details-action-group">
                                    <div className="details-add-group m-0">
                                        <CartQuantity quantity={quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} loading={cartLoading} />
                                    </div>
                                    <button className={`product-add`} disabled={wishlistLoading} onClick={() => wishlist.wishlist.length > 0 && wishlist.wishlist.filter(item => item.product.id === repo.product.id).length > 0 ? deleteItemWishlist(wishlist.wishlist.filter(item => item.product.id === repo.product.id)[0].id) : addItemWishlist(repo.product.id)}
                                    ><i className="icofont-heart"></i><span className='mx-1'>{wishlist.wishlist.length > 0 && wishlist.wishlist.filter(item => item.product.id === repo.product.id).length > 0 ? 'Remove From Wishlist' : 'Add To Wishlist'}</span></button
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="inner-section">
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
                                        <div className="tab-descrip" dangerouslySetInnerHTML={{ __html: repo.product.description }} />
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
            </section> */}
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
