import { useEffect } from "react"
import {useFirebase} from '../context/Firebase'
import { Table } from "react-bootstrap";

const Users = () => {
 const firebase = useFirebase();
 const {userList} = firebase;
 
 useEffect(() =>{
  
  console.log('user list',userList);
 },[userList])

  return (
    <>
      <h3 style={{textAlign:'center'}}>Users</h3>
      <div className="container">
      <Table triped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Hobby</th>
            <th>Has DL</th>
          </tr>
        </thead>
        {userList.map((user) => (<tbody key={user.data.id}>
          <tr>
            <td>{user.data.name}</td>
            <td>{user.data.age}</td>
            <td>{user.data.value}</td>
            <td>{user.data.hasDL}</td>
          </tr>
        </tbody>))}
        
      </Table>
      </div>
    
      </>
  )
}

export default Users