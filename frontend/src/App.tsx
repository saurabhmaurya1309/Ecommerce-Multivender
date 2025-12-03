import React from 'react';
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


function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <Navbar />
        {/* <Home/> */}
        {/* <Product/> */}
        {/* <ProductDeatils/> */}
       {/* / <Review/> */}
       {/* <Cart/> */}
       {/* <Checkout/> */}
       <Account/>
      </div>
    </ThemeProvider>

  );
}

export default App;
