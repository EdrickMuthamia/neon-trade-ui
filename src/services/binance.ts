import axios from 'axios';

const API_BASE_URL = 'https://api.binance.com/api/v3';

export const getTickerPrice = async (symbol: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ticker/24hr`, {
      params: { symbol },
    });
    return {
      symbol: response.data.symbol,
      price: parseFloat(response.data.lastPrice),
      change24h: parseFloat(response.data.priceChangePercent),
    };
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    return null;
  }
};

export const getKlines = async (symbol: string, interval: string = '1h', limit: number = 100) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/klines`, {
      params: { symbol, interval, limit },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching klines for ${symbol}:`, error);
    return [];
  }
};