import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  
  const { navigate, checkUser, isAuthenticated } = useContext(ShopContext);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      let response;

      if (isLogin) {
        response = await api.post('/user/login', { 
          email: formData.email, 
          password: formData.password 
        });
      } else {
        response = await api.post('/user/register', { 
          name: formData.name, 
          email: formData.email, 
          password: formData.password 
        });
      }

      if (response.data.success) {
        toast.success(response.data.message);
        
        await checkUser(); 
        navigate('/');
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center font-sans">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop" alt="Jewelry Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20 animate-fade-in-up mx-4">
        <Link to="/" className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition text-gray-600">
          <ArrowLeft size={20} />
        </Link>

        <div className="px-8 pt-12 pb-8 text-center">
          <div className="bg-indigo-600 text-white w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg shadow-indigo-500/30">NJ</div>
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-gray-500 text-sm">{isLogin ? 'Enter your details to access your collection' : 'Join Naksh Jewels for exclusive offers'}</p>
        </div>

        <div className="px-8 pb-10">
          {/* FORM START - onSubmit is strictly bound here */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Full Name</label>
                <input type="text" required className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Email Address</label>
              <input type="email" required className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Password</label>
              <input type="password" required className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
            </div>

            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 mt-2">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          {/* FORM END */}

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              {isLogin ? "New to Naksh Jewels? " : "Already have an account? "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-600 font-bold hover:underline">
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;