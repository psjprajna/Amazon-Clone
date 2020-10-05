import React, {useState}from 'react';
import { fade, makeStyles,useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import {useStateValue} from './StateProvider'; 
import { useHistory, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auth } from './firebase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Header.css'
import { Notifications } from '@material-ui/icons';
import { Divider, Drawer } from '@material-ui/core';
import List from '@material-ui/core/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Notification from './Notification';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    top: theme.spacing(2),
    right: theme.spacing(2),
    
  },
  logo: {
    height:'7ch',
    width: '15ch',
  },
  grow: {
    position: 'sticky',
    flex: 1,
    zIndex:100,
    top:10,
    justifyContent:'space-evenly'
  },
  menuButton: {
    marginRight: theme.spacing(2), 
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '60ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  header_option:{
    display:'flex',
    flexDirection:'column',
    marginLeft:'10px',
    marginRight:'10px',
    color:'white',
  },
  line_one:{
    fontSize:'10px',
  },
  line_two:{
    fontSize:'13px',
    fontWeight:'800',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 40,
    zIndex: 1,
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const PrimarySearchAppBar = props => {
  const history=useHistory()
  const classes = useStyles();
  const theme = useTheme();

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
      if(id!=='' && title!=='' && rating!=='' && Number(rating)<6 && image!=='' && price!==''){
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
  //Sliding Navigation
  const [opens, setOpend] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpend(true);
  };

  const handleDrawerClose = () => {
    setOpend(false);
  };

  //Notification
  const [opend, setOpens] = React.useState(false);

  const handleClick = () => {
    setOpens((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpens(false);
  };
  
  return (
    <div className={classes.grow, "header"}>
      <AppBar style={{background: '#131921'}}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Link to='/'>
            <Tooltip title="Home" >
              <div>
                <img 
                src="https://bloximages.chicago2.vip.townnews.com/kenoshanews.com/content/tncms/assets/v3/editorial/0/56/05663cea-77e2-5e21-8a79-53e9a96e9acc/5f1f3d4695a1a.image.jpg" 
                alt='imag'
                className={classes.logo} />
              </div>
            </Tooltip>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div className="header_nav">
              <div  className="header_options">
                  { (user && user.email==="admin@gmail.com")?
                  (
                      <span>
                        <IconButton aria-label="show 17 new notifications" color="inherit" >
                          <Badge color="secondary" >
                            <Tooltip title="Add Product" aria-label="add">
                              <AddIcon onClick={handleClickOpen}/>
                            </Tooltip>
                          </Badge>
                        </IconButton>
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
                                          inputProps={{ min: "0", step: "1" }}
                                          fullWidth
                                          value={price} 
                                          onChange={(e) => setPrice(e.target.value)}
                                      />
                                      <TextField
                                          autoFocus
                                          margin="dense"
                                          label="Product Rating"
                                          type="number"
                                          placeholder="Number should be between 0 and 5"
                                          inputProps={{ min: "0", max: "5", step: "1" }}
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
                      <IconButton aria-label="show 17 new notifications" color="inherit"  onClick={() => handleMenuClose('/Checkout')}>
                            <Badge badgeContent={basket.length} color="secondary" >
                                <ShoppingCartIcon style={{color:"white"}}/>
                            </Badge>
                      </IconButton>
                    </Link>
                </div>
                <div className="header_options">
                  <ClickAwayListener
                    mouseEvent="onMouseDown"
                    touchEvent="onTouchStart"
                    onClickAway={handleClickAway}
                  >
                    <div className={classes.root}>
                      <IconButton aria-label="show 17 new notifications" color="inherit" onClick={handleClick}>
                          <Badge badgeContent={list.length} color="secondary" >
                              <Notifications />
                          </Badge>
                      </IconButton>
                      {(opend && list.length!==0 )? (
                        <div className={classes.dropdown} style={{color:"black"}}>
                          {list.map(item=>(
                            <Notification
                              title={item.title}
                              image={item.image}
                            />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </ClickAwayListener>
                </div>
                <div className="header_options">
                    <IconButton edge="end" aria-label="account of current user" aria-haspopup="true" color="inherit">
                        <AccountCircle />
                    </IconButton>
                </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={opens}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  );
}
export default withRouter(PrimarySearchAppBar);