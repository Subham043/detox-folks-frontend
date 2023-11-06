import Head from 'next/head'
import Hero from '@/components/Hero';
import { useContext, useState } from 'react';
import { CartContext } from '@/context/CartProvider';
import Link from 'next/link';
import BillingInformation from '@/components/BillingInformation';
import BillingAddress from '@/components/BillingAddress';
import Spinner from '@/components/Spinner';
import { api_routes } from '@/helper/routes';
import { useRouter } from 'next/router';
import { useAxiosPrivate } from '@/hook/useAxiosPrivate';
import CheckoutCartItemComponent from '@/components/CheckoutCartItemComponent';
import { useToast } from '@/hook/useToast';

const loadingArr = [1, 2, 3, 4]


export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [includeGst, setIncludeGst] = useState(false);
  const [modeOfPayment, setModeOfPayment] = useState('Cash On Delivery');
  const { cart, fetchCart, cartLoading } = useContext(CartContext);
  const router = useRouter();
  const [selectedBillingAddressData, setSelectedBillingAddressData] = useState<number>(0)
  const [selectedBillingInformationData, setSelectedBillingInformationData] = useState<number>(0)
  const axiosPrivate = useAxiosPrivate();
  const { toastSuccess, toastError } = useToast();

  const getSelectedBillingAddress = (data: number) => {
    setSelectedBillingAddressData(data)
  }
  
  const getSelectedBillingInformation = (data: number) => {
    setSelectedBillingInformationData(data)
  }
  
  const placeOrderHandler = async (data: any) => {
    if(selectedBillingAddressData===0){
      toastError('please add an address');
      return;
    }
    if(selectedBillingInformationData===0){
      toastError('please add an billing information');
      return;
    }
    if(!acceptTerms){
      toastError('please accept the terms & condition');
      return;
    }
    
    setLoading(true);
    try {
      const response = await axiosPrivate.post(api_routes.place_order, {
        billing_address_id: selectedBillingAddressData, 
        billing_information_id: selectedBillingInformationData, 
        order_mode: 'WEBSITE', 
        mode_of_payment: modeOfPayment, 
        accept_terms: acceptTerms ? 1 : 0, 
        include_gst: includeGst ? 1 : 0
      });
      if(modeOfPayment==='Cash On Delivery'){
        fetchCart();
        toastSuccess(response.data.message);
        router.push('/orders');
      }else{
        window.open(response.data?.order?.payment?.phone_pe_payment_link);
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        toastError(error?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };
  

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
                              cart.cart.map((item, i)=><CheckoutCartItemComponent {...item} index={i} key={i} />)
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
                        <div className="col-md-6 col-lg-3 alert fade show" onClick={()=>setModeOfPayment('Cash On Delivery')}>
                          <div className={`profile-card address payment-method-container ${modeOfPayment==='Cash On Delivery' ? 'active' : ''}`}>
                              <img src='/images/money.webp' className='payment-method-img' />
                              <h6 className='mb-0'>Cash On Delivery</h6>
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-3 alert fade show" onClick={()=>setModeOfPayment('Online - Phonepe')}>
                          <div className={`profile-card address payment-method-container ${modeOfPayment==='Online - Phonepe' ? 'active' : ''}`}>
                              <img src='/images/phonepe.webp' className='payment-method-img' />
                              <h6 className='mb-0'>Pay Online - Phonepe</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="checkout-check d-block">
                      <div className='d-flex mb-2'>
                        <input type="checkbox" id="checkout-gst" checked={includeGst} onChange={()=>setIncludeGst(!includeGst)} /><label
                          htmlFor="checkout-gst"
                        >Use GST Invoice.</label>
                      </div>
                      <div className='d-flex'>
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
