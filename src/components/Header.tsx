import Link from "next/link";
import { useState } from "react";
import Drawer from 'react-modern-drawer'
import useSWR from 'swr'
import { api_routes } from "@/helper/routes";
import { CategoryResponseType } from "@/helper/types";
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { ToastOptions, toast } from "react-toastify";

const toastConfig:ToastOptions = {
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
    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    const { status, data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const callbackUrl = "/";
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
    

    const { data, isLoading } = useSWR<CategoryResponseType>(api_routes.categories + '?total=8');
    

    return <>
        <div className="header-top">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        <div className="header-top-welcome text-center">
                            <p>Welcome to Detox-Folks Online Store!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <header className="header-part">
            <div className="container">
                <div className="header-content">
                    <div className="header-media-group">
                        <Link href="/"><img src="/images/logo.png" alt="logo" /></Link
                        >
                    </div>
                    <Link href="/" className="header-logo"
                    ><img src="/images/logo.png" alt="logo" /></Link
                    >
                    <form className="header-form">
                        <input type="text" placeholder="Search anything..." /><button>
                            <i className="fas fa-search"></i>
                        </button>
                    </form>
                    <div className="header-widget-group">
                        {
                            status==='unauthenticated' ? <Link href="/login" className="header-widget" title="My Account"
                            ><img src="/images/user.png" alt="user" /><span>join</span></Link
                            > : <ul className="navbar-list">
                                <li className="navbar-item dropdown">
                                    <a className="navbar-link header-widget" href="#"><img src="/images/user.png" alt="user" /><span>{session?.user.name}</span></a>
                                    <ul className="dropdown-position-list">
                                        <li><Link href="/profile">Profile</Link></li>
                                        <li><a style={loading ? {pointerEvents: 'none', cursor: 'none'}: {cursor: 'pointer'}} onClick={(event) => onLogout(event)}>{loading ? 'Logging Out': 'Logout'}</a></li>
                                    </ul>
                                </li>
                            </ul>
                        }
                        <Link href="/wishlist" className="header-widget" title="Wishlist"
                        ><i className="fas fa-heart"></i><sup>0</sup></Link
                        ><button className="header-widget header-cart" onClick={toggleDrawer} title="Cartlist">
                            <i className="fas fa-shopping-basket"></i><sup>9+</sup
                            ><span>total price<small>$345.00</small></span>
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
                                    <a className="navbar-link dropdown-arrow" href="#">categories</a>
                                    <div className="megamenu">
                                        <div className="container">
                                            <div className="row">
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
                                    <p><small>call us</small><span>(+880) 183 8288 389</span></p>
                                </div>
                                <div className="navbar-info">
                                    <i className="icofont-ui-email"></i>
                                    <p><small>email us</small><span>support@example.com</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

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
                        <i className="fas fa-shopping-basket"></i><span>total item (5)</span>
                    </div>
                    <button onClick={toggleDrawer} className="cart-close"><i className="icofont-close"></i></button>
                </div>
                <ul className="cart-list">
                    <li className="cart-item">
                        <div className="cart-media">
                            <a href="#"><img src="https://static.vecteezy.com/system/resources/previews/016/694/735/original/tissue-with-transparent-background-png.png" alt="product" /></a
                            ><button className="cart-delete">
                                <i className="far fa-trash-alt"></i>
                            </button>
                        </div>
                        <div className="cart-info-group">
                            <div className="cart-info">
                                <h6><a href="product-single.html">existing product name</a></h6>
                                <p>Unit Price - $8.75</p>
                            </div>
                            <div className="cart-action-group">
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
                                <h6>$56.98</h6>
                            </div>
                        </div>
                    </li>
                    <li className="cart-item">
                        <div className="cart-media">
                            <a href="#"><img src="https://m.media-amazon.com/images/I/51pILIz20gL._SL1200_.jpg" alt="product" /></a
                            ><button className="cart-delete">
                                <i className="far fa-trash-alt"></i>
                            </button>
                        </div>
                        <div className="cart-info-group">
                            <div className="cart-info">
                                <h6><a href="product-single.html">existing product name</a></h6>
                                <p>Unit Price - $8.75</p>
                            </div>
                            <div className="cart-action-group">
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
                                <h6>$56.98</h6>
                            </div>
                        </div>
                    </li>
                    <li className="cart-item">
                        <div className="cart-media">
                            <a href="#"><img src="https://img.freepik.com/premium-photo/toothpicks-box-isolated-white_179068-1760.jpg?w=2000" alt="product" /></a
                            ><button className="cart-delete">
                                <i className="far fa-trash-alt"></i>
                            </button>
                        </div>
                        <div className="cart-info-group">
                            <div className="cart-info">
                                <h6><a href="product-single.html">existing product name</a></h6>
                                <p>Unit Price - $8.75</p>
                            </div>
                            <div className="cart-action-group">
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
                                <h6>$56.98</h6>
                            </div>
                        </div>
                    </li>
                    <li className="cart-item">
                        <div className="cart-media">
                            <a href="#"><img src="https://3.imimg.com/data3/RY/JL/MY-11348186/aluminium-foil-pouch-1000x1000.jpg" alt="product" /></a
                            ><button className="cart-delete">
                                <i className="far fa-trash-alt"></i>
                            </button>
                        </div>
                        <div className="cart-info-group">
                            <div className="cart-info">
                                <h6><a href="product-single.html">existing product name</a></h6>
                                <p>Unit Price - $8.75</p>
                            </div>
                            <div className="cart-action-group">
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
                                <h6>$56.98</h6>
                            </div>
                        </div>
                    </li>
                    <li className="cart-item">
                        <div className="cart-media">
                            <a href="#"><img src="https://5.imimg.com/data5/ANDROID/Default/2022/11/NH/SS/MO/4041306/product-jpeg-500x500.jpg" alt="product" /></a
                            ><button className="cart-delete">
                                <i className="far fa-trash-alt"></i>
                            </button>
                        </div>
                        <div className="cart-info-group">
                            <div className="cart-info">
                                <h6><a href="product-single.html">existing product name</a></h6>
                                <p>Unit Price - $8.75</p>
                            </div>
                            <div className="cart-action-group">
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
                                <h6>$56.98</h6>
                            </div>
                        </div>
                    </li>
                </ul>
                <div className="cart-footer">
                    <button className="coupon-btn">Do you have a coupon code?</button>
                    <form className="coupon-form">
                        <input type="text" placeholder="Enter your coupon code" /><button
                            type="submit"
                        >
                            <span>apply</span>
                        </button>
                    </form>
                    <Link className="cart-checkout-btn" href="/checkout"
                    ><span className="checkout-label">Proceed to Checkout</span
                    ><span className="checkout-price">$369.78</span></Link
                    >
                </div>
            </aside>
        </Drawer>
    </>
}