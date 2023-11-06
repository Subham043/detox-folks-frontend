import Head from 'next/head'
import Hero from '@/components/Hero';
import useSWR from 'swr'
import { api_routes } from "@/helper/routes";
import { OrderResponseType } from "@/helper/types";
import Pagination from '@/components/Pagination';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useToast } from '@/hook/useToast';

const loadingArr = [1, 2, 3, 4, 5, 6]

export default function Products() {
    const [page, setPage] = useState("1")
    const { status, data: session } = useSession();
    const router = useRouter();
    const { toastSuccess } = useToast();
    let is_order_placed = router.query.order_placed;
    const { data:orders, isLoading:loading } = useSWR<OrderResponseType>(status==='authenticated' ? api_routes.place_order_paginate + `?total=8&page=${page}` : null);

    useEffect(() => {
      if(is_order_placed!==undefined && is_order_placed==='true'){
        toastSuccess("Order placed successfully.");
      }
    
      return () => {}
    }, [is_order_placed])

    return (
        <>
            <Head>
                <title>Parcelcounter - Orders</title>
                <meta name="description" content="Parcelcounter, headquartered in Bengaluru, is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware." />
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <Hero name='Orders' />

            <section className="inner-section orderlist-part">
                <div className="container">
                    {loading && <div className="row">
                        {
                            loadingArr.map( i => <div className="col-12 mb-2" key={i}>
                                <div className="blog-small-img-loading"></div>
                        </div>)
                        }
                    </div>}
                    <div className="row">
                        <div className="col-lg-12">
                            {
                                !loading && orders?.data.map((item, i)=><div className="orderlist" key={i}>
                                <div className="orderlist-head">
                                    <h5>order#{item.id}</h5>
                                    <h5>{item.statuses[item.statuses.length-1].status}</h5>
                                </div>
                                <div className="orderlist-body">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="order-track">
                                                <ul className="order-track-list">
                                                    <li className={`order-track-item ${item.statuses.map(it=>it.status).includes('PROCESSING') ? 'active' : ''}`}>
                                                        {item.statuses.map(it=>it.status).includes('PROCESSING') ? <i className="icofont-check"></i> : <i className="icofont-close"></i>}
                                                        <span>order processing</span>
                                                    </li>
                                                    <li className={`order-track-item ${item.statuses.map(it=>it.status).includes('CONFIRMED') ? 'active' : ''}`}>
                                                    {item.statuses.map(it=>it.status).includes('CONFIRMED') ? <i className="icofont-check"></i> : <i className="icofont-close"></i>}
                                                        <span>order confirmed</span>
                                                    </li>
                                                    <li className={`order-track-item ${item.statuses.map(it=>it.status).includes('OUT FOR DELIVERY') ? 'active' : ''}`}>
                                                    {item.statuses.map(it=>it.status).includes('OUT FOR DELIVERY') ? <i className="icofont-check"></i> : <i className="icofont-close"></i>}
                                                        <span>out for delivery</span>
                                                    </li>
                                                    <li className={`order-track-item ${item.statuses.map(it=>it.status).includes('DELIVERED') ? 'active' : ''}`}>
                                                    {item.statuses.map(it=>it.status).includes('DELIVERED') ? <i className="icofont-check"></i> : <i className="icofont-close"></i>}
                                                        <span>order delivered</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <ul className="orderlist-details">
                                                <li>
                                                    <h6>order id</h6>
                                                    <p>{item.id}</p>
                                                </li>
                                                {/* <li>
                                                    <h6>Total Item</h6>
                                                    <p>{item.products.length} Items</p>
                                                </li> */}
                                                <li>
                                                    <h6>Order Time</h6>
                                                    <p>{item.created_at}</p>
                                                </li>
                                                <li>
                                                    <h6>Payment Mode</h6>
                                                    <p>{item.payment.mode}</p>
                                                </li>
                                                <li>
                                                    <h6>Payment Status</h6>
                                                    <p>{item.payment.status}</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-4">
                                            <ul className="orderlist-details">
                                                <li>
                                                    <h6>Sub Total</h6>
                                                    <p>&#8377;{item.subtotal}</p>
                                                </li>
                                                {/* {
                                                    item.charges.map((itm, index)=><li key={index}>
                                                    <h6>{itm.charges_name}</h6>
                                                    <p>&#8377;{itm.charges_in_amount}</p>
                                                </li>)
                                                }
                                                <li>
                                                    <h6>TAX</h6>
                                                    <p>&#8377;{item.total_tax}</p>
                                                </li>
                                                <li>
                                                    <h6>discount</h6>
                                                    <p>&#8377;{item.discount_price}</p>
                                                </li> */}
                                                <li>
                                                    <h6>Delivery Charges</h6>
                                                    <p>FREE</p>
                                                </li>
                                                <li>
                                                    <h6>Total</h6>
                                                    <p>&#8377;{item.total_price}</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="orderlist-deliver main-orderlist-deliver">
                                                <h6>Delivery location</h6>
                                                <p>
                                                    {item.name}<br/>
                                                    {item.email}<br/>
                                                    {item.phone}<br/>
                                                </p>
                                                <p>
                                                    {item.address}, {item.city}, {item.state} - {item.pin}, {item.country}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="table-scroll">
                                                <table className="table-list">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Serial</th>
                                                            <th scope="col">Product</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Price</th>
                                                            <th scope="col">quantity</th>
                                                            <th scope="col">total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            item.products.map((itm, index) =><tr key={index}>
                                                            <td className="table-serial"><h6>{index+1}</h6></td>
                                                            <td className="table-image">
                                                                <img src={itm.image} alt="product" />
                                                            </td>
                                                            <td className="table-name"><h6>{itm.name}</h6></td>
                                                            <td className="table-price">
                                                                <h6>&#8377;{itm.discount_in_price}<small>/pieces</small></h6>
                                                            </td>
                                                            <td className="table-quantity"><h6>{itm.quantity}</h6></td>
                                                            <td className="table-brand"><h6>&#8377;{itm.amount}</h6></td>
                                                        </tr>)
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                            }
                        </div>
                    </div>
                    {orders?.meta && <Pagination {...orders?.meta} paginationHandler={setPage} />}
                </div>
            </section>

        </>
    )
}
