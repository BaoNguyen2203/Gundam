import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image2.png'

const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Độc Quyền</h1>
            <h1>Ưu đãi dành cho bạn</h1>
            <p>CHỈ CÓ TRÊN CÁC SẢN PHẨM BÁN CHẠY</p>
            <button>Kiểm tra ngay</button>
        </div>
        <div className="offers-right">
            <img src={exclusive_image} alt="" />
        </div>
    </div>
  )
}

export default Offers