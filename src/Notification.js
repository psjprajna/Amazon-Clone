import React from 'react'
import './Notification.css'
import { useStateValue } from './StateProvider';
function Notification({title, image}) {
    const [{list},dispatch]=useStateValue();
    return (
        <div className="notify">
            <div className="h3p">
                <h3>New Product Added:</h3>
            </div>
            <div className="ima">   
                <p>{title}</p>
                <img src={image}/>
            </div>
        </div>
    )
}

export default Notification
