import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BarChart3, 
  Bot, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  User as UserIcon,
  ShieldCheck,
  Zap,
  Menu,
  X,
  CreditCard,
  History,
  Activity
} from 'lucide-react';
import { useStore } from './store/useStore';
import { getTickerPrice } from './services/binance';
import TradingViewWidget from './components/trading/TradingViewWidget';
import TradingPanel from './components/trading/TradingPanel';
import BotControl from './components/bot/BotControl';
import TradeHistory from './components/dashboard/TradeHistory';
import Auth from './components/auth/Auth';
import { Toaster, toast } from 'sonner';

const App: React.FC = () => {
  const { user, setUser, setMarketData, marketData, isDemoMode } = useStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Poll for market data
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT'];
    const fetchPrices = async () => {
      for (const symbol of symbols) {
        const data = await getTickerPrice(symbol);
        if (data) setMarketData(symbol, data);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000); // Update every 10s
    return () => clearInterval(interval);
  }, [setMarketData, isAuthenticated]);

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
    { id: 'trading', icon: BarChart3, label: 'Trading' },
    { id: 'bot', icon: Bot, label: 'Bot Engine' },
    { id: 'history', icon: History, label: 'Trade Logs' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  if (!isAuthenticated) {
    return (
      <>
        <Toaster position="top-right" theme="dark" richColors />
        <Auth onLogin={(userData) => {
          setUser(userData);
          setIsAuthenticated(true);
        }} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1115] text-white font-sans selection:bg-blue-500/30">
      <Toaster position="top-right" theme="dark" richColors />
      
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-[#16171a] border-r border-gray-800 z-50 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } hidden md:flex flex-col`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          {isSidebarOpen && (
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-black tracking-tight text-white italic"
            >
              DT<span className="text-blue-500">TOOL</span>
            </motion.h1>
          )}
        </div>

        <nav className="flex-grow px-3 mt-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                  : 'text-gray-500 hover:text-white hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-2 py-3 bg-gray-800/20 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">
              {user?.username.charAt(0)}
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{user?.username}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{isDemoMode ? 'Demo Account' : 'Live Account'}</p>
              </div>
            )}
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full mt-4 flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'} min-h-screen`}>
        {/* Header */}
        <header className="h-20 border-b border-gray-800 bg-[#0f1115]/80 backdrop-blur-xl sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hidden md:block"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="text-xl font-bold capitalize hidden sm:block">{activeTab}</h2>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden lg:flex items-center gap-4 px-4 py-2 bg-[#1a1b1e] border border-gray-800 rounded-full">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-gray-400">BTC</span>
                <span className="text-sm font-mono">${marketData['BTCUSDT']?.price?.toLocaleString() || '---'}</span>
              </div>
              <div className="w-px h-4 bg-gray-700" />
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-400">ETH</span>
                <span className="text-sm font-mono">${marketData['ETHUSDT']?.price?.toLocaleString() || '---'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2.5 bg-[#1a1b1e] hover:bg-gray-800 border border-gray-800 rounded-xl text-gray-400 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#1a1b1e]" />
              </button>
              <div className="hidden sm:flex flex-col items-end px-3">
                <span className="text-xs text-gray-500 font-medium">Balance</span>
                <span className="text-base font-black text-green-400">${user?.balance.toLocaleString()}</span>
              </div>
              <button className="p-1 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl">
                <div className="bg-[#1a1b1e] p-1.5 rounded-[10px] hover:bg-transparent transition-colors group">
                  <UserIcon className="w-5 h-5 text-blue-400 group-hover:text-white" />
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Hero Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Net Profit', value: '+$1,240.50', sub: '+12.5%', color: 'text-green-500', icon: CreditCard },
                    { label: 'Open Trades', value: '4', sub: 'Manual: 2, Bot: 2', color: 'text-blue-500', icon: Activity },
                    { label: 'Win Rate', value: '68%', sub: 'Last 30 days', color: 'text-purple-500', icon: ShieldCheck },
                    { label: 'Equity', value: `$${user?.balance.toLocaleString()}`, sub: '0.00 BTC', color: 'text-cyan-500', icon: Zap },
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#1a1b1e] border border-gray-800 p-6 rounded-2xl relative overflow-hidden group">
                      <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <stat.icon className="w-24 h-24" />
                      </div>
                      <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                      <h4 className={`text-2xl font-black ${stat.color}`}>{stat.value}</h4>
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        {stat.sub}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    <div className="h-[450px]">
                      <TradingViewWidget />
                    </div>
                    <TradeHistory />
                  </div>
                  <div className="space-y-8">
                    <TradingPanel />
                    <BotControl />
                    <div className="bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden">
                       <div className="relative z-10">
                        <h4 className="text-lg font-bold mb-2">Upgrade DTTool</h4>
                        <p className="text-sm text-gray-400 mb-4">Unlock advanced bot strategies and higher leverage limits.</p>
                        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors">
                          Go Premium
                        </button>
                       </div>
                       <div className="absolute top-0 right-0 p-4 opacity-20">
                         <Zap className="w-12 h-12 text-blue-500" />
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'trading' && (
              <motion.div
                key="trading"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 lg:grid-cols-4 gap-8"
              >
                <div className="lg:col-span-3 h-[70vh]">
                  <TradingViewWidget />
                </div>
                <div className="space-y-6">
                  <TradingPanel />
                  <div className="bg-[#1a1b1e] border border-gray-800 p-6 rounded-2xl">
                    <h3 className="font-bold mb-4">Market Sentiment</h3>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-green-500">BULLISH</span>
                      <span className="text-xs text-gray-500 ml-auto">62%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: '62%' }} />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-800/30 rounded-xl">
                        <p className="text-[10px] text-gray-500 uppercase">Support</p>
                        <p className="font-mono text-xs">$91,200</p>
                      </div>
                      <div className="text-center p-3 bg-gray-800/30 rounded-xl">
                        <p className="text-[10px] text-gray-500 uppercase">Resistance</p>
                        <p className="font-mono text-xs">$96,400</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'bot' && (
              <motion.div
                key="bot"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-1 space-y-6">
                  <BotControl />
                  <div className="bg-[#1a1b1e] border border-gray-800 p-6 rounded-2xl">
                    <h4 className="font-bold mb-4">Bot Performance</h4>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center">
                         <span className="text-sm text-gray-500">Total Trades</span>
                         <span className="font-bold">42</span>
                       </div>
                       <div className="flex justify-between items-center">
                         <span className="text-sm text-gray-500">Success Rate</span>
                         <span className="font-bold text-green-500">74.2%</span>
                       </div>
                       <div className="flex justify-between items-center">
                         <span className="text-sm text-gray-500">Avg. Profit/Trade</span>
                         <span className="font-bold">+$12.40</span>
                       </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-[#1a1b1e] border border-gray-800 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold mb-6">Strategy Backtest (Live Data)</h3>
                    <div className="h-64 flex items-end gap-2 px-4">
                      {[40, 60, 45, 70, 85, 55, 65, 90, 75, 80, 95, 100].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                          <div 
                            className="w-full bg-blue-600/30 group-hover:bg-blue-600/50 rounded-t-md transition-all cursor-pointer" 
                            style={{ height: `${h}%` }}
                          />
                          <span className="text-[10px] text-gray-600">M{i+1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <TradeHistory />
                </div>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TradeHistory />
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-3xl mx-auto space-y-8"
              >
                <div className="bg-[#1a1b1e] border border-gray-800 rounded-2xl p-8">
                  <h3 className="text-xl font-bold mb-6">Account Settings</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Username</label>
                        <div className="p-3 bg-[#0f1115] border border-gray-800 rounded-xl text-white">
                          {user?.username}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Email Address</label>
                        <div className="p-3 bg-[#0f1115] border border-gray-800 rounded-xl text-white">
                          {user?.email}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-800">
                      <h4 className="font-bold mb-4">API Connections</h4>
                      <p className="text-sm text-gray-500 mb-6">
                        Connect your exchange accounts to enable live trading. API keys are encrypted and stored securely.
                      </p>
                      <button className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-white font-bold transition-all">
                        <Search className="w-5 h-5" /> Connect Binance API
                      </button>
                    </div>

                    <div className="pt-6 border-t border-gray-800">
                      <h4 className="font-bold mb-4 text-red-400">Danger Zone</h4>
                      <button className="px-6 py-3 bg-red-600/10 hover:bg-red-600/20 text-red-500 rounded-xl font-bold transition-all">
                        Reset Demo Balance
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default App;