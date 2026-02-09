import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'; // 1. Import Component
import 'react-toastify/dist/ReactToastify.css'; // 2. Import CSS

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import ShopContextProvider from './context/ShopContext'

const App = () => {
  return (
    <BrowserRouter>
      <ShopContextProvider>
        <div className='min-h-screen bg-gray-50'>
          <Navbar />
          
          {/* 3. ADD THIS LINE (Required for toasts to show up) */}
          <ToastContainer position="bottom-right" autoClose={3000} /> 
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </ShopContextProvider>
    </BrowserRouter>
  )
}

export default App