import React from 'react';
import { useStateValue } from '../StateProvider';
import './Product.css'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';

export default function Product({id, title, rating, image, price }) {
    //Toast Notification
    const toastId = React.useRef(null);
    const Img = () =>
        <div className="toast">
            <img width={50} src={image} />
            <p style={{marginLeft:'15px'}}>{title}</p>
        </div>;
    const options = {
        autoClose: 5000, 
        type: toast.default, 
        hideProgressBar: true,
    };
    const showToast = () => {
        if(! toast.isActive(toastId.current)) {
            toastId.current = toast(<Img/>,options);
        }
    };

    const [{basket,list,user},dispatch]=useStateValue();
    const history = useHistory();
    //Remove Product
    const removeProduct = () => {
        dispatch({
            type:"REMOVE_PRODUCT",
            id:id, 
        })
    }

    //Add to basket
    const addtoBasket = () => {
        if(user)
        {
            dispatch({
                type:"ADD",
                item:{
                    id:id, 
                    title:title, 
                    rating:rating, 
                    image:image, 
                    price:price
                }
            })
            showToast();
        }
        else{
            history.push('/SignIn')
        }
    }
    return (
        <div className="product">
            <div className="product_info">
                <p>{title}</p>
                <p className="product_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product_rating">
                    {
                        Array(rating)
                        .fill()
                        .map((_)=>
                        (<p>⭐</p>))
                    }
                </div>
            </div>
            
            <img src={image} />
            <button onClick={addtoBasket} >Add to Cart</button>
            <div>
                { (user && user.email==="admin@gmail.com")?
                    (
                        <button onClick={removeProduct}>Remove Product</button>
                    ):
                    (
                      <> </>
                    ) 
                }
            </div>
        </div>
    )
}
