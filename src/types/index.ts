export interface User {
  id: string;
  email: string;
  username: string;
  balance: number;
}

export interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  amount: number;
  entryPrice: number;
  exitPrice?: number;
  status: 'OPEN' | 'CLOSED';
  profit?: number;
  timestamp: number;
  isBot?: boolean;
}

export interface BotSettings {
  isEnabled: boolean;
  strategy: 'MA_CROSSOVER' | 'RSI_SIGNALS';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  selectedAssets: string[];
}

export interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
}