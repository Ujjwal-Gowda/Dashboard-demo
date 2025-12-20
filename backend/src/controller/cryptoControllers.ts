import { json, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import { number } from "zod";
dotenv.config();

type WeeklyCandle = {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
};
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
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const raw = data.data["Realtime Currency Exchange Rate"];

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
    return res.json({ "failed to fetch data": error });
  }
}

("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=BTC&market=EUR&apikey=demo");
export async function chartweekly(req: Request, res: Response) {
  const currency = req.query.CUR;
  const COIN = req.query.coin;
  if (!currency || !COIN) {
    return res.status(400).json({ error: "missing field" });
  }
  try {
    const data = await axios.get(
      // `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=${COIN}&market=${currency}&apikey=${API_KEY}`,
      "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=BTC&market=EUR&apikey=demo",
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
    for (let coin of coins) {
      const data = await axios.get(
        // `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${coin}&market=EUR&apikey=${API_KEY}`,
        `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=EUR&apikey=demo`,

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

    return res.json({
      gainers: results.filter((c) => c.change > 0).slice(0, 5),
      losers: results.filter((c) => c.change < 0).slice(-5),
      all: results,
      market: "EUR",
      updatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Axios error:", error.response?.data || error.message);
    return res.status(500).json({
      error: "failed to fetch data",
      details: error.response?.data || error.message,
    });
  }
}
