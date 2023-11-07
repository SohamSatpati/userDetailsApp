/* eslint-disable no-undef */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {createContext, useCallback, useContext, useEffect, useState} from 'react'
import {initializeApp} from 'firebase/app'
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup, onAuthStateChanged,signOut} from 'firebase/auth'
import {getDatabase,  onValue,  ref, set} from 'firebase/database'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  databaseURL:import.meta.env.VITE_DATABASEURI
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