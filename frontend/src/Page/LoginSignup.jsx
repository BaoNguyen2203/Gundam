import React from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Đăng ký</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Tên tài khoản' />
          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Mật khẩu'/>
        </div>
        <button>Continue</button>
        <p className="loginsignup-login">Đã có tài khoản ? <span>Đăng nhập ở đây</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>Bằng cách tiếp tục, tôi đồng ý với điều khoản sử dụng và chính sách quyền riêng tư</p>
        </div>
      </div>

    </div>
  )
}

export default LoginSignup
