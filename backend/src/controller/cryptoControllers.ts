import { Request, Response } from "express";
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
