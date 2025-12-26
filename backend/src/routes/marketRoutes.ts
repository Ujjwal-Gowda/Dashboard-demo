import { Router } from "express";
import {
  exchangeRates,
  stocksinfo,
  cryptomarket,
  marketStatus,
  weeklyexchangeRates,
  stockschart,
} from "../controller/marketControllers";
const router = Router();

router.get("/forex", exchangeRates);
router.get("/weeklyex", weeklyexchangeRates);
router.get("/stocks", stocksinfo);
router.get("/stockschart", stockschart);
router.get("/crypto", cryptomarket);
router.get("/status", marketStatus);

export default router;
