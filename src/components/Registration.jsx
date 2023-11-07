import { useState } from "react";
import {useFirebase} from '../context/Firebase'
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const options = [

   { label: 'read', value: 'reading' },

   { label: 'sports', value: 'sports' },

   { label: 'food', value: 'food' },

 ];
const Registration = () => {
 const firebase = useFirebase()
 const navigate = useNavigate()
console.log('firebase',firebase)

 const [value, setValue] = useState('read');
 const [name,setName] = useState('')
 const [age,setAge] = useState('')
 const [hasDL,setHasDL] = useState('Yes')



 const handleChange = (event) => {

   setValue(event.target.value);

 };

 const handleSubmit = (e) => {
  e.preventDefault()
  console.log(name,age,hasDL,value)
  firebase.putData(`users/${name.replace(/\s+/g, '')+age+hasDL+value}`,{name,age,hasDL,value}).then((res)=> {
   console.log(res)
   navigate('/')
  })
  
  
 }

  return (
   
   <div className="container">
      <h1>Firebase Signup</h1>
      <form onSubmit={handleSubmit}>
      <table>
        <tbody>
        <tr>
          <td>Name:</td><td><input type='text' name="name" value={name} onChange={(e) => setName(e.target.value)}/></td>
          </tr>
          <tr>
           <td>Age:</td><td><input type='number' name="age" min='18' max='99' value={age} onChange={(e) => setAge(e.target.value)}/></td>
        </tr>
        <tr>
          <td>Driving Liscense:</td>
          <td>
            <input type="radio" value="Yes" name="dl" checked={hasDL === "Yes"}
            onChange={(e) => setHasDL(e.target.value)}/>Yes
            <input type="radio" value="No" name="dl" checked={hasDL === 'No' } onChange={(e) => setHasDL(e.target.value)}/>No
          </td>
        </tr>
        <tr>
           <td>Hobby:</td>
           <td><select value={value} onChange={handleChange}>
          
         {options.map((option) => (

           <option value={option.value} key={option.value}>{option.label}</option>

         ))}
        
        </select>
        </td>
        </tr>
        <tr>
          <td ><Button  variant="primary" type="submit" style={{marginRight:'15px'}}>Register</Button>
         </td>

        </tr>
        </tbody>
      </table>
      </form>
      </div>
   
  )
}

export default Registration