import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import ListUsers from '../../Components/ListUsers/ListUsers'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './Admin.css'
import { Routes,Route } from 'react-router-dom'

const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
            <Route path='/addproduct' element={<AddProduct/>}/>
            <Route path='/listproduct' element={<ListProduct/>}/>
            <Route path='/listusers' element={<ListUsers/>}/>
        </Routes>
    </div>
  )
}

export default Admin