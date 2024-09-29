
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Page/Shop';
import ShopCategory from './Page/ShopCategory';
import Product from './Page/Product';
import Cart from './Page/Cart';
import LoginSignup from './Page/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_men.png'
import women_banner from './Components/Assets/banner_women.jpg'
import kid_banner from './Components/Assets/banner_kids.jpg'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="mô hình tĩnh"/>}/>
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="gundam"/>}/>
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category="sơn"/>}/>
          <Route path="/product" elements={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
