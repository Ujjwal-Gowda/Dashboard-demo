import express from "express";
import { Connectiondb } from "./db";
import cors from "cors";
import cryptoRoutes from "./routes/cryptoRoutes";
const app = express();

app.use(cors());
// Connectiondb();
app.use("/api/crypto", cryptoRoutes);
app.use("/health", () => {
  console.log("health check");
});
app.listen(5000, () => {
  console.log("port running at http://localhost:5000");
});
