import { useEffect, useState } from "react"
import {useFirebase} from '../context/Firebase'
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Login = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email,setEmail] = useState('')
 const [password,setPassword] = useState('')

  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to home
      navigate("/home");
    }
  }, [firebase, navigate]);

  const handleSubmit = (e) => {
  e.preventDefault()
  firebase.createUserWithEmailandPassword(email,password).then((res)=> {
   console.log(res)
   navigate('/home')
  })
  }
  

  return (
    <div className="container">
    <h1 style={{textAlign:'center'}}>Login</h1>
         <div style={{marginBottom:'10px'}}>
       <Button variant="outline-success" onClick={() => navigate('/signup')} style={{marginRight:'15px'}}>Signup with other</Button>
       <Button variant="outline-danger" onClick={firebase.signinWithGoogle}>Signup with Google</Button>
      </div>
      <div >
     <form onSubmit={handleSubmit}>
      <table>
        <tbody>
        <tr>
          <td>Email:</td><td><input type='email' name="email" value={email} onChange={(e) => setEmail(e.target.value)}/></td>
          </tr>
          <tr>
           <td>Password:</td><td><input type='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)}/></td>
        </tr>
        
        <tr>
          <td >
            <Button variant="primary" type="submit" style={{marginRight:'15px'}}>Login</Button>
          </td>

        </tr>
        </tbody>
      </table>
      </form>
      </div>
    </div>
  )
}

export default Login