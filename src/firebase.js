import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDWImK8lU128TUuEg_Z4kUVrXfyydqpPJk",
  authDomain: "react-firebase-auth-6db2a.firebaseapp.com",
  databaseURL: "https://react-firebase-auth-6db2a.firebaseio.com",
  projectId: "react-firebase-auth-6db2a",
  storageBucket: "react-firebase-auth-6db2a.appspot.com",
  messagingSenderId: "1002316666880",
  appId: "1:1002316666880:web:f7bc9c490c31c23af960e5"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);
const auth=firebaseApp.auth();
const firestore = firebaseApp.firestore();
export{auth, firestore};

/** To sign up using google
 * Link for developer documentation (https://firebase.google.com/docs/auth/web/google-signin)
 */

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  promt: "select_account",
});

// Check if user exists if not create a user
export const createUserProfileDocument =async (userAuth) => {
  if(!userAuth) return;

  const userReference =  firestore.doc(`users/${userAuth.uid}`);
  const snapShot =  await userReference.get();
  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await userReference.set({
        displayName,
        email,
        createdAt
      })
    } 
    catch (error) {
        console.log(error)
    }
  }
  return userReference;
}

export const signInWithGoogle = () => auth.signInWithPopup(provider);