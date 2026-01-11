import express from "express";
import { Connectiondb } from "./db";
import cors from "cors";
import cryptoRoutes from "./routes/cryptoRoutes";
import marketRoutes from "./routes/marketRoutes";
import serviceRoutes from "./routes/serviceroutes";
import { rediscon } from "./lib/redis";
import { Request, Response } from "express";
const app = express();

const allowedOrigins = [
  "https://dashboard-demo-phi-two.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
Connectiondb();
app.use("/api/crypto", cryptoRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/service", serviceRoutes);
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});
rediscon();
app.listen(5000, () => {
  console.log("port running at http://localhost:5000");
});
