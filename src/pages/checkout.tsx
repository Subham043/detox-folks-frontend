import Head from 'next/head'
import Hero from '@/components/Hero';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/context/CartProvider';
import Link from 'next/link';
import BillingInformation from '@/components/BillingInformation';
import BillingAddress from '@/components/BillingAddress';
import { ToastOptions, toast } from 'react-toastify';
import Spinner from '@/components/Spinner';
import { axiosPublic } from '../../axios';
import { api_routes } from '@/helper/routes';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';

const loadingArr = [1, 2, 3, 4]

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


export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [includeGst, setIncludeGst] = useState(false);
  const { cart, getCart, deleteItemCart, cartLoading } = useContext(CartContext);
  const { status, data: session } = useSession();
  const router = useRouter();
  const [selectedBillingAddressData, setSelectedBillingAddressData] = useState<number>(0)
  const [selectedBillingInformationData, setSelectedBillingInformationData] = useState<number>(0)

  const getSelectedBillingAddress = (data: number) => {
    setSelectedBillingAddressData(data)
  }
  
  const getSelectedBillingInformation = (data: number) => {
    setSelectedBillingInformationData(data)
  }
  
  const placeOrderHandler = async (data: any) => {
    if(selectedBillingAddressData===0){
      toast.error('please add an address', toastConfig);
      return;
    }
    if(selectedBillingInformationData===0){
      toast.error('please add an billing information', toastConfig);
      return;
    }
    if(!acceptTerms){
      toast.error('please accept the terms & condition', toastConfig);
      return;
    }
    const post_pe_data = {
      "merchantId": "MERCHANTUAT",
      "merchantTransactionId": "MT7850590068188104",
      "merchantUserId": "MUID123",
      "amount": 10000,
      "redirectUrl": "https://webhook.site/redirect-url",
      "redirectMode": "REDIRECT",
      "callbackUrl": "https://webhook.site/callback-url",
      "mobileNumber": "9999999999",
      "paymentInstrument": {
        "type": "PAY_PAGE"
      }
    };
    var encoded = btoa(JSON.stringify(post_pe_data))
    console.log(encoded);
    
    var options = {
      method: 'POST',
      url: 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      data: {request: encoded}
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
    // setLoading(true);
    // try {
    //   const response = await axiosPublic.post(api_routes.place_order, {billing_address_id: selectedBillingAddressData, billing_information_id: selectedBillingInformationData, mode_of_payment: 'Cash On Delivery', accept_terms: acceptTerms ? 1 : 0, include_gst: includeGst ? 1 : 0}, {
    //     headers: {"Authorization" : `Bearer ${session?.user.token}`}
    //   });
    //   getCart();
    //   toast.success(response.data.message, toastConfig);
    //   router.push('/orders');
    // } catch (error: any) {
    //   console.log(error);
    //   if (error?.response?.data?.message) {
    //     toast.error(error?.response?.data?.message, toastConfig);
    //   }
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(()=>{
    getCart();
  }, [status])
  

  return (
    <>
      <Head>
        <title>Parcelcounter - Checkout</title>
        <meta name="description" content="Parcelcounter, headquartered in Bengaluru, is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware." />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Hero name='Checkout' />

      <section className="inner-section checkout-part">
        <div className="container">
          {cartLoading && <div className="row">
            {
                loadingArr.map( i => <div className="col-12 mb-2" key={i}>
                    <div className="blog-small-img-loading"></div>
            </div>)
            }
          </div>}
          {
            !cartLoading && <>
              {(cart.cart.length>0) ? <div className="row">
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
                              <th scope="col">quantity</th>
                              <th scope="col">Total</th>
                              <th scope="col">action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              cart.cart.map((item, i)=><tr key={i}>
                              <td className="table-serial"><h6>{i+1}</h6></td>
                              <td className="table-image">
                                <img src={item.product.image} alt="product" />
                              </td>
                              <td className="table-name"><h6>{item.product.name}</h6></td>
                              <td className="table-price">
                                {
                                  item.product_price && <h6>
                                      <span>&#8377;{item.product_price.discount_in_price}<small>/{item.product.cart_quantity_specification}</small></span>
                                  </h6>
                                }
                              </td>
                              <td className="table-quantity"><h6>{item.quantity}</h6></td>
                              <td className="table-brand"><h6>&#8377;{item.amount}</h6></td>
                              <td className="table-action">
                                <Link
                                  className="view"
                                  href={`/products/${item.product.slug}`}
                                  title="Quick View"
                                  data-bs-toggle="modal"
                                  data-bs-target="#product-view"
                                ><i className="fas fa-eye"></i></Link
                                ><button className="trash" title="Remove Wishlist" disabled={cartLoading} onClick={()=>deleteItemCart(item.id)}
                                ><i className="icofont-trash"></i
                                ></button>
                              </td>
                            </tr>)
                            }
                          </tbody>
                        </table>
                      </div>
                      <div className="checkout-charge">
                        <p className='fs-7-note text-center'>Note: Prices are inclusive of GST.</p>
                        <ul>
                          <li><span>Sub total</span><span>&#8377;{cart.cart_subtotal}</span></li>
                          <li><span className="p-relative">
                            Delivery Charges
                            </span><span><b></b> FREE</span></li>
                          <li>
                            <span>Total</span
                            ><span>&#8377;{cart.total_price}</span>
                          </li>
                        </ul>
                        <p className='text-center'><code>Note :</code> <span>You have realized a minimum savings of 20% - 25% on your standard purchase when compared to retail price.</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <BillingInformation getSelectedItem={getSelectedBillingInformation} />
                </div>
                <div className="col-lg-12">
                  <BillingAddress getSelectedItem={getSelectedBillingAddress} />
                </div>
                <div className="col-lg-12">
                  <div className="account-card mb-0">
                    <div className="account-title">
                      <h4>payment option</h4>
                    </div>
                    <div className="account-content">
                      <div className="row">
                        <div className="col-md-6 col-lg-3 alert fade show">
                          <div className="profile-card address active">
                              <h6>Cash On Delivery</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="checkout-check d-block">
                      <div>
                        <input type="checkbox" id="checkout-gst" checked={includeGst} onChange={()=>setIncludeGst(!includeGst)} /><label
                          htmlFor="checkout-gst"
                        >Use GST Invoice.</label>
                      </div>
                      <div>
                        <input type="checkbox" id="checkout-check" checked={acceptTerms} onChange={()=>setAcceptTerms(!acceptTerms)} /><label
                          htmlFor="checkout-check"
                        >By making this purchase you agree to our&nbsp; 
                          <Link href="/legal/terms-condition">Terms and Conditions</Link>.</label
                        >
                      </div>
                    </div>
                    <div className="checkout-proced col-lg-2 col-md-3 col-sm-12">
                      <button className="btn btn-inline" disabled={loading} onClick={placeOrderHandler}
                      >
                        { loading ? <Spinner /> : <>
                          Place Order
                        </>}
                      </button>
                    </div>
                  </div>
                </div>
              </div> : 
              <p className='text-center'>No items are there in cart. Kindly add one!</p>
            }
            </>
          }
        </div>
      </section>

    </>
  )
}
