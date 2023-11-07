import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Users from './components/Users'
import Registration from './components/Registration'
import Signup from './components/Signup'
import Home from './components/Home'


function App() {
  return (
 <Router>
     <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/' element={<Users/>}/>
      <Route path='/reg' element={<Registration/>}/>
      <Route path='/home' element={<Home/>}/>

     </Routes>
    </Router>
    
  )
}

export default App
