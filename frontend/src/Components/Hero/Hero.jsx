import React from 'react'
import './Hero.css'
import hand_icon from '..//Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image2.png'

const Hero = () => {
  return (
    <div className='hero'>
        <div className='hero-left'>
            <h2>CHỈ HÀNG MỚI VỀ</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>bộ</p>
                    <img src={hand_icon} alt="" />
                </div>
                <p>sưu tập mới</p>
                <p>cho mọi người</p>
            </div>
            <div className="hero-latest-btn">
                <div>Bộ Sưu Tập Mới Nhất</div>
                <img src={arrow_icon} alt="" />
            </div>
        </div>
        <div className='hero-right'>
            <img src={hero_image} alt="" />
        </div>
    </div>
  )
}

export default Hero