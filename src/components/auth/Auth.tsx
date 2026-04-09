import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface AuthProps {
  onLogin: (user: any) => void;
  logoUrl?: string;
  secondaryLogoUrl?: string;
}

const Auth: React.FC<AuthProps> = ({ onLogin, logoUrl, secondaryLogoUrl }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const user = {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        email: formData.email,
        username: formData.username || formData.email.split('@')[0],
        balance: 10000.00
      };
      onLogin(user);
      toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0f1115] flex flex-col md:flex-row overflow-hidden">
      {/* Left Side: Branding/Visuals */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-900/20 to-black p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Image - If secondary logo isn't used for bg, keep the default or use it */}
        <div 
           className="absolute inset-0 opacity-20 bg-cover bg-center" 
           style={{ backgroundImage: `url('https://storage.googleapis.com/dala-prod-public-storage/generated-images/bfee534d-a4af-4382-8c2c-a6f6c3e9e27b/market-bg-6c7cb3f8-1775677920032.webp')` }}
        />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-12">
            {logoUrl ? (
              <motion.div 
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                className="w-16 h-16 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-gray-800 bg-black"
              >
                <img src={logoUrl} alt="DTTool Logo" className="w-full h-full object-cover" />
              </motion.div>
            ) : (
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Zap className="w-7 h-7 text-white" />
              </div>
            )}
            <h1 className="text-4xl font-black text-white italic tracking-tighter">DTTOOL</h1>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md"
          >
            <h2 className="text-5xl font-black text-white leading-tight mb-6">
              Precision Trading <br />
              <span className="text-blue-500">Accelerated.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Experience the power of institutional-grade automated trading. 
              Built for speed, security, and consistent returns.
            </p>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="relative z-10 grid grid-cols-2 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-600/10 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h4 className="font-bold text-white">Bank-Grade Security</h4>
              <p className="text-sm text-gray-500">Your assets are always protected.</p>
            </div>
          </div>
          {secondaryLogoUrl && (
            <div className="flex items-start gap-4">
              <div className="p-2 bg-black border border-blue-500/20 rounded-xl overflow-hidden w-12 h-12 flex-shrink-0">
                 <img src={secondaryLogoUrl} alt="Market Dynamics" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-white">Neon Analysis</h4>
                <p className="text-sm text-gray-500">Powered by visual market insights.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-grow flex items-center justify-center p-6 md:p-12 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[120px] rounded-full" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="md:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-black border border-gray-800">
               <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-2xl font-black italic">DTTOOL</h1>
          </div>

          <div className="mb-10">
            <h3 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Get Started'}
            </h3>
            <p className="text-gray-500">
              {isLogin ? 'Sign in to access your trading dashboard' : 'Join thousands of traders using DTTool'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Username</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                  <Input 
                    required
                    placeholder="Enter your username"
                    className="pl-11 h-12 bg-[#1a1b1e] border-gray-800 focus:border-blue-500 text-white transition-all"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                <Input 
                  required
                  type="email"
                  placeholder="name@example.com"
                  className="pl-11 h-12 bg-[#1a1b1e] border-gray-800 focus:border-blue-500 text-white transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-gray-400">Password</label>
                {isLogin && <button type="button" className="text-xs text-blue-500 hover:underline">Forgot password?</button>}
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                <Input 
                  required
                  type="password"
                  placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                  className="pl-11 h-12 bg-[#1a1b1e] border-gray-800 focus:border-blue-500 text-white transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-900/20 transition-all mt-4"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-blue-500 font-bold hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;