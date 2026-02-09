import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext'; // CHANGED
import ProductCard from '../components/ProductCard';

const Products = () => {
  const { products } = useContext(ShopContext); // CHANGED

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pt-8">
      
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
            Our Collection
          </h1>
          <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full mt-3 mb-4"></div>
        </div>


        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-16">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Products;