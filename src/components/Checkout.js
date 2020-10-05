import React from 'react'
import { useStateValue } from '../StateProvider'
import './Checkout.css'
import CheckoutProduct from '../components/CheckoutProduct'
import SubTotal from './SubTotal';

export default function Checkout() {

    //Basket
    const [{basket}]=useStateValue();
    return (
        <div className="checkout">
            <div className="checkout_left">
                <img className="checkout_ad" 
                src="https://images-eu.ssl-images-amazon.com/images/G/02/Amazon-co-uk-hq/2018/img/Prime/XCM_Manual_1133281_gatewayRedesignAcq_1500x600_Prime_1133280_30free-1x_1534769204-jpg._CB484986347_.jpg"
                alt=""/>
            
                {basket?.length ===0 ? (
                    <div>
                        <h1> Your Shopping Basket Is Empty</h1>
                        <h2> Click Add to Cart to buy an item</h2>
                    </div>
                ) : (
                    <div>
                        <h1 className="checkout_title"> Your Shopping Basket</h1>
                        {basket.map(item=>(
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                )}
            </div>
            {basket.length>0 && (
                <div className="checkout_right">
                    <h1> SubTotal</h1>
                    <SubTotal/>
                </div>
            )}
        </div>
        
    )
}
