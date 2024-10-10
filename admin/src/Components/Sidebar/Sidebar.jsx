import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg'
import user_list_icon from '../../assets/user_list_icon.png'

const Sidebar = () => {
  return (
    <div className="sidebar">
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={add_product_icon} alt="" />
                <p>Thêm Sản Phẩm</p>
            </div>
        </Link>
        <Link to={'/listproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={list_product_icon} alt="" />
                <p>Danh Sách Sản Phẩm</p>
            </div>
        </Link>
        <Link to={'/listusers'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={user_list_icon} alt="" />
                <p>Danh Sách Tài Khoản</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar