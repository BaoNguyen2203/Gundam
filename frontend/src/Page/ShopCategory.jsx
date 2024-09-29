import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
/*import dropdown_icon from '../Components/Assets/dropdown_icon.png' */
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext);
  console.log(all_product); // Kiểm tra dữ liệu
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Đang Hiển Thị 1-12</span> trong số 36 sản phẩm
        </p>
        <div className="shopcategory-sort">
        <label for="sort-options">Sắp xếp theo </label>
        <select id="sort-options">
          <option value="price">Giá</option>
          <option value="popularity">Độ phổ biến</option>
          <option value="latest">Mới nhất</option>
      </select> 
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item,i)=>{
          if (props.category === item.category) {
            console.log(item.image); // Kiểm tra đường dẫn hình ảnh
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          }
          else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
      Khám Phá Thêm
      </div>
    </div>
  )
}

export default ShopCategory