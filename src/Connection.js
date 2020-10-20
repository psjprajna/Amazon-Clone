import React,{useEffect}  from 'react';
import Login from './components/Login'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from "@material-ui/core/CssBaseline";
import HomePage from './components/HomePage';
import AP from './AP';
import Checkout from './components/Checkout'
import Payment from './components/Payment'
import Orders from './components/Orders'
import { useStateValue} from '../src/StateProvider';
import {auth} from './firebase';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

const promise =loadStripe('pk_test_51HTrqiCQYAsE5Nl15JMg6qEOUbyeXfJEbN7pimgyY0fgawEGyHOhXpaIsxLrR7M0XxQ1gf8Tb84NByGt2DdPeZex00GJFtHAWF')

export default function Connection() {
    const[{},dispatch]=useStateValue();

    useEffect(() => {
        auth.onAuthStateChanged(authUser => { 

            if(authUser){
                dispatch({
                    type:'SET_USER',
                    user:authUser
                })
            }
            else{
                dispatch({
                    type:'SET_USER',
                    user:null
                })
            }
        })
    }, [])
    return (
        <BrowserRouter>
            <CssBaseline/>
            <Switch>
                <Route path='/' exact component={HomePage}>
                        <AP/>
                        <HomePage />
                </Route>
                <Route path='/SignIn' component={Login}/>
                <Route path='/Checkout' component={Checkout}>
                    <AP/>
                    <Checkout/>
                </Route>
                <Route path='/payment' component={Payment}>
                    <AP/>
                    <Elements stripe={promise}>
                        <Payment/>
                    </Elements>
                </Route>
                <Route path='/orders' exact component={Orders}>
                        <AP/>
                        <Orders />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}


//firebase init hosting build  no npm run build && firebase deploy --only hosting