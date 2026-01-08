import express from "express";
import { Connectiondb } from "./db";
import cors from "cors";
import cryptoRoutes from "./routes/cryptoRoutes";
import marketRoutes from "./routes/marketRoutes";
import serviceRoutes from "./routes/serviceroutes";
const app = express();

app.use(cors());
Connectiondb();
app.use("/api/crypto", cryptoRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/service", serviceRoutes);
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});
app.listen(5000, () => {
  console.log("port running at http://localhost:5000");
});
