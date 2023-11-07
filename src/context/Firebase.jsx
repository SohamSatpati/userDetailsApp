/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {createContext, useCallback, useContext, useEffect, useState} from 'react'
import {initializeApp} from 'firebase/app'
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup, onAuthStateChanged,signOut} from 'firebase/auth'
import {getDatabase,  onValue,  ref, set} from 'firebase/database'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1VLLw8YSrhkM4lEThOEitP8owydGSuKk",
  authDomain: "userdetailsapp-f86da.firebaseapp.com",
  projectId: "userdetailsapp-f86da",
  storageBucket: "userdetailsapp-f86da.appspot.com",
  messagingSenderId: "1076826158502",
  appId: "1:1076826158502:web:d955697f151564907d4b67",
  databaseURL:'https://userdetailsapp-f86da-default-rtdb.firebaseio.com/'
};
const FirebaseContext = createContext(null);
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDB = getDatabase(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext)

export  const FirebaseProvider = (props) =>{

  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState([]);

  

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);


 const signupUserWithEmailandPassword = (email,password) => {
  return signInWithEmailAndPassword(firebaseAuth,email,password).then((val) => console.log('signin success',val)).catch((err) => console.log('signin error',err))
 }

  const createUserWithEmailandPassword = (email,password) => {
  return createUserWithEmailAndPassword(firebaseAuth,email,password).then((val) => {
    console.log('signin success',val)
    
  }).catch((err) => console.log('signin error',err))
 }

 const signinWithGoogle = () =>{
  return signInWithPopup(firebaseAuth,googleProvider)
 }

 const isLoggedIn = user ? true : false;

 const logout = () => {
  return signOut(firebaseAuth)
 }


const getData = useCallback(() =>{
  const dbref = ref(firebaseDB,'users');

  return onValue(dbref,(snapshot) =>{
    let records = [];
    snapshot.forEach(childSnapShot =>{
      let keyName = childSnapShot.key;
      let data = childSnapShot.val();
      records.push({"key":keyName,"data":data});
    });
    setUserList(records)
  })
},[])

  useEffect(() =>{
    getData()
  },[getData])

 const putData = (key,data) => set(ref(firebaseDB,key),data).then(() => {
  return 'inserted'
})
.catch((err) => console.log('err',err));

 return(
  <FirebaseContext.Provider value={{signupUserWithEmailandPassword, putData,createUserWithEmailandPassword, signinWithGoogle,isLoggedIn, user, logout,userList }}>
   {props.children}
   </FirebaseContext.Provider>)
}