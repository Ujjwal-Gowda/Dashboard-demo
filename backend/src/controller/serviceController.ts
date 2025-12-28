import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const API_KEY = process.env.SECRET_KEY!;
const BASE_URL = "https://www.alphavantage.co/query";

type AssetType = "stocks" | "crypto" | "forex";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function stockToUSD(symbol: string): Promise<number> {
  await sleep(1100);

  const { data } = await axios.get(BASE_URL, {
    params: {
      function: "GLOBAL_QUOTE",
      symbol,
      apikey: API_KEY,
    },
  });

  const price = data?.["Global Quote"]?.["05. price"];
  if (!price) throw new Error("Stock price not found");

  return Number(price);
}

async function forexToUSD(symbol: string): Promise<number> {
  await sleep(1100);

  const { data } = await axios.get(BASE_URL, {
    params: {
      function: "CURRENCY_EXCHANGE_RATE",
      from_currency: symbol,
      to_currency: "USD",
      apikey: API_KEY,
    },
  });

  const rate = data?.["Realtime Currency Exchange Rate"]?.["5. Exchange Rate"];
  if (!rate) throw new Error("Forex rate not found");

  return Number(rate);
}

async function USDToforex(symbol: string): Promise<number> {
  await sleep(1100);

  const { data } = await axios.get(BASE_URL, {
    params: {
      function: "CURRENCY_EXCHANGE_RATE",
      from_currency: "USD",
      to_currency: symbol,
      apikey: API_KEY,
    },
  });

  const rate = data?.["Realtime Currency Exchange Rate"]?.["5. Exchange Rate"];
  if (!rate) throw new Error("Forex rate not found");

  return Number(rate);
}

async function cryptoToUSD(symbol: string): Promise<number> {
  await sleep(1100);

  const { data } = await axios.get(BASE_URL, {
    params: {
      function: "CURRENCY_EXCHANGE_RATE",
      from_currency: symbol,
      to_currency: "USD",
      apikey: API_KEY,
    },
  });
  console.log(data);
  const series =
    data?.["Realtime Currency Exchange Rate"]?.["5. Exchange Rate"];
  console.log(
    series,
    data?.["Realtime Currency Exchange Rate"]?.["5. Exchange Rate"],
  );
  if (!series) throw new Error("Crypto data not found");

  const price = series;
  if (!price) throw new Error("Crypto price not found");

  return Number(price);
}

async function toUSD(symbol: string, type: AssetType): Promise<number> {
  if (type === "stocks") return stockToUSD(symbol);
  if (type === "crypto") return cryptoToUSD(symbol);
  return forexToUSD(symbol);
}

async function fromUSD(symbol: string, type: AssetType): Promise<number> {
  if (type === "stocks") return 1 / (await stockToUSD(symbol));
  if (type === "crypto") return 1 / (await cryptoToUSD(symbol));
  return USDToforex(symbol);
}

export async function converterEnd(req: Request, res: Response) {
  try {
    const { from, to, fromType, toType, amount } = req.query;

    if (!from || !to || !fromType || !toType || !amount) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const qty = Number(amount);
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const usdRate = await toUSD(from as string, fromType as AssetType);
    const usdValue = qty * usdRate;

    const targetRate = await fromUSD(to as string, toType as AssetType);
    const result = usdValue * targetRate;

    res.json({
      from,
      fromType,
      to,
      toType,
      amount: qty,
      usdValue,
      result,
    });
  } catch (err: any) {
    res.status(500).json({
      error: "Conversion failed",
      message: err.message,
    });
  }
}
