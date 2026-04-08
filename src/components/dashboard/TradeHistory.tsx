import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Clock, Activity } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TradeHistory: React.FC = () => {
  const { trades } = useStore();

  return (
    <div className="bg-[#1a1b1e] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-6 border-b border-gray-800 flex justify-between items-center">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" /> Recent Trades
        </h3>
        <span className="text-xs text-gray-500 font-mono">{trades.length} entries</span>
      </div>
      
      <div className="overflow-x-auto">
        {trades.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center gap-4">
            <div className="p-4 rounded-full bg-gray-800/30 text-gray-600">
              <Clock className="w-8 h-8" />
            </div>
            <p className="text-gray-500">No trading activity found.</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-[#0f1115]">
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead className="text-gray-400">Asset</TableHead>
                <TableHead className="text-gray-400">Type</TableHead>
                <TableHead className="text-gray-400 text-right">Amount</TableHead>
                <TableHead className="text-gray-400 text-right">Price</TableHead>
                <TableHead className="text-gray-400 text-right">Status</TableHead>
                <TableHead className="text-gray-400 text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.map((trade, i) => (
                <motion.tr
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={trade.id}
                  className="border-gray-800 hover:bg-[#25262b] transition-colors"
                >
                  <TableCell className="font-semibold text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-[10px] text-orange-500">
                        {trade.symbol.charAt(0)}
                      </div>
                      {trade.symbol}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`flex items-center gap-1 font-bold ${trade.type === 'BUY' ? 'text-green-500' : 'text-red-500'}`}>
                      {trade.type === 'BUY' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownLeft className="w-3 h-3" />}
                      {trade.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-gray-300 font-mono">${trade.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-white font-mono">${trade.entryPrice.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      trade.status === 'OPEN' ? 'bg-blue-500/10 text-blue-500' : 'bg-gray-700 text-gray-400'
                    }`}>
                      {trade.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-gray-500 text-xs">
                    {new Date(trade.timestamp).toLocaleTimeString()}
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default TradeHistory;