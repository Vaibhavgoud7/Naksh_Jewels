import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { ArrowRight } from 'lucide-react';

const PlaceOrder = () => {
    // 1. Get 'isAuthenticated' from Context
    const { navigate, cartItems, products, getCartAmount, delivery_fee, setCartItems, isAuthenticated } = useContext(ShopContext);

    const [method, setMethod] = useState('cod');
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', street: '',
        city: '', state: '', zipcode: '', country: '', phone: ''
    });

    // 2. Protect the Route: If not logged in, redirect away immediately
    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Please login to place an order");
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            // Double check just in case
            if (!isAuthenticated) {
                toast.error("Please login to place an order");
                return navigate('/login');
            }

            let orderItems = [];
            // Convert Cart Object to Array for Backend
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items));
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            // Prevent placing empty orders
            if (orderItems.length === 0) {
                toast.error("Your cart is empty!");
                return;
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
            };

            const response = await api.post('/order/place', orderData);

            if (response.data.success) {
                setCartItems({}); 
                navigate('/orders');
                toast.success("Order Placed Successfully!");
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // If not authenticated, we return null to avoid flashing the form before redirect
    if (!isAuthenticated) return null;

    return (
        <form onSubmit={onSubmitHandler} className='container mx-auto px-6 py-12 font-sans text-gray-900'>
            
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-10 text-center">Checkout</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                
                {/* LEFT SIDE: Delivery Info */}
                <div className='flex-1'>
                    <h2 className='text-xl font-bold mb-6 flex items-center gap-2'>
                        Delivery Information
                    </h2>
                    
                    <div className='space-y-4'>
                        <div className='flex gap-4'>
                            <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none' type="text" placeholder='First name' />
                            <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none' type="text" placeholder='Last name' />
                        </div>
                        <input required onChange={onChangeHandler} name='email' value={formData.email} className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none' type="email" placeholder='Email address' />
                        <input required onChange={onChangeHandler} name='street' value={formData.street} className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none' type="text" placeholder='Street Address' />
                        
                        <div className='flex gap-4'>
                            <input required onChange={onChangeHandler} name='city' value={formData.city} className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none' type="text" placeholder='City' />
                            <input required onChange={onChangeHandler} name='state' value={formData.state} className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none' type="text" placeholder='State' />
                        </div>
                        
                        <div className='flex gap-4'>
                            <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none' type="number" placeholder='Zipcode' />
                            <input required onChange={onChangeHandler} name='country' value={formData.country} className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none' type="text" placeholder='Country' />
                        </div>
                        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none' type="number" placeholder='Phone Number' />
                    </div>
                </div>

                {/* RIGHT SIDE: Cart Totals & Payment */}
                <div className='lg:w-96'>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
                        
                        {/* Cart Totals UI (Inline, no separate component) */}
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-6 text-gray-600">
                            <div className="flex justify-between"><span>Subtotal</span><span>₹{getCartAmount()}.00</span></div>
                            <div className="flex justify-between"><span>Shipping</span><span>₹{delivery_fee}.00</span></div>
                            <div className="border-t pt-4 flex justify-between text-lg font-bold text-gray-900">
                                <span>Total</span>
                                <span>₹{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</span>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className='mt-8'>
                            <h3 className='font-bold mb-4 text-sm uppercase tracking-wide text-gray-500'>Payment Method</h3>
                            <div 
                                onClick={() => setMethod('cod')} 
                                className={`flex items-center gap-3 border p-4 rounded-xl cursor-pointer transition-all ${method === 'cod' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}
                            >
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'cod' ? 'border-indigo-600' : 'border-gray-300'}`}>
                                    {method === 'cod' && <div className='w-2.5 h-2.5 bg-indigo-600 rounded-full'></div>}
                                </div>
                                <span className='font-medium text-gray-900'>Cash on Delivery</span>
                            </div>
                        </div>

                        <button type='submit' className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-2 hover:bg-indigo-700 mt-8 shadow-lg shadow-indigo-200 transition-all">
                            Place Order <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;