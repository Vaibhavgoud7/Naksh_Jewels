import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext' 

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, addToCart } = useContext(ShopContext) 
  
  const [product, setProduct] = useState(null)
  const [activeImg, setActiveImg] = useState('')
  const [quantity, setQuantity] = useState(1) 
  const [size, setSize] = useState('') 

  useEffect(() => {
    
    const foundProduct = products.find((p) => p._id === id)
    if (foundProduct) {
      setProduct(foundProduct)
      setActiveImg(foundProduct.image[0])
      
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSize(foundProduct.sizes[0]);
      }
    }
  }, [id, products])

  if (!product) return <div className="text-center py-20">Loading...</div>

  const handleAddToCart = () => {
    
    for(let i = 0; i < quantity; i++){
       addToCart(product._id, size);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart'); 
  };

  return (
    <div className="container mx-auto px-6 py-12 font-sans text-gray-900">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Images Section */}
        <div className="flex flex-col-reverse md:flex-row gap-4 w-full h-fit">
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto w-full md:w-24 h-24 md:h-[500px] scrollbar-hide">
              {product.image.map((img, index) => (
                <button 
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 md:w-full md:h-24 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${activeImg === img ? 'border-indigo-600' : 'border-transparent'}`}
                  onClick={() => setActiveImg(img)}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 h-[400px] md:h-[500px] bg-gray-50 rounded-2xl overflow-hidden">
              <img src={activeImg} alt="" className="w-full h-full object-cover" />
            </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-start py-2">
          <h1 className="text-3xl font-serif font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-gray-900 mb-6">₹{product.price}</p>
          
          {/* Size Selector (New) */}
          <div className="mb-6">
              <span className="font-medium text-gray-700 block mb-2">Select Size:</span>
              <div className="flex gap-2">
                  {product.sizes.map((s, index) => (
                      <button 
                        key={index}
                        onClick={() => setSize(s)}
                        className={`px-4 py-2 border rounded-lg ${s === size ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                      >
                        {s}
                      </button>
                  ))}
              </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-gray-100 text-gray-600"
              >-</button>
              <span className="px-4 font-medium w-8 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-2 hover:bg-gray-100 text-gray-600"
              >+</button>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button 
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold shadow-lg transition-all"
            >
              Add to Cart
            </button>
            <button 
                onClick={handleBuyNow}
                className="flex-1 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-4 rounded-xl font-semibold transition-all"
            >
              Buy Now
            </button>
          </div>
          
          <p className="text-gray-500 text-sm leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails