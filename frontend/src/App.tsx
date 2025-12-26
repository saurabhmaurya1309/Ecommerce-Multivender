import React, { useEffect } from 'react';
import './App.css';
import Navbar from './customer/components/Navbar/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from './Theme/customeTheme';
import Home from './customer/pages/Home/Home';
import Product from './customer/pages/Product/Product';
import ProductDeatils from './customer/pages/Product Details/ProductDetails';
import Review from './customer/pages/Review/Review';
import Cart from './customer/pages/Cart/Cart';
import Checkout from './customer/pages/checkout/Checkout';
import Account from './customer/pages/Account/Account';
import { Route, Routes, useNavigate } from 'react-router-dom';
import BecomeSeller from './customer/pages/Become Seller/BecomeSeller';
import SellerDashBoard from './seller/page/SellerDashBoard/SellerDashBoard';
import AdminDashBoard from './admin/pages/DashBoard/DashBoard';
import { useAppDispatch, useAppSelector } from './State/Store';
import { fetchSellerProfile } from './State/seller/SellerSlice';


function App() {
  const dispatch = useAppDispatch();
  const seller= useAppSelector(state=>state.seller);
  const navigate =useNavigate();
  useEffect(()=>{
   dispatch(fetchSellerProfile(localStorage.getItem("jwt") || ""));
  },[])

  useEffect(()=>{
    if(seller.profile){
      navigate("/seller")
    }
  },[seller.profile])
  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:category' element={<Product />} />
          <Route path='/reviews/:prductId' element={<Review />} />
          <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDeatils />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/become-seller' element={<BecomeSeller/>} />
          <Route path='/account/*' element={<Account />} />
          <Route path='/seller/*' element={<SellerDashBoard/>} />
           <Route path='/admin/*' element={<AdminDashBoard/>} />
        </Routes>
      </div>
    </ThemeProvider>

  );
}

export default App;
