import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Drawer from 'react-modern-drawer'
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { CartContext } from "@/context/CartProvider";
import ProductSearch from "./ProductSearch";
import { LoginModalContext } from "@/context/LoginModalProvider";
import { WebsiteContext } from "@/context/WebsiteProvider";
import ProductMobileSearch from "./ProductMobileSearch";
import CartComponent from "./CartComponent";
import { useToast } from "@/hook/useToast";

export default function Header() {
    const { status, data: session } = useSession();
    const { displayLogin } = useContext(LoginModalContext);
    const [isOpen, setIsOpen] = useState(false)
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const { toastSuccess, toastError } = useToast();
    const router = useRouter();
    const callbackUrl = "/";
    const toggleDrawer = () => {
        if (status === 'authenticated') {
            setIsOpen((prevState) => !prevState)
        } else {
            displayLogin()
            toastError("Please log in to view cart.");
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
            toastSuccess("Logged Out Successfully.");
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setIsOpen(false)
    }, [router]);

    const { cart } = useContext(CartContext);
    const { website, websiteLoading } = useContext(WebsiteContext);


    return <>
        <div className="header-top">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        <div className="header-top-welcome text-center">
                            <p>Right now fully operational in Bengaluru!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <header className="header-part">
            <div className="container">
                <div className="header-content">
                    <div className="header-media-group">
                        <Link href="/"><img src={website.website_logo} alt="logo" /></Link
                        >
                        <button className="text-dark" onClick={toggleMobileDrawer}>
                            <i className="icofont-navigation-menu" />
                        </button>
                    </div>
                    <Link href="/" className="header-logo"
                    ><img src={website.website_logo} alt="logo" /></Link
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
                        <button className="header-widget header-cart" onClick={toggleDrawer} title="Cartlist">
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
                                <li className="navbar-item">
                                    <Link className="navbar-link" href="/category">products</Link>
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
                                    {websiteLoading ? <div className="blog-heading-loading"></div> : <p><small>call us</small><span>{website.phone}</span></p>}
                                </div>
                                <div className="navbar-info">
                                    <i className="icofont-ui-email"></i>
                                    {websiteLoading ? <div className="blog-heading-loading"></div> : <p><small>email us</small><span>{website.email}</span></p>}
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
            <CartComponent />
        </Drawer>
        <aside className={`nav-sidebar ${isMobileDrawerOpen && 'active'}`}>
            <div className="nav-header">
            <a href="#"><img src={website.website_logo} alt="logo" /></a
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
                        <Link className="nav-link" href="/category"><i className="icofont-page"></i>products</Link>
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
        <div className="cart-fixed">
            <button className="header-widget header-cart header-cart-desktop" onClick={toggleDrawer} title="Cartlist">
                <i className="fas fa-shopping-basket"></i><sup>{cart.cart.length}</sup>
            </button>
            <Link href={`/cart`} className="header-widget header-cart header-cart-mobile" title="Cartlist">
                <i className="fas fa-shopping-basket"></i><sup>{cart.cart.length}</sup>
            </Link>
        </div>
    </>
}