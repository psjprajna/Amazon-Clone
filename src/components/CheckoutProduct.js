import React from 'react'
import { useStateValue } from '../StateProvider';
import './CheckoutProduct.css'

function CheckoutProduct({id, title, rating, image, price }) {

    const [{basket},dispatch]=useStateValue();
    const remove = () => {
        dispatch({
            type:"REMOVE",
            id:id, 
        })
    }
    return (
        <div className="check">
            <img className="check_img" src={image} alt=""/>
            <div className="check_info">
                <p className="check_title">{title}</p>
                <p className="check_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="check_rating">
                    {
                        Array(rating)
                        .fill()
                        .map((_,i)=>
                        (<p>⭐</p>))
                    }
                </div>
                <button onClick={remove}>Remove from cart</button>
            </div>   
        </div>
    )
}

export default CheckoutProduct
