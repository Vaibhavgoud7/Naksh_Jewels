import React from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext' // Import Context

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart(); // Use Real Data

  const shipping = 100; 
  const total = cartTotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
          <Trash2 className="w-10 h-10 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
        <Link to="/products" className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold transition-all">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 font-sans">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-1 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center gap-6">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                  <p className="text-indigo-600 font-bold">{item.price}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center border rounded-full bg-gray-50">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-200 rounded-l-full"><Minus size={16}/></button>
                    <span className="px-3 font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-200 rounded-r-full"><Plus size={16}/></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={20}/></button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:w-96">
            <div className="bg-white p-8 rounded-3xl shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6 text-gray-600">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>₹{shipping}</span></div>
                <div className="border-t pt-4 flex justify-between text-lg font-bold text-gray-900"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
              </div>
              <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-2 hover:bg-indigo-700">
                Checkout Now <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart