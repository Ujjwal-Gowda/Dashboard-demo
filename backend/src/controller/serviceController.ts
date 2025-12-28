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
  const amount = Number(req.query.amount);

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }
  if (Number(amount) <= 0) {
    return res.status(400).json({ message: "amount not specefied" });
  }
  if (fromType != "stocks" && toType != "stocks") {
    if (toType != "crypto") {
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
          rate: Number(amount) * Number(raw["5. Exchange Rate"]),
        };
        console.log(cleanedData);
        return res.json({ cleanedData });
      } catch (error) {
        return res.status(400).json({ "failed to fetch data": error });
      }
    } else if (toType == "crypto" && fromType == "forex") {
      try {
        const data = await axios.get(
          `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${toSymbol}&to_currency=${fromSymbol}&apikey=${API_KEY}`,

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
        const forexfetch = {
          from: raw["1. From_Currency Code"],
          to: raw["3. To_Currency Code"],
          rate: Number(raw["5. Exchange Rate"]),
        };
        const cleanedData = {
          from: fromSymbol,
          to: toSymbol,
          rate: Number(amount) / forexfetch.rate,
        };
        console.log(cleanedData);
        return res.json({ cleanedData });
      } catch (error) {
        return res.status(400).json({ "failed to fetch data": error });
      }
    }
  } else if ((toType == "stocks" && fromType == "forex") || "crypto") {
    try {
      const data = await axios.get(
        // `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${toSymbol}&to_currency=${fromSymbol}&apikey=${API_KEY}`,

        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo`,
        // `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=demo`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const raw = data.data["Global Quote"];

      if (!raw) {
        return res.status(429).json({
          error: "Rate limit hit",
          raw: data.data,
        });
      }
      console.log(raw);

      const cleanedData = {
        from: fromSymbol,
        to: toSymbol,
        rate: Number(amount) * Number(raw["05. price"]),
      };
      let stockstotal = Number(amount) * raw["05. price"];

      if (toType == "forex") {
        if (toSymbol !== "USD") {
          try {
            const data = await axios.get(
              `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${"USD"}&to_currency=${toSymbol}&apikey=${API_KEY}`,

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
              from: fromSymbol,
              to: toSymbol,
              rate: stockstotal * Number(raw["5. Exchange Rate"]),
            };
            console.log(cleanedData);
            return res.json({ cleanedData });
          } catch (error) {
            return res.status(400).json({ "failed to fetch data": error });
          }
        }
        console.log(cleanedData);
        return res.json({ cleanedData });
      } else if (toType == "crypto") {
        try {
          const data = await axios.get(
            `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${toSymbol}&to_currency=${"USD"}&apikey=${API_KEY}`,

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
          const forexfetch = {
            from: raw["1. From_Currency Code"],
            to: raw["3. To_Currency Code"],
            rate: Number(raw["5. Exchange Rate"]),
          };
          const cleanedData = {
            from: fromSymbol,
            to: toSymbol,
            rate: stockstotal / forexfetch.rate,
          };
          console.log(cleanedData);
          return res.json({ cleanedData });
        } catch (error) {
          return res.status(400).json({ "failed to fetch data": error });
        }
      } else if (toType == "stocks") {
        try {
          const data = await axios.get(
            // `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${toSymbol}&to_currency=${fromSymbol}&apikey=${API_KEY}`,

            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo`,
            // `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=demo`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          const raw = data.data["Global Quote"];

          if (!raw) {
            return res.status(429).json({
              error: "Rate limit hit",
              raw: data.data,
            });
          }
          console.log(raw);

          const cleanedData = {
            from: fromSymbol,
            to: toSymbol,
            rate: stockstotal / Number(raw["05. price"]),
          };
          console.log(cleanedData);
          return res.json({ cleanedData });
        } catch (error) {
          return res.status(400).json({ "failed to fetch data": error });
        }
      }
    } catch (error) {
      return res.status(400).json({ "failed to fetch data": error });
    }
  }
}
