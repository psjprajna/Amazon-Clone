import React from 'react'
import './HomePage.css';
import { useStateValue } from '../StateProvider';
import Product from './Product';
function AddProduct({order}) {
    return (
        <div className="home-row">
            {order.data.list?.map(item=>(
                <Product
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={Number(item.price)}
                    rating={Number(item.rating)}
                />
            ))
            }
        </div>
    )
}

export default AddProduct
//https://cdn.shopify.com/s/files/1/1821/3729/products/personalised-mens-wallet-with-charm-mens-wallet-14190065123467.jpg?v=1592125708
//https://images-na.ssl-images-amazon.com/images/I/41g45AWuyKL.jpg