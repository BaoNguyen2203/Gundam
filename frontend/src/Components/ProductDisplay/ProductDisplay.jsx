import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {

    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-stars">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">
                    {product.old_price}₫
                </div>
                <div className="productdisplay-right-price-new">
                    {product.new_price}₫
                </div>
            </div>
            <div className="productdisplay-right-description">
                Mô tả sản phẩm
            </div>
            <div className="productdisplay-right-size">
                <h1>Chọn màu</h1>
                <div className="productdisplay-right-sizes">
                    <div>Basic</div>
                    <div>Đỏ</div>
                    <div>Đen</div>
                    <div>Trắng</div>
                    <div>Bạc</div>
                </div>
            </div>
            <button onClick={()=>{addToCart(product.id)}}>Thêm vào giỏ hàng</button>
            <p className='productdisplay-right-category'><span>Loại :</span>Sản phẩm mô nhựa hình lắp ráp</p>
            <p className='productdisplay-right-category'><span>Thẻ :</span>Anime Series, Scale Model</p>
        </div>
    </div>
  )
}

export default ProductDisplay