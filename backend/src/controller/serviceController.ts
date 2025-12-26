import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.SECRET_KEY;
export async function converterEnd(req: Request, res: Response) {
  const fromSymbol = req.query.from;
  const toSymbol = req.query.to;
  const fromType = req.query.ftype;
  const toType = req.query.toType;
  if (!fromSymbol || !toType || !toSymbol || !fromType) {
    return res.status(400).json({ message: "missing field" });
  }
  let Endpoint = "";
  if (fromType != "stocks" && toType != "stocks") {
    try {
      const data = await axios.get(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromSymbol}&to_currency=${toSymbol}&apikey=${API_KEY}`,

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
        from: raw["1. From_Currency Code"],
        to: raw["3. To_Currency Code"],
        rate: Number(raw["5. Exchange Rate"]),
      };
      console.log(cleanedData);
      return res.json({ cleanedData });
    } catch (error) {
      return res.status(400).json({ "failed to fetch data": error });
    }
  }
}
