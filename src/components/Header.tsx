import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Drawer from 'react-modern-drawer'
import useSWR from 'swr'
import { api_routes } from "@/helper/routes";
import { CartType, CategoryResponseType } from "@/helper/types";
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { ToastOptions, toast } from "react-toastify";
import { WishlistContext } from "@/context/WishlistProvider";
import { CartContext } from "@/context/CartProvider";
import ProductSearch from "./ProductSearch";
import { LoginModalContext } from "@/context/LoginModalProvider";
import { WebsiteContext } from "@/context/WebsiteProvider";
import Pagination from "./Pagination";
import ProductMobileSearch from "./ProductMobileSearch";
import Spinner from "./Spinner";

const loadingArr = [1, 2, 3, 4]

const toastConfig: ToastOptions = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}
export default function Header() {
    const { status, data: session } = useSession();
    const { displayLogin } = useContext(LoginModalContext);
    const [isOpen, setIsOpen] = useState(false)
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const callbackUrl = "/";
    const toggleDrawer = () => {
        if (status === 'authenticated') {
            setIsOpen((prevState) => !prevState)
        } else {
            displayLogin()
            toast.error("Please log in to view cart.", toastConfig);
        }
    }
    const toggleMobileDrawer = () => {
        setIsMobileDrawerOpen((prevState) => !prevState)
    }

    useEffect(() => {
        setIsMobileDrawerOpen(false)
    }, [router]);

    const onLogout = async (event: any) => {
        event.preventDefault()
        setLoading(true);
        try {
            const res = await signOut({
                redirect: false,
                callbackUrl
            });
            router.push(callbackUrl);
            toast.success("Logged Out Successfully.", toastConfig);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setIsOpen(false)
    }, [router]);


    const [page, setPage] = useState("1")
    const { data, isLoading } = useSWR<CategoryResponseType>(api_routes.categories + `?total=24&page=${page}&sort=name`);
    const { wishlist } = useContext(WishlistContext);
    const { cart, updateItemCart, deleteItemCart, cartLoading } = useContext(CartContext);
    const { website, websiteLoading } = useContext(WebsiteContext);

    const incrementQuantity = (item: CartType) => {
        const priceArr = [...item.product.product_prices];
        const price_des_quantity = priceArr.sort(function (a, b) { return b.min_quantity - a.min_quantity });
        const price = price_des_quantity.filter(i => (item.quantity + 50) >= i.min_quantity).length > 0 ? price_des_quantity.filter(i => (item.quantity + 50) >= i.min_quantity)[0] : price_des_quantity[price_des_quantity.length - 1];
        updateItemCart({
            cartItemId: item.id,
            product_id: item.product.id,
            product_price_id: price.id,
            quantity: item.quantity + 50,
            amount: (item.quantity + 50) * price.discount_in_price,
        })
    };

    const decrementQuantity = (item: CartType) => {
        const priceArr = [...item.product.product_prices];
        const price_des_quantity = priceArr.sort(function (a, b) { return b.min_quantity - a.min_quantity });
        const price = price_des_quantity.filter(i => (Math.max(0, item.quantity - 50)) >= i.min_quantity).length > 0 ? price_des_quantity.filter(i => (Math.max(0, item.quantity - 50)) >= i.min_quantity)[0] : price_des_quantity[price_des_quantity.length - 1];
        if (Math.max(0, item.quantity - 50) !== 0) {
            updateItemCart({
                cartItemId: item.id,
                product_id: item.product.id,
                product_price_id: price.id,
                quantity: Math.max(0, item.quantity - 50),
                amount: (Math.max(0, item.quantity - 50)) * price.discount_in_price,
            })
        } else {
            deleteItemCart(item.id)
        }
    };


    return <>
        <div className="header-top">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        <div className="header-top-welcome text-center">
                            <p>Welcome to {website.website.website_name} Online Store!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <header className="header-part">
            <div className="container">
                <div className="header-content">
                    <div className="header-media-group">
                        <Link href="/"><img src={website.website.website_logo} alt="logo" /></Link
                        >
                        <button onClick={toggleMobileDrawer}>
                            <i className="icofont-navigation-menu" />
                        </button>
                    </div>
                    <Link href="/" className="header-logo"
                    ><img src={website.website.website_logo} alt="logo" /></Link
                    >
                    <ProductSearch />
                    <div className="header-widget-group">
                        {
                            status === 'unauthenticated' ? <Link href="/login" className="header-widget" title="My Account"
                            ><img src="/images/user.png" alt="user" /><span>join</span></Link
                            > : <ul className="navbar-list">
                                <li className="navbar-item dropdown">
                                    <a className="navbar-link header-widget" href="#"><img src="/images/user.png" alt="user" /><span>{session?.user.name}</span></a>
                                    <ul className="dropdown-position-list">
                                        <li><Link href="/profile">Profile</Link></li>
                                        <li><Link href="/orders">Orders</Link></li>
                                        <li><a style={loading ? { pointerEvents: 'none', cursor: 'none' } : { cursor: 'pointer' }} onClick={(event) => onLogout(event)}>{loading ? 'Logging Out' : 'Logout'}</a></li>
                                    </ul>
                                </li>
                            </ul>
                        }
                        <Link href="/wishlist" className="header-widget" title="Wishlist"
                        ><i className="fas fa-heart"></i><sup>{wishlist.wishlist.length}</sup></Link
                        ><button className="header-widget header-cart" onClick={toggleDrawer} title="Cartlist">
                            <i className="fas fa-shopping-basket"></i><sup>{cart.cart.length}</sup
                            ><span>total price<small>&#8377;{cart.cart_subtotal}</small></span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
        <nav className="navbar-part">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="navbar-content">
                            <ul className="navbar-list">
                                <li className="navbar-item">
                                    <Link className="navbar-link" href="/">home</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link className="navbar-link" href="/about">about us</Link>
                                </li>
                                <li className="navbar-item dropdown-megamenu">
                                    <Link className="navbar-link dropdown-arrow" href="/category">categories</Link>
                                    <div className="megamenu">
                                        <div className="container">
                                            <div className="row">
                                                {
                                                    isLoading && loadingArr.map(i => <div className="col-sm-12 col-lg-3 mb-2" key={i}>
                                                        <div className="blog-small-img-loading"></div>
                                                    </div>)
                                                }
                                                {
                                                    data?.data.map((item, i) => <div className="col-lg-3" key={i}>
                                                        <div className="megamenu-wrap">
                                                            <Link href={`/category/${item.slug}`}><h5 className="megamenu-title">{item.name}</h5></Link>
                                                            <ul className="megamenu-list">
                                                                {
                                                                    item.sub_categories.map((itm, index) => <li key={index}>
                                                                        <Link href={`/sub-category/${itm.slug}`}>{itm.name}</Link>
                                                                    </li>)
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>)
                                                }
                                            </div>
                                            {/* <Pagination {...data?.meta} paginationHandler={setPage} /> */}
                                        </div>
                                    </div>
                                </li>
                                <li className="navbar-item">
                                    <Link className="navbar-link" href="/products">products</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link className="navbar-link" href="/blogs">blogs</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link className="navbar-link" href="/contact">contact us</Link>
                                </li>
                            </ul>
                            <div className="navbar-info-group">
                                <div className="navbar-info">
                                    <i className="icofont-ui-touch-phone"></i>
                                    {websiteLoading ? <div className="blog-heading-loading"></div> : <p><small>call us</small><span>{website.website.phone}</span></p>}
                                </div>
                                <div className="navbar-info">
                                    <i className="icofont-ui-email"></i>
                                    {websiteLoading ? <div className="blog-heading-loading"></div> : <p><small>email us</small><span>{website.website.email}</span></p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <ProductMobileSearch />

        <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction='right'
            className=''
            size={400}
        >
            <aside className="cart-sidebar">
                <div className="cart-header">
                    <div className="cart-total">
                        <i className="fas fa-shopping-basket"></i><span>total item ({cart.cart.length})</span>
                    </div>
                    <button onClick={toggleDrawer} className="cart-close"><i className="icofont-close"></i></button>
                </div>
                {cart.cart.length > 0 ? <ul className="cart-list">
                    {
                        cart.cart.map((item, i) => <li className="cart-item" key={i}>
                            <div className="cart-media">
                                <a href="#"><img src={item.product.image} alt="product" /></a
                                ><button className="cart-delete" disabled={cartLoading} onClick={() => deleteItemCart(item.id)}>
                                    {cartLoading ? <Spinner /> : <i className="far fa-trash-alt"></i>}
                                </button>
                            </div>
                            <div className="cart-info-group">
                                <div className="cart-info">
                                    <h6><a href="product-single.html">{item.product.name}</a></h6>
                                    {
                                        item.product_price && <p>
                                            Unit Price - <span>&#8377;{item.product_price.discount_in_price}<small>/pieces</small></span>
                                        </p>
                                    }
                                </div>
                                <div className="cart-action-group">
                                    <div className="product-action">
                                        <button className="action-minus" title="Quantity Minus" disabled={cartLoading} onClick={() => decrementQuantity(item)}>
                                            {cartLoading ? <Spinner /> : <i className="icofont-minus"></i>}
                                        </button>
                                        <input
                                            className="action-input"
                                            title="Quantity Number"
                                            type="text"
                                            name="quantity"
                                            disabled={true}
                                            readOnly={true}
                                            value={item.quantity}
                                        /><button className="action-plus" title="Quantity Plus" disabled={cartLoading} onClick={() => incrementQuantity(item)}>
                                            {cartLoading ? <Spinner /> : <i className="icofont-plus"></i>}
                                        </button>
                                    </div>
                                    <h6>&#8377;{item.amount}</h6>
                                </div>
                            </div>
                        </li>)
                    }
                </ul> : <ul className="cart-list">
                    <li className="cart-item">
                        <p className='text-center'>No items are there in cart. Kindly add one!</p>
                    </li>
                </ul>}
                {cart.cart.length > 0 && <div className="cart-footer">
                    <Link className="cart-checkout-btn" href="/checkout"
                    ><span className="checkout-label">Proceed to Checkout</span
                    ><span className="checkout-price">&#8377;{cart.cart_subtotal}</span></Link
                    >
                </div>}
            </aside>
        </Drawer>
        <aside className={`nav-sidebar ${isMobileDrawerOpen && 'active'}`}>
        <div className="nav-header">
          <a href="#"><img src={website.website.website_logo} alt="logo" /></a
          ><button onClick={toggleMobileDrawer} className="nav-close"><i className="icofont-close"></i></button>
        </div>
        <div className="nav-content">
          <ul className="nav-list">
                <li>
                    <Link className="nav-link" href="/"><i className="icofont-home"></i>home</Link>
                </li>
                <li>
                    <Link className="nav-link" href="/about"><i className="icofont-info-circle"></i>about us</Link>
                </li>
                <li>
                    <Link className="nav-link" href="/category"><i className="icofont-listing-box"></i>Categories</Link>
                </li>
                <li>
                    <Link className="nav-link" href="/products"><i className="icofont-page"></i>products</Link>
                </li>
                <li>
                    <Link className="nav-link" href="/blogs"><i className="icofont-book-alt"></i>blogs</Link>
                </li>
                <li>
                    <Link className="nav-link" href="/contact"><i className="icofont-contacts"></i>contact us</Link>
                </li>
                {
                    status === 'unauthenticated' ? <li>
                    <Link className="nav-link" href="/login"><i className="fas fa-user"></i>Login</Link>
                </li> : <>
                    <li>
                        <Link className="nav-link" href="/profile"><i className="fas fa-user"></i>Profile</Link>
                    </li>
                    <li>
                        <Link className="nav-link" href="/wishlist"><i className="fas fa-heart"></i>Wishlist</Link>
                    </li>
                    <li>
                        <Link className="nav-link" href="/cart"><i className="fas fa-cart-plus"></i>Cart</Link>
                    </li>
                    <li>
                        <Link className="nav-link" href="/checkout"><i className="icofont-money"></i>Checkout</Link>
                    </li>
                    <li>
                        <Link className="nav-link" href="/orders"><i className="icofont-bag-alt"></i>Order</Link>
                    </li>
                    <li><a style={loading ? { pointerEvents: 'none', cursor: 'none' } : { cursor: 'pointer' }} onClick={(event) => onLogout(event)} className="nav-link"><i className="icofont-logout"></i> {loading ? 'Logging Out' : 'Logout'}</a></li>
                </>}
            </ul>
        </div>
      </aside>
    </>
}