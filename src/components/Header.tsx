import Link from "next/link";
import { useState } from "react";
import Drawer from 'react-modern-drawer'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

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
                        <Link href="/login" className="header-widget" title="My Account"
                        ><img src="/images/user.png" alt="user" /><span>join</span></Link
                        >
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
                                    <Link className="navbar-link dropdown-arrow" href="#">categories</Link>
                                    <div className="megamenu">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-3">
                                                    <div className="megamenu-wrap">
                                                        <Link href='/category'><h5 className="megamenu-title">Category 1</h5></Link>
                                                        <ul className="megamenu-list">
                                                            <li>
                                                                <Link href="/sub-category">Sub Category 1</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/sub-category">Sub Category 2</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/sub-category">Sub Category 3</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/sub-category">Sub Category 4</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/sub-category">Sub Category 5</Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="megamenu-wrap">
                                                        <Link href='/category'><h5 className="megamenu-title">Category 2</h5></Link>
                                                        <ul className="megamenu-list">
                                                            <li>
                                                                <Link href="/sub-category">Sub Category 1</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/sub-category">Sub Category 2</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/sub-category">Sub Category 3</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/sub-category">Sub Category 4</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/sub-category">Sub Category 5</Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="megamenu-wrap">
                                                        <Link href='/category'><h5 className="megamenu-title">Category 3</h5></Link>
                                                        <ul className="megamenu-list">
                                                            <li>
                                                                <Link href="/sub-category">Sub Category 1</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/sub-category">Sub Category 2</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/sub-category">Sub Category 3</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/sub-category">Sub Category 4</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/sub-category">Sub Category 5</Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="megamenu-wrap">
                                                        <Link href='/category'><h5 className="megamenu-title">Category 4</h5></Link>
                                                        <ul className="megamenu-list">
                                                            <li>
                                                                <Link href="/sub-category">Sub Category 1</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/sub-category">Sub Category 2</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/sub-category">Sub Category 3</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/sub-category">Sub Category 4</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="/sub-category">Sub Category 5</Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
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
            className='bla bla bla'
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