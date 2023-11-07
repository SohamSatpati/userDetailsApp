import { useState } from "react"
import {useFirebase} from '../context/Firebase'
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";


const Signup = () => {
  const firebase = useFirebase();
  const navigate = useNavigate()
const [email,setEmail] = useState('')
 const [password,setPassword] = useState('')

  const handleSubmit = (e) => {
  e.preventDefault()
  firebase.signupUserWithEmailandPassword(email,password).then((res)=> {
   console.log(res)
   navigate('/login')
  })
 
  }

  return (
    
    <div className="container">
      <h3>Signup with Other</h3>
    
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
          <td ><Button variant="primary" type="submit" style={{marginRight:'15px'}}>Signup</Button>
          </td>

        </tr>
        </tbody>
      </table>
      </form>
      </div>
    
  )
}

export default Signup