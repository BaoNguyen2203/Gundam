import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Nhận Ưu Đãi Độc Quyền Qua Email Của Bạn</h1>
        <p>Đăng ký nhận bản tin của chúng tôi và luôn cập nhật thông tin</p>
        <div>
            <input type="email" placeholder='Your Email id' />
            <button>Đăng ký</button>
        </div>
    </div>
  )
}

export default NewsLetter