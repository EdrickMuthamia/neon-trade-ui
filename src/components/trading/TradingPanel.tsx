import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const TradingPanel: React.FC = () => {
  const { user, addTrade, marketData } = useStore();
  const [amount, setAmount] = useState<string>('');
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [type, setType] = useState<'BUY' | 'SELL'>('BUY');

  const currentPrice = marketData[symbol]?.price || 0;

  const handleTrade = (tradeType: 'BUY' | 'SELL') => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    const tradeAmount = parseFloat(amount);
    if (user && user.balance < tradeAmount && tradeType === 'BUY') {
      toast.error('Insufficient balance');
      return;
    }

    const newTrade = {
      id: Math.random().toString(36).substr(2, 9),
      symbol,
      type: tradeType,
      amount: tradeAmount,
      entryPrice: currentPrice,
      status: 'OPEN' as const,
      timestamp: Date.now(),
    };

    addTrade(newTrade);
    toast.success(`${tradeType} order executed at $${currentPrice.toLocaleString()}`);
    setAmount('');
  };

  return (
    <div className="bg-[#1a1b1e] border border-gray-800 rounded-2xl p-6 flex flex-col gap-6 shadow-xl">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Manual Trade</h3>
        <div className="flex gap-2">
          {['BTCUSDT', 'ETHUSDT', 'SOLUSDT'].map((s) => (
            <button
              key={s}
              onClick={() => setSymbol(s)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                symbol === s ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {s.replace('USDT', '')}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400">Current Price</label>
        <div className="text-2xl font-mono text-white flex items-center gap-2">
          ${currentPrice.toLocaleString()}
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className={`text-sm ${marketData[symbol]?.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}
          >
            {marketData[symbol]?.change24h >= 0 ? '+' : ''}{marketData[symbol]?.change24h.toFixed(2)}%
          </motion.span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Amount (USDT)</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              type="number"
              placeholder="0.00"
              className="pl-10 bg-[#0f1115] border-gray-700 text-white"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTrade('BUY')}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors shadow-[0_0_15px_rgba(22,163,74,0.3)]"
          >
            <TrendingUp className="w-5 h-5" /> BUY
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTrade('SELL')}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors shadow-[0_0_15px_rgba(220,38,38,0.3)]"
          >
            <TrendingDown className="w-5 h-5" /> SELL
          </motion.button>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-4 mt-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400 flex items-center gap-1">
            <Wallet className="w-4 h-4" /> Available Balance
          </span>
          <span className="text-white font-mono">${user?.balance.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TradingPanel;