import React, { useEffect } from 'react';
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
import { Route, Routes } from 'react-router-dom';
import BecomeSeller from './customer/pages/Become Seller/BecomeSeller';
import SellerDashBoard from './seller/page/SellerDashBoard/SellerDashBoard';
import AdminDashBoard from './admin/pages/DashBoard/DashBoard';
import { useAppDispatch, useAppSelector } from './State/Store';
import { fetchSellerProfile } from './State/seller/SellerSlice';
import Auth from './customer/pages/Auth/Auth';
import { fetchUserProfile } from './State/AuthSlice';
import { ToastContainer } from 'react-toastify';
import PaymentSucess from './customer/pages/Cart/PaymentSucess';
import SellerNavbar from './seller/components/SellerNavbar';
import ProtectedRoute from './Routes/ProtectedRoute';


function App() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  useEffect(() => {
    if (!auth.isLoggedIn) return;

    if (auth.role === "USER") {
      dispatch(fetchUserProfile());
    }

    if (auth.role === "SELLER") {
      dispatch(fetchSellerProfile());
    }
  }, [auth.isLoggedIn, auth.role, dispatch]);


  return (
    <ThemeProvider theme={customTheme}>
      <div>
        {auth.role !== "SELLER" && <Navbar />}

        {/* SELLER NAVBAR */}
        {auth.role === "SELLER" && <SellerNavbar />}
        <Routes>

          {/* =========================  PUBLIC ROUTES ========================== */}

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Auth />} />

          <Route
            path="/products/:category"
            element={<Product />}
          />

          <Route
            path="/product-details/:categoryId/:name/:productId"
            element={<ProductDeatils />}
          />

          <Route
            path="/reviews/:prductId"
            element={<Review />}
          />

          <Route
            path="/become-seller"
            element={<BecomeSeller />}
          />


          {/* =========================  CUSTOMER ONLY ========================== */}

          <Route
            element={
              <ProtectedRoute allowedRoles={["USER"]} />
            }
          >

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/payment-success/:orderId"
              element={<PaymentSucess />}
            />

            <Route
              path="/account/*"
              element={<Account />}
            />

          </Route>


          {/* =========================  SELLER ONLY ========================== */}

          <Route
            element={
              <ProtectedRoute allowedRoles={["SELLER"]} />
            }
          >

            <Route
              path="/seller/*"
              element={<SellerDashBoard />}
            />

          </Route>


          {/* ========================= ADMIN ========================== */}

          <Route
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]} />
            }
          >

            <Route
              path="/admin/*"
              element={<AdminDashBoard />}
            />

          </Route>

        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </ThemeProvider>

  );
}

export default App;
