const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  // crypto  endpoints
  cryptoKpi: `${API_URL}/api/crypto/kpi`,
  cryptoCurr: `${API_URL}/api/crypto/curr`,
  cryptoFinage: `${API_URL}/api/crypto/finage`,
  cryptoTable: `${API_URL}/api/crypto/table`,
  cryptoWeekly: `${API_URL}/api/crypto/weekly`,
  cryptoGainLoss: `${API_URL}/api/crypto/gainloss`,

  // market endpoints
  marketForex: `${API_URL}/api/market/forex`,
  marketWeeklyEx: `${API_URL}/api/market/weeklyex`,
  marketStocks: `${API_URL}/api/market/stocks`,
  marketStocksChart: `${API_URL}/api/market/stockschart`,
  marketCrypto: `${API_URL}/api/market/crypto`,
  marketStatus: `${API_URL}/api/market/status`,

  // service endpoints
  serviceConvert: `${API_URL}/api/service/convert`,
} as const;

export { API_URL };
