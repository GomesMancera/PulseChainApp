import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1';

export async function fetchBitcoinMarketData() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do Bitcoin:', error);
    return null;
  }
}
