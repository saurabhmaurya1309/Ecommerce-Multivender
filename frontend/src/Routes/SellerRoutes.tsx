import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashBoard from '../seller/page/SellerDashBoard/DashBoard'
import Products from '../seller/page/Products/Products'
import AddProduct from '../seller/page/Products/AddProduct'
import Transaction from '../seller/page/Payment/Transaction'
import Profile from '../seller/page/Account/Profile'
import Order from '../seller/page/Orders/Order'
import Payment from '../seller/page/Payment/Payment'

const SellerRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<DashBoard />} />
                <Route path='/products' element={<Products />} />
                <Route path='/add-product' element={<AddProduct />} />
                <Route path='/orders' element={<Order />} />
                <Route path='/account' element={<Profile />} />
                <Route path='/payment' element={<Payment/>} />
                <Route path='/transaction' element={<Transaction />} />
            </Routes>


        </div>
    )
}

export default SellerRoutes
