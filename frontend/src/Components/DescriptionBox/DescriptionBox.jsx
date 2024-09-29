import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Mô tả</div>
            <div className="descriptionbox-nav-box fade">Đánh giá (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>Mô tả sản phẩm</p>
            <p>Đánh giá khách hàng</p>
        </div>
    </div>
  )
}

export default DescriptionBox