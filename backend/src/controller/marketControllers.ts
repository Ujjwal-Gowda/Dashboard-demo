import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import { number } from "zod";
dotenv.config();
const API_KEY = process.env.SECRET_KEY;
type WeeklyCandle = {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
};
export async function exchangeRates(req: Request, res: Response) {
  const FromCur = req.query.from;
  const ToCur = req.query.to;
  const size = req.query.size;
  console.log("hit");
  if (!FromCur || !ToCur) {
    return res.status(400).json({ error: "missing field" });
  }
  try {
    const result = await axios.get(
      // `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${FromCur}&to_symbol=${ToCur}&apikey=${API_KEY}`,
      `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=demo`,
    );

    const raw = result.data["Time Series FX (Daily)"] as Record<
      string,
      WeeklyCandle
    >;

    const data = Object.entries(raw).map(([date, values]) => ({
      date,
      open: Number(values["1. open"]),
      high: Number(values["2. high"]),
      low: Number(values["3. low"]),
      price: Number(values["4. close"]),
    }));
    if (size == "7days") {
      const response = data.slice(0, 7);
      return res.json({ response });
    } else if (size == "30days") {
      const response = data.slice(0, 30);
      return res.json({ response });
    }

    console.log(data, FromCur, ToCur);
    return res.json({ data });
  } catch (error: any) {
    console.error("Axios error:", error.response?.data || error.message);
  }
}

export async function weeklyexchangeRates(req: Request, res: Response) {
  const FromCur = req.query.from;
  const ToCur = req.query.to;
  const size = req.query.size;

  console.log("hit");
  if (!FromCur || !ToCur) {
    return res.status(400).json({ error: "missing field" });
  }
  try {
    const data = await axios.get(
      // `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${FromCur}&to_symbol=${ToCur}&apikey=${API_KEY}`,
      `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=demo`,
    );

    const raw = data.data["Time Series FX (Daily)"] as Record<
      string,
      WeeklyCandle
    >;
    const priceSeries = Object.entries(raw).map(([date, values]) => ({
      date,
      price: Number(values["4. close"]),
    }));
    if (size == "7days") {
      const response = priceSeries.slice(0, 7);
      return res.json({ response });
    } else if (size == "30days") {
      const response = priceSeries.slice(0, 30);
      return res.json({ response });
    }

    console.log(priceSeries, FromCur, ToCur, "whyyyy");
    return res.json({ priceSeries });
  } catch (error: any) {
    console.error("Axios error:", error.response?.data || error.message);
  }
}
export async function stocksinfo(req: Request, res: Response) {
  const symbol = req.query.symbol;

  const size = req.query.size;
  if (!symbol) {
    return res.status(400).json({ error: "missing field" });
  }
  try {
    const result = await axios.get(
      // `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=RELIANCE.BSE&outputsize=compact&apikey=demo`,
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=RELIANCE.BSE&outputsize=full&apikey=demo`,
    );

    const raw = result.data["Time Series (Daily)"] as Record<
      string,
      WeeklyCandle
    >;
    const data = Object.entries(raw).map(([date, values]) => ({
      date,
      open: Number(values["1. open"]),
      high: Number(values["2. high"]),
      low: Number(values["3. low"]),
      price: Number(values["4. close"]),
      volume: Number(values["5. volume"]),
    }));
    if (size == "7days") {
      const response = data.slice(0, 7);
      return res.json({ response });
    } else if (size == "30days") {
      const response = data.slice(0, 30);
      return res.json({ response });
    }
    console.log(data);
    return res.json({ data });
  } catch (error: any) {
    console.error("Axios error:", error.response?.data || error.message);
  }
}

export async function stockschart(req: Request, res: Response) {
  const symbol = req.query.symbol;

  const size = req.query.size;
  if (!symbol) {
    return res.status(400).json({ error: "missing field" });
  }
  try {
    const result = await axios.get(
      // `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=RELIANCE.BSE&outputsize=compact&apikey=demo`,
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=RELIANCE.BSE&outputsize=full&apikey=demo`,
    );

    const raw = result.data["Time Series (Daily)"] as Record<
      string,
      WeeklyCandle
    >;
    const priceSeries = Object.entries(raw).map(([date, values]) => ({
      date,
      price: Number(values["4. close"]),
    }));
    if (size == "7days") {
      const response = priceSeries.slice(0, 7);
      return res.json({ response });
    } else if (size == "30days") {
      const response = priceSeries.slice(0, 30);
      return res.json({ response });
    }
    console.log(priceSeries);
    return res.json({ priceSeries });
  } catch (error: any) {
    console.error("Axios error:", error.response?.data || error.message);
  }
}

export async function cryptomarket(req: Request, res: Response) {
  const symbol = req.query.symbol;
  const market = req.query.market;
  const size = req.query.size;
  if (!symbol || !market) {
    return res.status(400).json({ error: "missing field" });
  }
  try {
    const result = await axios.get(
      // `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=${market}&apikey=${API_KEY}`,
      `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=EUR&apikey=demo`,
    );

    const raw = result.data["Time Series (Digital Currency Daily)"] as Record<
      string,
      WeeklyCandle
    >;
    console.log(res, symbol);
    const data = Object.entries(raw).map(([date, values]) => ({
      date,
      open: Number(values["1. open"]),
      high: Number(values["2. high"]),
      low: Number(values["3. low"]),
      price: Number(values["4. close"]),
      volume: Number(values["5. volume"]),
    }));
    if (size == "7days") {
      const response = data.slice(0, 7);
      return res.json({ response });
    } else if (size == "30days") {
      const response = data.slice(0, 30);
      return res.json({ response });
    }
    console.log(data);
    return res.json({ data });
  } catch (error: any) {
    console.error("Axios error:", error.response?.data || error.message);
  }
}
export function marketStatus(req: Request, res: Response) {
  const now = new Date();

  const istHour = now.getUTCHours() + 5.5;
  const istMinutes = now.getUTCMinutes();

  const isNSEOpen =
    (istHour > 9 || (istHour === 9 && istMinutes >= 15)) &&
    (istHour < 15 || (istHour === 15 && istMinutes <= 30));

  res.json({
    market: "NSE",
    open: isNSEOpen,
  });
}
