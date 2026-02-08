import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext' // Import Context

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // Get function

  const handleAddToCart = (e) => {
    e.preventDefault(); // Stop navigation
    addToCart(product); // Add 1 item
  };

  return (
    <Link to={`/product/${product.id}`} className="block h-full">
      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full relative">
        
        <div className="relative h-72 overflow-hidden bg-gray-50">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          <button 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg whitespace-nowrap z-10 cursor-pointer"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>

        <div className="p-5 text-center flex flex-col flex-grow justify-between">
          <div>
              <h3 className="font-medium text-gray-900 truncate text-lg mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-3">Luxury Edition</p>
          </div>
          <p className="text-indigo-600 font-bold text-xl">{product.price}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard