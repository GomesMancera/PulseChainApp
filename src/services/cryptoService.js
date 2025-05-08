import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

// 🟢 1. Market Chart do Bitcoin (últimas 24h)
export async function fetchBitcoinMarketData() {
  try {
    const response = await axios.get(`${BASE_URL}/coins/bitcoin/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do Bitcoin:', error);
    return null;
  }
}

// 🌐 2. Market Cap Global
export async function getGlobalMarketData() {
  try {
    const response = await axios.get(`${BASE_URL}/global`);
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar dados globais:', error);
    return null;
  }
}

// 🌍 3. Dados por região com base em moedas populares
export async function getRegionalVolumes() {
  const coinIds = [
    'bitcoin', 'litecoin', 'ethereum', 'binancecoin',
    'polygon', 'tron', 'ripple', 'dogecoin',
  ];
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        ids: coinIds.join(','),
        price_change_percentage: '24h',
        per_page: 100,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados regionais:', error.message);
    return [];
  }
}


