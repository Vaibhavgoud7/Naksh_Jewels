import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard' 
import { ShopContext } from '../context/ShopContext' // CHANGED

const Home = () => {
  // CHANGED: Get products from context instead of dummy array
  const { products } = useContext(ShopContext);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
        setTopProducts(products.slice(0, 5)); // Show first 5 products
    }
  }, [products]);

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-gray-900">
      
      {/* 1. HERO SECTION (Unchanged) */}
      <div className="relative w-full h-[550px] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black">
            <img 
            src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2075&auto=format&fit=crop" 
            alt="Luxury Jewelry" 
            className="w-full h-full object-cover opacity-60"
            />
        </div>
        
        <div className="relative z-10 px-6 max-w-4xl mx-auto animate-fade-in-up">
          <span className="uppercase tracking-[0.2em] text-sm md:text-base text-indigo-200 mb-2 block">
            Exclusive Collection
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight">
            Naksh Jewels
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover the elegance of handcrafted jewelry. Timeless designs curated for your most precious moments.
          </p>
          <Link 
            to="/products" 
            className="inline-block px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-indigo-500/30"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* 2. TOP PRODUCTS SECTION */}
      <section className="container mx-auto px-6 py-20">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Trending Collections
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-500 max-w-xl mx-auto">
            Explore our most loved pieces, meticulously crafted to add a touch of sparkle to your life.
          </p>
        </div>

        {/* Dynamic Products from API */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {topProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="text-center mt-16">
            <Link to="/products" className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors border-b-2 border-indigo-100 hover:border-indigo-600 pb-1">
                View All Products 
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
        </div>
      </section>

      {/* 3. FOOTER SECTION (Unchanged) */}
      <footer className="w-full bg-slate-50 border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
            
            <div className="flex items-center gap-2 mb-6">
                <div className="bg-indigo-600 text-white p-2 rounded-lg">
                    <span className="font-bold text-xl leading-none">NJ</span>
                </div>
                <span className="text-2xl font-bold text-gray-900 tracking-tight">
                    Naksh<span className="text-indigo-600">Jewels</span>
                </span>
            </div>

            <p className="text-gray-500 text-sm md:text-base max-w-lg mb-8 leading-relaxed">
                Elevating your style with exquisite, handcrafted jewelry. 
                From timeless classics to modern statements, we bring your sparkle to life.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm font-medium text-gray-600">
                <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
                <Link to="/products" className="hover:text-indigo-600 transition">Collections</Link>
                <Link to="/about" className="hover:text-indigo-600 transition">About Us</Link>
                <Link to="/contact" className="hover:text-indigo-600 transition">Contact</Link>
            </div>

            <div className="w-full h-px bg-gray-200 mb-8"></div>

            <div className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Naksh Jewels. All rights reserved.
            </div>
        </div>
      </footer>

    </div>
  )
}

export default Home