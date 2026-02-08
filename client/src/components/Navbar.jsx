import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext' // Import Auth

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const { cart } = useCart()
    const { user, logout } = useAuth() // Get user status
    const navigate = useNavigate()

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-gray-300 bg-white sticky top-0 z-50">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
                 <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="8" fill="#4F46E5"/>
                    <path d="M11 29L11 11L18 11L24 20L24 11L29 11L29 29L22 29L16 20L16 29L11 29Z" fill="white"/>
                </svg>
                <span className="text-xl font-bold text-gray-900 tracking-tight">
                    Naksh<span className="text-indigo-600">Jewels</span>
                </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <Link to="/" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">Home</Link>
                <Link to="/products" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">Collections</Link>
                <Link to="/contact" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">Contact</Link>

                {/* Cart Icon */}
                <Link to="/cart" className="relative cursor-pointer hover:scale-105 transition-transform">
                    <svg width="22" height="22" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#4F46E5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 text-[10px] text-white bg-indigo-500 w-[16px] h-[16px] flex items-center justify-center rounded-full">
                            {cart.length}
                        </span>
                    )}
                </Link>

                {/* AUTH BUTTONS */}
                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-indigo-600">Hi, {user.name}</span>
                        <button 
                            onClick={handleLogout}
                            className="text-sm font-medium text-gray-500 hover:text-red-500 transition"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="cursor-pointer px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-full text-sm font-medium">
                        Login
                    </Link>
                )}
            </div>

            {/* Mobile Menu Button (unchanged) */}
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#426287" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>
        </nav>
    )
}

export default Navbar