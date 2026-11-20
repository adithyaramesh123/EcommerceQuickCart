
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Products from './components/Products'
import Cart from './components/Cart'
import Home from './components/Home'
import Admindash from './components/Admindash'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/h'element={<Home/>}/>
        <Route path='/r' element={<Register />} />
        <Route path='/l' element={<Login />} />
        <Route path='/p' element={<Products />} />
        <Route path='/c' element={<Cart />} />
        <Route path='/admin' element={<Admindash />} />
        <Route path='/ad' element={<Admindash />} />
      </Routes>
    </div>
  )
}

export default App