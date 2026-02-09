import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import api from '../api/axios';
import { toast } from 'react-toastify'; // Import Toast

const Orders = () => {
    const { currency, isAuthenticated } = useContext(ShopContext);
    const [orderData, setOrderData] = useState([]);

    const loadOrderData = async () => {
        try {
            if (!isAuthenticated) return;

            const response = await api.post('/order/userorders', {});

            if (response.data.success) {
                let allOrdersItem = [];
                response.data.orders.forEach((order) => {
                    order.items.forEach((item) => {
                        item['status'] = order.status;
                        item['payment'] = order.payment;
                        item['paymentMethod'] = order.paymentMethod;
                        item['date'] = order.date;
                        allOrdersItem.push(item);
                    });
                });
                setOrderData(allOrdersItem.reverse());
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Function to handle "Track Order" click
    const handleTrackOrder = async () => {
        await loadOrderData();
        toast.info("Order status updated!"); // Visual feedback
    };

    useEffect(() => {
        loadOrderData();
    }, [isAuthenticated]);

    return (
        <div className='container mx-auto px-6 py-16 font-sans text-gray-900'>
            
            <div className='mb-8'>
                <h2 className="text-3xl font-serif font-bold text-gray-900">My Orders</h2>
                <div className="w-16 h-1 bg-indigo-600 rounded-full mt-2"></div>
            </div>

            <div className="space-y-4">
                {orderData.map((item, index) => (
                    <div key={index} className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
                        <div className='flex items-start gap-6'>
                            <img className='w-20 h-20 object-cover rounded-lg' src={item.image[0]} alt={item.name} />
                            
                            <div>
                                <p className='font-bold text-lg text-gray-900'>{item.name}</p>
                                <div className='flex items-center gap-3 mt-1 text-sm text-gray-500'>
                                    {/* Calculated Total Price (Price * Qty) */}
                                    <p className='text-indigo-600 font-bold text-base'>
                                        {currency}{item.price * item.quantity}
                                    </p>
                                    
                                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                    <p>Qty: {item.quantity}</p>
                                    
                                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                    <p>Size: {item.size}</p>
                                </div>
                                <p className='mt-2 text-xs text-gray-400'>Date: {new Date(item.date).toDateString()}</p>
                            </div>
                        </div>

                        <div className='flex items-center justify-between md:w-1/2'>
                            <div className='flex items-center gap-2'>
                                <span className={`w-3 h-3 rounded-full ${item.status === 'Order Placed' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                <p className='text-sm font-medium text-gray-700'>{item.status}</p>
                            </div>
                            
                            {/* Updated Click Handler */}
                            <button onClick={handleTrackOrder} className='px-4 py-2 border border-indigo-600 text-indigo-600 text-sm font-medium rounded-lg hover:bg-indigo-50 transition-colors'>
                                Track Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;