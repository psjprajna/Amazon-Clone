import React from 'react'
import { Fade } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css'
import './HomePage.css';
import Product from './Product';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import { useStateValue } from '../StateProvider';
import AddProduct from './AddProduct';
import { firestore } from '../firebase'
import { useState } from 'react';
import { useEffect } from 'react';

const fadeImages = [
    'https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/gateway/placement/launch/All_Or_Nothing_Tottenham_Hotspur_S1/AONT_S1_GWBleedingHero_FT_COVIDUPDATE_XSite_1500X600_PV_en-GB._CB406302419_.jpg',
    'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Currency_v2_en_US_2x._CB428993290_.jpg',
    'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg'
];
 
function HomePage(){
    const [{list},dispatch]=useStateValue();
    const [orders,setOrders]=useState([])
    
    useEffect(()=>{
        firestore
        .collection("NewProduct")
        .orderBy('created','desc')
        .onSnapshot(snapshot => (
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
    },[])
    return (
        <div className="home"> 
            <Fade className="home-image">
                <img  src={fadeImages[0]} />
                <img  src={fadeImages[1]} />
                <img  src={fadeImages[2]} />  
            </Fade>

            <div className="home-row">
                <Product 
                    id="12345"
                    title="Iphone"
                    price={11.96}
                    image="data:image/jpeg;base64,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"
                    rating={5}
                />

                <Product 
                    id="123456"
                    title="Alexa"
                    price={20.05}
                    image="https://images-na.ssl-images-amazon.com/images/I/6182S7MYC2L._AC_UL320_SR320,320_.jpg"
                    rating={3}
                />
            </div>

            <div className="home-row">
                <Product 
                    id="123457"
                    title="Ipad"
                    price={7.87}
                    image="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-select-wifi-spacegray-201911_FMT_WHH?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1573825365923"
                    rating={4}
                />

                <Product 
                    id="123458"
                    title="Electric Mixer"
                    price={10.28}
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqZ0csFdv6KS6qacive3I6PrT2syuNFEuJvA&usqp=CAU"
                    rating={3}
                />

                <Product 
                    id="123459"
                    title="DSLR Camera"
                    price={35}
                    image="https://www.awesomedynamic.com/wp-content/uploads/2018/02/awesome-dynamic-amazon-product-photography-camera.png"
                    rating={2}
                />
            </div>

            <div className="home-row">
                <Product 
                    id="123450"
                    title="Smart TV"
                    price={40}
                    image="https://images-na.ssl-images-amazon.com/images/I/81vlA84pg6L._SX679_.jpg"
                    rating={4}
                />
            </div> 
         
            <div >
                {orders?.map(order => (
                    <AddProduct order={order}/>
                ))}
            </div>
            
            <ToastContainer/>
        </div>
    )
}
export default HomePage