import { json, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import { MarketModel } from "../model/modals";
import { number } from "zod";
dotenv.config();
const COINPAPRIKA_URL = "https://api.coinpaprika.com/v1/tickers";

type WeeklyCandle = {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
};
const finageKey = process.env.FINAGE_KEY;
const API_KEY = process.env.SECRET_KEY;

export async function cryptoinfo(req: Request, res: Response) {
  const currency = req.query.CUR;
  const COIN = req.query.coin;
  if (!currency || !COIN) {
    return res.status(400).json({ error: "missing field" });
  }
  try {
    const data = await axios.get(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${COIN}&to_currency=${currency}&apikey=${API_KEY}`,

      // `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=demo`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const raw = data.data["Realtime Currency Exchange Rate"];

    if (!raw) {
      return res.status(429).json({
        error: "Rate limit hit",
        raw: data.data,
      });
    }
    console.log(raw);
    const cleanedData = {
      pair: `${raw["1. From_Currency Code"]}/${raw["3. To_Currency Code"]}`,
      from: raw["1. From_Currency Code"],
      to: raw["3. To_Currency Code"],
      rate: Number(raw["5. Exchange Rate"]),
      bid: Number(raw["8. Bid Price"]),
      ask: Number(raw["9. Ask Price"]),
      lastUpdated: raw["6. Last Refreshed"],
    };

    console.log(cleanedData);
    return res.json({ cleanedData });
  } catch (error) {
    return res.status(400).json({ "failed to fetch data": error });
  }
}

export async function chartweekly(req: Request, res: Response) {
  const currency = req.query.CUR;
  const COIN = req.query.coin;
  if (!currency || !COIN) {
    return res.status(400).json({ error: "missing field" });
  }
  try {
    const cached = await MarketModel.findOne({
      assetType: "forex",
      symbol: `${currency} ${COIN}`,
      market: "global",
      timeframe: "weekly",
    });
    if (
      cached &&
      Date.now() - cached.fetchedAt.getTime() <= 12 * 60 * 60 * 1000
    ) {
      console.log("cache", cached);
      return res.status(200).json({ priceSeries: cached.data });
    }
    const data = await axios.get(
      `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=${COIN}&market=${currency}&apikey=${API_KEY}`,
      // "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=BTC&market=EUR&apikey=demo",
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const raw = data.data["Time Series (Digital Currency Weekly)"] as Record<
      string,
      WeeklyCandle
    >;

    const priceSeries = Object.entries(raw).map(([date, values]) => ({
      date,
      price: Number(values["4. close"]),
    }));

    priceSeries.reverse();

    await MarketModel.findOneAndUpdate(
      {
        assetType: "forex",
        symbol: `${currency} ${COIN}`,
        market: "global",
        timeframe: "weekly",
      },
      {
        data: priceSeries,
        source: "alphavantage",
        fetchedAt: new Date(),
      },
      { upsert: true },
    );

    console.log(data, priceSeries);
    return res.json({ priceSeries });
  } catch (error: any) {
    console.error("Axios error:", error.response?.data || error.message);
    return res.status(500).json({
      error: "failed to fetch data",
      details: error.response?.data || error.message,
    });
  }
}

export async function gainlosers(req: Request, res: Response) {
  try {
    const coins = [
      "BTC",
      "ETH",
      "SOL",
      "BNB",
      "XRP",
      "ADA",
      "DOGE",
      "AVAX",
      "DOT",
      "MATIC",
    ];
    const results: {
      coin: string;
      change: number;
      price: number;
    }[] = [];

    const cached = await MarketModel.findOne({
      assetType: "crypto",
      symbol: `Gainers Losers`,
      market: "global",
      timeframe: "daily",
    });
    if (
      cached &&
      Date.now() - cached.fetchedAt.getTime() <= 12 * 60 * 60 * 1000
    ) {
      console.log("cache", cached);
      return res.status(200).json({ data: cached.data });
    }
    for (let coin of coins) {
      const data = await axios.get(
        `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${coin}&market=EUR&apikey=${API_KEY}`,
        // `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=EUR&apikey=demo`,

        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const series = data.data["Time Series (Digital Currency Daily)"];
      if (!series) continue;
      const dates = Object.keys(series).sort((a, b) => b.localeCompare(a));
      if (dates.length < 2) continue;
      const today = series[dates[0]];
      const yesterday = series[dates[1]];

      const todayClose = Number(today["4. close"]);
      const yesterdayClose = Number(yesterday["4. close"]);

      const change = ((todayClose - yesterdayClose) / yesterdayClose) * 100;
      results.push({
        coin,
        price: Number(todayClose.toFixed(2)),
        change: Number(change.toFixed(2)),
      });
    }
    results.sort((a, b) => b.change - a.change);

    const data = {
      gainers: results.filter((c) => c.change > 0).slice(0, 5),
      losers: results.filter((c) => c.change < 0).slice(-5),
      all: results,
      market: "EUR",
      updatedAt: new Date().toISOString(),
    };

    await MarketModel.findOneAndUpdate(
      {
        assetType: "forex",

        symbol: `Gainers Losers`,
        market: "global",
        timeframe: "daily",
      },
      {
        data: data,
        source: "alphavantage",
        fetchedAt: new Date(),
      },
      { upsert: true },
    );

    return res.json({ data });
  } catch (error: any) {
    console.error("Axios error:", error.response?.data || error.message);
    return res.status(500).json({
      error: "failed to fetch data",
      details: error.response?.data || error.message,
    });
  }
}

export async function finagecrypto(req: Request, res: Response) {
  const COIN = req.query.coin;
  if (!COIN) {
    return res.status(400).json({ error: "missing field" });
  }
  try {
    const data = await axios.get(
      `https://api.finage.co.uk/last/crypto/${COIN}?apikey=${finageKey}`,
      // `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=demo`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const raw = data.data;
    console.log(raw);
    const cleanedData = {
      price: raw?.price,
      symbol: raw?.symbol,
    };
    console.log(cleanedData);
    return res.json({ cleanedData });
  } catch (error) {
    return res.status(400).json({ "failed to fetch data": error });
  }
}

export async function curexchangee(req: Request, res: Response) {
  const tocurr = req.query.to;
  if (!tocurr) {
    return res.status(400).json({ error: "missing field" });
  }
  try {
    const cached = await MarketModel.findOne({
      assetType: "forex",
      symbol: `currency exchange`,
      market: "global",
      timeframe: "daily",
    });
    if (
      cached &&
      Date.now() - cached.fetchedAt.getTime() <= 12 * 60 * 60 * 1000
    ) {
      console.log("cache", cached);
      return res.status(200).json({ cleaned: cached.data });
    }
    const data = await axios.get(
      // `https://www.alphavantage.co/query?function=fx_daily&from_symbol=${fromcur}&to_symbol=${tocur}&apikey=${api_key}`,

      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json`,
    );

    const raw = data.data.eur;
    const cleaned = {
      from: "EUR",
      to: raw[tocurr as string],
    };

    await MarketModel.findOneAndUpdate(
      {
        assetType: "forex",

        symbol: `currency exchange`,
        market: "global",
        timeframe: "daily",
      },
      {
        data: cleaned,
        source: "alphavantage",
        fetchedAt: new Date(),
      },
      { upsert: true },
    );

    console.log(raw, cleaned, tocurr);
    return res.json({ cleaned });
  } catch (error: any) {
    console.error("axios error:", error.response?.data || error.message);
  }
}

export const getCryptoTable = async (req: Request, res: Response) => {
  try {
    const {
      limit = 20,
      page = 1,
      search,
    } = req.query as {
      limit?: string;
      page?: string;
      search?: string;
    };

    const cached = await MarketModel.findOne({
      assetType: "crypto",
      symbol: `crypto table`,
      market: "global",
      timeframe: "daily",
    });
    if (
      cached &&
      Date.now() - cached.fetchedAt.getTime() <= 12 * 60 * 60 * 1000
    ) {
      console.log("cache", cached.data);
      return res.status(200).json({ data: cached.data });
    }
    const response = await axios.get(COINPAPRIKA_URL);
    let data = response.data;

    // 🔍 Optional search (BTC, ETH, etc.)
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (coin: any) =>
          coin.symbol.toLowerCase().includes(q) ||
          coin.name.toLowerCase().includes(q),
      );
    }

    const start = (Number(page) - 1) * Number(limit);
    const end = start + Number(limit);

    const tableData = data.slice(start, end).map((coin: any) => ({
      id: coin.id,
      rank: coin.rank,
      symbol: coin.symbol,
      name: coin.name,
      price: coin.quotes.USD.price,
      change24h: coin.quotes.USD.percent_change_24h,
      marketCap: coin.quotes.USD.market_cap,
      volume24h: coin.quotes.USD.volume_24h,
      circulatingSupply: coin.circulating_supply,
    }));

    const cleaned = {
      meta: {
        page: Number(page),
        limit: Number(limit),
        total: data.length,
      },
      data: tableData,
    };
    await MarketModel.findOneAndUpdate(
      {
        assetType: "crypto",
        symbol: `crypto table`,
        market: "global",
        timeframe: "daily",
      },
      {
        data: cleaned.data,
        source: "alphavantage",
        fetchedAt: new Date(),
      },
      { upsert: true },
    );
    console.log(cleaned.data);
    res.json({ data: cleaned.data });
  } catch (error) {
    console.error("CoinPaprika fetch failed", error);
    res.status(500).json({ message: "Failed to fetch crypto data" });
  }
};
