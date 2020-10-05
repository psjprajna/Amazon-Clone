import React,{useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import './App.scss';
import Signin from './components/login/Signin';
import Signup from './components/login/Signup';
import  Userinfo  from './components/login/UserInfo';
import { Link } from 'react-router-dom';
import {auth, createUserProfileDocument} from "./firebase"

function App() {
  const [currentUser,setCurrentUser] = useState();
  const history=useHistory();

  useEffect(() => {
    auth.onAuthStateChanged( async userAuth => {
      if(userAuth) {
        const user = await createUserProfileDocument(userAuth);
        return user?.onSnapshot((snapshot) => {
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    })
  },[])
  return (
    <div className="App">
      <div className="container">
      <Signin />
      <Signup />
      </div>
      <hr></hr>
      <Userinfo currentUser={currentUser} />
      <hr></hr>
      <Link to ='/'>Home Page</Link>
    </div>
  );
}

export default App;