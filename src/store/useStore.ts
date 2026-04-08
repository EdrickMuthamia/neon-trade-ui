import { create } from 'zustand';
import { User, Trade, BotSettings, MarketData } from '../types';

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  trades: Trade[];
  setTrades: (trades: Trade[]) => void;
  addTrade: (trade: Trade) => void;
  botSettings: BotSettings;
  setBotSettings: (settings: Partial<BotSettings>) => void;
  marketData: Record<string, MarketData>;
  setMarketData: (symbol: string, data: MarketData) => void;
  isDemoMode: boolean;
  setDemoMode: (isDemo: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  user: {
    id: 'demo-user',
    email: 'demo@dttool.com',
    username: 'DemoTrader',
    balance: 10000.00,
  },
  setUser: (user) => set({ user }),
  trades: [],
  setTrades: (trades) => set({ trades }),
  addTrade: (trade) => set((state) => ({ trades: [trade, ...state.trades] })),
  botSettings: {
    isEnabled: false,
    strategy: 'MA_CROSSOVER',
    riskLevel: 'LOW',
    selectedAssets: ['BTCUSDT', 'ETHUSDT'],
  },
  setBotSettings: (settings) => set((state) => ({ 
    botSettings: { ...state.botSettings, ...settings } 
  })),
  marketData: {},
  setMarketData: (symbol, data) => set((state) => ({
    marketData: { ...state.marketData, [symbol]: data }
  })),
  isDemoMode: true,
  setDemoMode: (isDemo) => set({ isDemoMode: isDemo }),
}));