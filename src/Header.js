import React, { useState } from 'react'
import './Header.css'
import { Badge, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Tooltip, Button} from '@material-ui/core'
import { AccountCircle, Notifications, Search } from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useStateValue } from './StateProvider'; 
import { useHistory, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auth } from './firebase';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Header() {

    const history=useHistory()

    const handleMenuClose = (pageURL) => {
        history.push(pageURL);
    };

    const [{basket,list,user},dispatch]=useStateValue()

    const handleAuthentication =()=>{
        if(user){
        auth.signOut();
        }
    }

    const [open, setOpen] = React.useState(false);
    const [id, setId] = useState('') 
    const [title, setName] = useState('') 
    const [price, setPrice] = useState('') 
    const [rating, setRating] = useState('') 
    const [image, setImag] = useState('') 

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

    //Pop Window
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const addProduct = () => {
        if(id!=='' && title!=='' && rating!=='' && image!=='' && price!==''){
            dispatch({
                type:"ADD_PRODUCT",
                item:{
                    id:id, 
                    title:title, 
                    rating:rating, 
                    image:image, 
                    price:price
                }
            })
            setId('');
            setName('');
            setPrice('');
            setRating('');
            setImag('');
            //show toast
            showToast();
        }
        else{
            setId('');
            setName('');
            setPrice('');
            setRating('');
            setImag('');
        }
    }

    return (
        <div className="header">
            <div  className="header_options">
                <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                >
                    <MenuIcon />
                </IconButton>
            </div>
            <Link to='/'>
                <Tooltip title="Home" >
                    <img 
                    className="header_logo"
                    src="https://bloximages.chicago2.vip.townnews.com/kenoshanews.com/content/tncms/assets/v3/editorial/0/56/05663cea-77e2-5e21-8a79-53e9a96e9acc/5f1f3d4695a1a.image.jpg"
                    />
                </Tooltip>
            </Link>
            <div className="header_search">
                <input 
                className="search_input"
                type="text"
                />
                <Search className="search_icon"/>
            </div>
            <div className="header_nav">
                <div  className="header_options">
                    { (user && user.email==="admin@gmail.com")?
                    (
                        <span>
                            <Tooltip className="add" title="Add Product" aria-label="add">
                                <AddIcon onClick={handleClickOpen}/>
                            </Tooltip>
                            <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-slide-title"
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle id="form-dialog-title">Add Products</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Details of the products to be uploaded
                                    </DialogContentText>
                                    <div>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            label="Product id"
                                            type="text"
                                            fullWidth
                                            value={id} 
                                            onChange={(e) => setId(e.target.value)}
                                        />
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            label="Product name"
                                            type="text"
                                            fullWidth
                                            value={title} 
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            label="Product Price"
                                            type="number"
                                            fullWidth
                                            value={price} 
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            label="Product Rating"
                                            type="number"
                                            fullWidth
                                            value={rating} 
                                            onChange={(e) => setRating(e.target.value)}
                                        />
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            label="Product Image URL"
                                            type="text"
                                            fullWidth
                                            value={image} 
                                            onChange={(e) => setImag(e.target.value)}
                                        />
                                    </div>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={addProduct} color="primary">
                                        Save
                                    </Button>
                                    <Button onClick={handleClose} color="primary">
                                        Close
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </span>
                    ):
                    (
                        <div  className="header_options"/>
                    ) 
                    }  
                </div>
                <Link to={!user && '/SignIn'}>
                    <div className="header_options" onClick={handleAuthentication}>
                        <span className="line_one">
                            Hello {user? user.email.split('@')[0] :'Guest'}
                        </span>
                        <span className="line_two">
                            {user? 'Sign Out':'Sign In'}
                        </span>
                    </div>
                </Link>
                <div className="header_options">
                    <Link to={!user && '/SignIn'}>
                        <IconButton  color="inherit">
                            <Badge badgeContent={basket.length} color="white"onClick={() => handleMenuClose('/Checkout')}>
                                <ShoppingCartIcon className="shopping"/>
                            </Badge>
                        </IconButton>
                    </Link>
                </div>
                <div className="header_options">
                    <IconButton aria-label="show 17 new notifications" color="inherit">
                        <Badge badgeContent={list.length} color="secondary" >
                            <Notifications />
                        </Badge>
                    </IconButton>
                </div>
                <div className="header_options">
                    <IconButton edge="end" aria-label="account of current user" aria-haspopup="true" color="inherit">
                        <AccountCircle />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Header)