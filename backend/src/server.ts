import express from "express";
import { Connectiondb } from "./db";
import cors from "cors";
const app = express();

app.use(cors);
Connectiondb();
app.listen(5000, () => {
  console.log("port running at http://localhost:5000");
});
