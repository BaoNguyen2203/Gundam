import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async () => {
    console.log("Login Function Executed",formData)
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.success) {
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else {
      alert(responseData.error);
    }
  }

  const signup = async () => {
    console.log("Singup Function Executed",formData)
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.success) {
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else {
      alert(responseData.error);
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Tên tài khoản' />:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Mật khẩu'/>
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"
        ?<p className="loginsignup-login">Đã có tài khoản ? <span onClick={()=>{setState("Login")}}>Đăng nhập ở đây</span></p>
        :<p className="loginsignup-login">Tạo tài khoản ? <span onClick={()=>{setState("Sign Up")}}>Nhấn ở đây</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>Bằng cách tiếp tục, tôi đồng ý với điều khoản sử dụng và chính sách quyền riêng tư</p>
        </div>
      </div>

    </div>
  )
}

export default LoginSignup
