import Head from 'next/head'
import Hero from '@/components/Hero';
import { useContext } from 'react';
import { WishlistContext } from '@/context/WishlistProvider';
import Link from 'next/link';


export default function Wishlist() {
  const { wishlist, addItemWishlist, deleteItemWishlist, wishlistLoading } = useContext(WishlistContext);

  return (
    <>
      <Head>
        <title>Parcelcounter - Wishlist</title>
        <meta name="description" content="Parcelcounter, headquartered in Bengaluru, is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware." />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Hero name='Wishlist' />

      <section className="inner-section wishlist-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {wishlist.wishlist.length>0 ? <div className="table-scroll">
                <table className="table-list">
                  <thead>
                    <tr>
                      <th scope="col">Serial</th>
                      <th scope="col">Product</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">description</th>
                      <th scope="col">action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      wishlist.wishlist.map((item, i) => <tr key={i}>
                        <td className="table-serial"><h6>{i + 1}</h6></td>
                        <td className="table-image">
                          <img src={item.product.image} alt="product" />
                        </td>
                        <td className="table-name"><h6>{item.product.name}</h6></td>
                        <td className="table-price">
                          {
                            item.product.product_prices.length > 0 && <h6>&#8377;{item.product.product_prices[item.product.product_prices.length - 1].discount_in_price}<small>/pieces</small></h6>
                          }
                        </td>
                        <td className="table-desc">
                          <p>
                            {item.product.short_description}<Link href={`/products/${item.product.slug}`}>read more</Link>
                          </p>
                        </td>
                        <td className="table-action">
                          <Link
                            className="view"
                            href={`/products/${item.product.slug}`}
                            title="Quick View"
                            data-bs-toggle="modal"
                            data-bs-target="#product-view"
                          ><i className="fas fa-eye"></i></Link
                          ><button className="trash" disabled={wishlistLoading} onClick={() => deleteItemWishlist(item.id)} title="Remove Wishlist"
                          ><i className="icofont-trash"></i
                          ></button>
                        </td>
                      </tr>)
                    }
                  </tbody>
                </table>
              </div> : <p className='text-center'>No items are there in wishlist. Kindly add one!</p>}
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
