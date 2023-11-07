import { useEffect } from 'react';
import {useFirebase} from '../context/Firebase'
import { useNavigate } from 'react-router-dom';

const Home = () => {
 const firebase = useFirebase();
 const navigate = useNavigate();
 const {isLoggedIn, user,logout} = firebase;
 
 useEffect(() => {
  
  if(user === null){
   navigate('/login')
  }
 
 }, [logout, navigate, user])
 
  return (
   <>
   {isLoggedIn ? <p>{user.email}</p>: null}
   {isLoggedIn ? <button onClick={logout}>Logout</button>: ''}
   </>
    
  )
}

export default Home