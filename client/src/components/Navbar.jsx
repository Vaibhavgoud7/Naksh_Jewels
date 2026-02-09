import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { Menu, X, User, ShoppingBag, LogOut, Package } from 'lucide-react';

const Navbar = () => {
    const [visible, setVisible] = useState(false); // Mobile dropdown state
    const [profileOpen, setProfileOpen] = useState(false); // Desktop Profile dropdown state
    
    const { getCartCount, navigate, isAuthenticated, setIsAuthenticated, setCartItems } = useContext(ShopContext);

    const logout = async () => {
        try {
            await api.post('/user/logout');
            setIsAuthenticated(false);
            setCartItems({});
            toast.success("Logged out successfully");
            navigate('/login');
        } catch (error) {
            console.error(error);
            toast.error("Logout failed");
        }
    };

    return (
        <nav className="relative flex items-center justify-between px-6 py-4 font-medium bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
            
            {/* 1. LOGO */}
            <Link to="/" className="flex items-center gap-2 group">
                 <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
                    <span className="font-bold text-xl leading-none">NJ</span>
                 </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">
                    Naksh<span className="text-indigo-600">Jewels</span>
                </span>
            </Link>

            {/* 2. DESKTOP NAVIGATION (Hidden on Mobile) */}
            <ul className="hidden sm:flex gap-8 text-sm text-gray-700">
                <NavLink to='/' className="hover:text-indigo-600 transition">HOME</NavLink>
                <NavLink to='/products' className="hover:text-indigo-600 transition">COLLECTION</NavLink>
                
            </ul>

            {/* 3. ICONS SECTION */}
            <div className="flex items-center gap-6">

                {/* Desktop: Profile Menu (Hidden on Mobile) */}
                <div className="hidden sm:block group relative">
                    {isAuthenticated ? (
                        <div 
                            className="cursor-pointer"
                            onMouseEnter={() => setProfileOpen(true)}
                            onMouseLeave={() => setProfileOpen(false)}
                        >
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
                                <User size={18} />
                            </div>
                            <div className={`absolute right-0 pt-4 ${profileOpen ? 'block' : 'hidden'}`}>
                                <div className="flex flex-col gap-2 w-48 py-3 px-4 bg-white text-gray-600 rounded-xl shadow-xl border border-gray-100">
                                    <p className="cursor-pointer hover:text-indigo-600 flex items-center gap-2 transition">
                                        <User size={16} /> My Profile
                                    </p>
                                    <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-indigo-600 flex items-center gap-2 transition">
                                        <Package size={16} /> Orders
                                    </p>
                                    <div className="h-[1px] bg-gray-200"></div>
                                    <p onClick={logout} className="cursor-pointer hover:text-red-500 flex items-center gap-2 transition">
                                        <LogOut size={16} /> Logout
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link to='/login' className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-medium transition-all shadow-md shadow-indigo-200">
                            Login
                        </Link>
                    )}
                </div>

                {/* Cart Icon (Always Visible) */}
                <Link to='/cart' className='relative hover:scale-105 transition-transform'>
                    <ShoppingBag className='w-5 h-5 min-w-5 text-gray-700' />
                    {getCartCount() > 0 && (
                        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-indigo-600 text-white aspect-square rounded-full text-[8px]'>
                            {getCartCount()}
                        </p>
                    )}
                </Link>

                {/* Mobile Menu Icon (Hamburger) */}
                <button onClick={() => setVisible(!visible)} className='sm:hidden text-gray-700 hover:text-indigo-600 focus:outline-none'>
                    {visible ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* 4. MOBILE DROPDOWN MENU */}
            {visible && (
                <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl flex flex-col py-4 px-6 sm:hidden animate-fade-in-down z-40">
                    <NavLink onClick={() => setVisible(false)} className='py-3 border-b border-gray-50 text-gray-600 hover:text-indigo-600' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-3 border-b border-gray-50 text-gray-600 hover:text-indigo-600' to='/products'>COLLECTION</NavLink>
                    
                    
                    {isAuthenticated ? (
                        <>
                            <NavLink onClick={() => {setVisible(false); navigate('/orders')}} className='py-3 border-b border-gray-50 text-gray-600 hover:text-indigo-600 flex items-center gap-2' to='/orders'>
                                <Package size={16} /> MY ORDERS
                            </NavLink>
                            <div onClick={() => {setVisible(false); logout()}} className='py-3 text-red-500 cursor-pointer flex items-center gap-2 hover:bg-red-50 rounded px-2 -mx-2 mt-1'>
                                <LogOut size={16} /> LOGOUT
                            </div>
                        </>
                    ) : (
                        <NavLink onClick={() => setVisible(false)} className='py-3 text-indigo-600 font-bold mt-2' to='/login'>
                            LOGIN
                        </NavLink>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;