import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import ProductDetails from './pages/ProductDetails'
import Login from './pages/Login'

const App = () => {
  return (
    <AuthProvider>
     <CartProvider>
      <BrowserRouter>
      <div className='min-h-screen bg-gray-100'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      </BrowserRouter>
      
     </CartProvider>
    </AuthProvider>
  )
}

export default App