import Head from 'next/head'
import Hero from '@/components/Hero';
import Link from 'next/link';
import Layout from '@/components/Layout';


export default function Checkout() {
  return (
    <Layout>
      <Head>
        <title>Detox-Folks</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <Hero name='Checkout' />

      <section className="inner-section checkout-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="alert-info">
                <p>
                  Returning customer? <Link href="/login">Click here to login</Link>
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="account-card">
                <div className="account-title"><h4>Your order</h4></div>
                <div className="account-content">
                  <div className="table-scroll">
                    <table className="table-list">
                      <thead>
                        <tr>
                          <th scope="col">Serial</th>
                          <th scope="col">Product</th>
                          <th scope="col">Name</th>
                          <th scope="col">Price</th>
                          <th scope="col">brand</th>
                          <th scope="col">quantity</th>
                          <th scope="col">action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="table-serial"><h6>01</h6></td>
                          <td className="table-image">
                            <img src="https://static.vecteezy.com/system/resources/previews/016/694/735/original/tissue-with-transparent-background-png.png" alt="product" />
                          </td>
                          <td className="table-name"><h6>product name</h6></td>
                          <td className="table-price">
                            <h6>$19<small>/kilo</small></h6>
                          </td>
                          <td className="table-brand"><h6>Fresh Company</h6></td>
                          <td className="table-quantity"><h6>3</h6></td>
                          <td className="table-action">
                            <a
                              className="view"
                              href="#"
                              title="Quick View"
                              data-bs-toggle="modal"
                              data-bs-target="#product-view"
                            ><i className="fas fa-eye"></i></a
                            ><a className="trash" href="#" title="Remove Wishlist"
                            ><i className="icofont-trash"></i
                            ></a>
                          </td>
                        </tr>
                        <tr>
                          <td className="table-serial"><h6>02</h6></td>
                          <td className="table-image">
                            <img src="https://m.media-amazon.com/images/I/51pILIz20gL._SL1200_.jpg" alt="product" />
                          </td>
                          <td className="table-name"><h6>product name</h6></td>
                          <td className="table-price">
                            <h6>$19<small>/kilo</small></h6>
                          </td>
                          <td className="table-brand"><h6>Radhuni Masala</h6></td>
                          <td className="table-quantity"><h6>5</h6></td>
                          <td className="table-action">
                            <a
                              className="view"
                              href="#"
                              title="Quick View"
                              data-bs-toggle="modal"
                              data-bs-target="#product-view"
                            ><i className="fas fa-eye"></i></a
                            ><a className="trash" href="#" title="Remove Wishlist"
                            ><i className="icofont-trash"></i
                            ></a>
                          </td>
                        </tr>
                        <tr>
                          <td className="table-serial"><h6>03</h6></td>
                          <td className="table-image">
                            <img src="https://img.freepik.com/premium-photo/toothpicks-box-isolated-white_179068-1760.jpg?w=2000" alt="product" />
                          </td>
                          <td className="table-name"><h6>product name</h6></td>
                          <td className="table-price">
                            <h6>$19<small>/kilo</small></h6>
                          </td>
                          <td className="table-brand"><h6>Pran Prio</h6></td>
                          <td className="table-quantity"><h6>2</h6></td>
                          <td className="table-action">
                            <a
                              className="view"
                              href="#"
                              title="Quick View"
                              data-bs-toggle="modal"
                              data-bs-target="#product-view"
                            ><i className="fas fa-eye"></i></a
                            ><a className="trash" href="#" title="Remove Wishlist"
                            ><i className="icofont-trash"></i
                            ></a>
                          </td>
                        </tr>
                        <tr>
                          <td className="table-serial"><h6>04</h6></td>
                          <td className="table-image">
                            <img src="https://3.imimg.com/data3/RY/JL/MY-11348186/aluminium-foil-pouch-1000x1000.jpg" alt="product" />
                          </td>
                          <td className="table-name"><h6>product name</h6></td>
                          <td className="table-price">
                            <h6>$19<small>/kilo</small></h6>
                          </td>
                          <td className="table-brand"><h6>Real Food</h6></td>
                          <td className="table-quantity"><h6>3</h6></td>
                          <td className="table-action">
                            <a
                              className="view"
                              href="#"
                              title="Quick View"
                              data-bs-toggle="modal"
                              data-bs-target="#product-view"
                            ><i className="fas fa-eye"></i></a
                            ><a className="trash" href="#" title="Remove Wishlist"
                            ><i className="icofont-trash"></i
                            ></a>
                          </td>
                        </tr>
                        <tr>
                          <td className="table-serial"><h6>05</h6></td>
                          <td className="table-image">
                            <img src="https://5.imimg.com/data5/ANDROID/Default/2022/11/NH/SS/MO/4041306/product-jpeg-500x500.jpg" alt="product" />
                          </td>
                          <td className="table-name"><h6>product name</h6></td>
                          <td className="table-price">
                            <h6>$19<small>/kilo</small></h6>
                          </td>
                          <td className="table-brand"><h6>Rdhuni Company</h6></td>
                          <td className="table-quantity"><h6>7</h6></td>
                          <td className="table-action">
                            <a
                              className="view"
                              href="#"
                              title="Quick View"
                              data-bs-toggle="modal"
                              data-bs-target="#product-view"
                            ><i className="fas fa-eye"></i></a
                            ><a className="trash" href="#" title="Remove Wishlist"
                            ><i className="icofont-trash"></i
                            ></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="chekout-coupon">
                    <button className="coupon-btn">Do you have a coupon code?</button>
                    <form className="coupon-form">
                      <input
                        type="text"
                        placeholder="Enter your coupon code"
                      /><button type="submit"><span>apply</span></button>
                    </form>
                  </div>
                  <div className="checkout-charge">
                    <ul>
                      <li><span>Sub total</span><span>$267.45</span></li>
                      <li><span>delivery fee</span><span>$10.00</span></li>
                      <li><span>discount</span><span>$00.00</span></li>
                      <li>
                        <span>Total<small>(Incl. VAT)</small></span
                        ><span>$277.00</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="account-card">
                <div className="account-title"><h4>Delivery Schedule</h4></div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-md-6 col-lg-4 alert fade show">
                      <div className="profile-card schedule active">
                        <h6>express</h6>
                        <p>90 min express delivery</p>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 alert fade show">
                      <div className="profile-card schedule">
                        <h6>8am-10pm</h6>
                        <p>8.00 AM - 10.00 PM</p>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 alert fade show">
                      <div className="profile-card schedule">
                        <h6>Next day</h6>
                        <p>Next day or Tomorrow</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="account-card">
                <div className="account-title">
                  <h4>contact number</h4>
                  <button data-bs-toggle="modal" data-bs-target="#contact-add">
                    add contact
                  </button>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-md-6 col-lg-4 alert fade show">
                      <div className="profile-card contact active">
                        <h6>primary</h6>
                        <p>+8801838288389</p>
                        <ul>
                          <li>
                            <button
                              className="edit icofont-edit"
                              title="Edit This"
                              data-bs-toggle="modal"
                              data-bs-target="#contact-edit"
                            ></button>
                          </li>
                          <li>
                            <button
                              className="trash icofont-ui-delete"
                              title="Remove This"
                              data-bs-dismiss="alert"
                            ></button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 alert fade show">
                      <div className="profile-card contact">
                        <h6>secondary</h6>
                        <p>+8801941101915</p>
                        <ul>
                          <li>
                            <button
                              className="edit icofont-edit"
                              title="Edit This"
                              data-bs-toggle="modal"
                              data-bs-target="#contact-edit"
                            ></button>
                          </li>
                          <li>
                            <button
                              className="trash icofont-ui-delete"
                              title="Remove This"
                              data-bs-dismiss="alert"
                            ></button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 alert fade show">
                      <div className="profile-card contact">
                        <h6>secondary</h6>
                        <p>+8801747875727</p>
                        <ul>
                          <li>
                            <button
                              className="edit icofont-edit"
                              title="Edit This"
                              data-bs-toggle="modal"
                              data-bs-target="#contact-edit"
                            ></button>
                          </li>
                          <li>
                            <button
                              className="trash icofont-ui-delete"
                              title="Remove This"
                              data-bs-dismiss="alert"
                            ></button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="account-card">
                <div className="account-title">
                  <h4>delivery address</h4>
                  <button data-bs-toggle="modal" data-bs-target="#address-add">
                    add address
                  </button>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-md-6 col-lg-4 alert fade show">
                      <div className="profile-card address active">
                        <h6>Home</h6>
                        <p>
                          jalkuri, fatullah, narayanganj-1420. word no-09, road
                          no-17/A
                        </p>
                        <ul className="user-action">
                          <li>
                            <button
                              className="edit icofont-edit"
                              title="Edit This"
                              data-bs-toggle="modal"
                              data-bs-target="#address-edit"
                            ></button>
                          </li>
                          <li>
                            <button
                              className="trash icofont-ui-delete"
                              title="Remove This"
                              data-bs-dismiss="alert"
                            ></button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 alert fade show">
                      <div className="profile-card address">
                        <h6>Office</h6>
                        <p>
                          east tejturi bazar, dhaka-1200. word no-04, road
                          no-13/c, house no-4/b
                        </p>
                        <ul className="user-action">
                          <li>
                            <button
                              className="edit icofont-edit"
                              title="Edit This"
                              data-bs-toggle="modal"
                              data-bs-target="#address-edit"
                            ></button>
                          </li>
                          <li>
                            <button
                              className="trash icofont-ui-delete"
                              title="Remove This"
                              data-bs-dismiss="alert"
                            ></button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 alert fade show">
                      <div className="profile-card address">
                        <h6>Bussiness</h6>
                        <p>
                          kawran bazar, dhaka-1100. word no-02, road no-13/d,
                          house no-7/m
                        </p>
                        <ul className="user-action">
                          <li>
                            <button
                              className="edit icofont-edit"
                              title="Edit This"
                              data-bs-toggle="modal"
                              data-bs-target="#address-edit"
                            ></button>
                          </li>
                          <li>
                            <button
                              className="trash icofont-ui-delete"
                              title="Remove This"
                              data-bs-dismiss="alert"
                            ></button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="account-card mb-0">
                <div className="account-title">
                  <h4>payment option</h4>
                  <button data-bs-toggle="modal" data-bs-target="#payment-add">
                    add card
                  </button>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-md-6 col-lg-4 alert fade show">
                      <div className="payment-card payment active">
                        <img src="/images/payment/png/01.png" alt="payment" />
                        <h4>card number</h4>
                        <p>
                          <span>****</span><span>****</span><span>****</span
                          ><sup>1876</sup>
                        </p>
                        <h5>miron mahmud</h5>
                        <button
                          className="trash icofont-ui-delete"
                          title="Remove This"
                          data-bs-dismiss="alert"
                        ></button>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 alert fade show">
                      <div className="payment-card payment">
                        <img src="/images/payment/png/02.png" alt="payment" />
                        <h4>card number</h4>
                        <p>
                          <span>****</span><span>****</span><span>****</span
                          ><sup>1876</sup>
                        </p>
                        <h5>miron mahmud</h5>
                        <button
                          className="trash icofont-ui-delete"
                          title="Remove This"
                          data-bs-dismiss="alert"
                        ></button>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 alert fade show">
                      <div className="payment-card payment">
                        <img src="/images/payment/png/03.png" alt="payment" />
                        <h4>card number</h4>
                        <p>
                          <span>****</span><span>****</span><span>****</span
                          ><sup>1876</sup>
                        </p>
                        <h5>miron mahmud</h5>
                        <button
                          className="trash icofont-ui-delete"
                          title="Remove This"
                          data-bs-dismiss="alert"
                        ></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="checkout-check">
                  <input type="checkbox" id="checkout-check" /><label
                    htmlFor="checkout-check"
                  >By making this purchase you agree to our
                    <a href="#">Terms and Conditions</a>.</label
                  >
                </div>
                <div className="checkout-proced">
                  <a href="invoice.html" className="btn btn-inline"
                  >proced to checkout</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="modal fade" id="contact-add">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <button className="modal-close" data-bs-dismiss="modal">
              <i className="icofont-close"></i>
            </button>
            <form className="modal-form">
              <div className="form-title"><h3>add new contact</h3></div>
              <div className="form-group">
                <label className="form-label">title</label
                ><select className="form-select">
                  <option selected>choose title</option>
                  <option value="primary">primary</option>
                  <option value="secondary">secondary</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">number</label
                ><input
                  className="form-control"
                  type="text"
                  placeholder="Enter your number"
                />
              </div>
              <button className="form-btn" type="submit">save contact info</button>
            </form>
          </div>
        </div>
      </div>
      <div className="modal fade" id="address-add">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <button className="modal-close" data-bs-dismiss="modal">
              <i className="icofont-close"></i>
            </button>
            <form className="modal-form">
              <div className="form-title"><h3>add new address</h3></div>
              <div className="form-group">
                <label className="form-label">title</label
                ><select className="form-select">
                  <option selected>choose title</option>
                  <option value="home">home</option>
                  <option value="office">office</option>
                  <option value="Bussiness">Bussiness</option>
                  <option value="academy">academy</option>
                  <option value="others">others</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">address</label
                ><textarea
                  className="form-control"
                  placeholder="Enter your address"
                ></textarea>
              </div>
              <button className="form-btn" type="submit">save address info</button>
            </form>
          </div>
        </div>
      </div>
      <div className="modal fade" id="payment-add">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <button className="modal-close" data-bs-dismiss="modal">
              <i className="icofont-close"></i>
            </button>
            <form className="modal-form">
              <div className="form-title"><h3>add new payment</h3></div>
              <div className="form-group">
                <label className="form-label">card number</label
                ><input
                  className="form-control"
                  type="text"
                  placeholder="Enter your card number"
                />
              </div>
              <button className="form-btn" type="submit">save card info</button>
            </form>
          </div>
        </div>
      </div>
      <div className="modal fade" id="contact-edit">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <button className="modal-close" data-bs-dismiss="modal">
              <i className="icofont-close"></i>
            </button>
            <form className="modal-form">
              <div className="form-title"><h3>edit contact info</h3></div>
              <div className="form-group">
                <label className="form-label">title</label
                ><select className="form-select">
                  <option value="primary" selected>primary</option>
                  <option value="secondary">secondary</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">number</label
                ><input className="form-control" type="text" defaultValue="+8801838288389" />
              </div>
              <button className="form-btn" type="submit">save contact info</button>
            </form>
          </div>
        </div>
      </div>
      <div className="modal fade" id="address-edit">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <button className="modal-close" data-bs-dismiss="modal">
              <i className="icofont-close"></i>
            </button>
            <form className="modal-form">
              <div className="form-title"><h3>edit address info</h3></div>
              <div className="form-group">
                <label className="form-label">title</label
                ><select className="form-select">
                  <option value="home" selected>home</option>
                  <option value="office">office</option>
                  <option value="Bussiness">Bussiness</option>
                  <option value="academy">academy</option>
                  <option value="others">others</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">address</label
                ><textarea
                  className="form-control"
                  placeholder="jalkuri, fatullah, narayanganj-1420. word no-09, road no-17/A"
                ></textarea>
              </div>
              <button className="form-btn" type="submit">save address info</button>
            </form>
          </div>
        </div>
      </div>

    </Layout>
  )
}
