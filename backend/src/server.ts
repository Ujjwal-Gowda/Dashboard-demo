import express from "express";
import { Connectiondb } from "./db";
import cors from "cors";
import cryptoRoutes from "./routes/cryptoRoutes";
import marketRoutes from "./routes/marketRoutes";
import serviceRoutes from "./routes/serviceroutes";
import { rediscon } from "./lib/redis";
import { Request, Response } from "express";
const app = express();

app.use(cors());
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
