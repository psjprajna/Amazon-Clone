import React, { useEffect, useState } from 'react'
import './Payment.css'
import {useStateValue} from '../StateProvider'; 
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from "react-router-dom";
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../reducer';

function Payment() {

    const history=useHistory();
    const [{basket,user}]=useStateValue();
    const stripe=useStripe()
    const elements=useElements()
    const [processing, setProcessing]=useState("")
    const [succeeded, setSucceeded]=useState(false)
    const [error, setError]=useState(null)
    const [disabled, setDisabled]=useState(true)
    const [clientSecret, setClientSecret]=useState(true)

    useEffect(() =>{
        const getClientSecret= async () => {
           // const response= await axios
        }
        getClientSecret()
    },[basket])

    const handleSubmit= async (event)=> {
        event.preventDefault()
        setProcessing(true)

        const payload= await stripe
    }

    const handleChange= event => {
        setDisabled(event.empty);
        setError(event.error? event.error.message : "")
    }
    
    return (
        <div className="payment">
            <div className="pay_container">
                
                <h1>Checkout ( <Link to='/checkout'> {basket?.length} items </Link>) </h1>
            
                <div className="pay_section">    
                    <div className="pay_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="pay_address">
                        <p>{user?.email}</p>
                        <p>Bangalore, India</p>
                    </div>
                </div>
                <div className="pay_section">
                    <div className="pay_title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="pay_items">
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
                </div>
                <div className="pay_section">
                    <div className="pay_title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="pay_details">
                        <h3>Card Details</h3>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="details">
                            <CurrencyFormat 
                                    renderText={(value) => (
                                        <>
                                            <p>
                                                Order Total: <strong>{value}</strong>
                                            </p>
                                        </>
                                    )}
                                    decimalScale={2} 
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button
                                    disabled={processing || disabled || succeeded}
                                    onClick={e => history.push("/payment")}>
                                       <span>
                                           {processing ? <p>Processing</p>: "Buy Now"}
                                        </span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
