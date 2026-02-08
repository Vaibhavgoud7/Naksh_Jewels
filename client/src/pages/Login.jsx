import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(formData.email, formData.password);
    } else {
      register(formData.name, formData.email, formData.password);
    }
    navigate('/'); 
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center font-sans">
      
      {/* 1. FULL SCREEN BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop" 
          alt="Jewelry Background" 
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay with BLUR */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* 2. GLASSMOPHISM LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20 animate-fade-in-up mx-4">
        
        {/* Back Button */}
        <Link to="/" className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition text-gray-600">
          <ArrowLeft size={20} />
        </Link>

        {/* Header */}
        <div className="px-8 pt-12 pb-8 text-center">
          <div className="bg-indigo-600 text-white w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg shadow-indigo-500/30">
            NJ
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-500 text-sm">
            {isLogin ? 'Enter your details to access your collection' : 'Join Naksh Jewels for exclusive offers'}
          </p>
        </div>

        {/* Form */}
        <div className="px-8 pb-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Full Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Email Address</label>
              <input 
                type="email" 
                required 
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Password</label>
              <input 
                type="password" 
                required 
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 mt-2"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              {isLogin ? "New to Naksh Jewels? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-indigo-600 font-bold hover:underline"
              >
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