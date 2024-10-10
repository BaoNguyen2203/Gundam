import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import axios from 'axios'; // Thêm axios để gọi API

const CartItems = () => {
  const {getTotalCartAmount, all_product, cartItems, removeFromCart} = useContext(ShopContext);
  const [message, setMessage] = useState(''); // Để hiển thị thông báo sau khi thanh toán

  const handleCheckout = async () => {
    const userId = "id_của_người_dùng"; // Lấy ID của người dùng đã đăng nhập
    const items = all_product.filter(e => cartItems[e.id] > 0).map(e => ({
      productId: e.id,
      quantity: cartItems[e.id]
    }));

    try {
      const response = await axios.post('http://localhost:4000/checkout', { userId, items });
      
      if (response.status === 200) {
        setMessage('Thanh toán thành công!');
        setTimeout(() => {
          window.location.href = '/'; // Chuyển hướng về trang chính sau khi thanh toán
        }, 2000);
      }
    } catch (error) {
      setMessage('Có lỗi xảy ra khi thanh toán.');
    }
  };

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Sản phẩm</p>
        <p>Tên sản phẩm</p>
        <p>Giá</p>
        <p>Số lượng</p>
        <p>Tổng</p>
        <p>Xóa</p>
      </div>
      <hr />
      {all_product.map((e)=> {
        if(cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>{e.new_price}₫</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>{e.new_price * cartItems[e.id]}₫</p>
                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Tổng thanh toán</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Tạm tính</p>
              <p>{getTotalCartAmount()}₫</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Phí vận chuyển</p>
              <p>Miễn phí</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Tổng</h3>
              <h3>{getTotalCartAmount()}₫</h3>
            </div>
          </div>
          <button onClick={handleCheckout}>Tiếp tục đến thanh toán</button>
          {message && <p>{message}</p>}
        </div>
        <div className="cartitems-promocode">
          <p>Nếu bạn có mã giảm giá, Nhập nó vào đây</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='Mã giảm giá' />
            <button>Nhập mã</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
