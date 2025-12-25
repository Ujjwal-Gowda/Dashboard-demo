import { Router } from "express";
import {
  exchangeRates,
  stocksinfo,
  cryptomarket,
  marketStatus,
  weeklyexchangeRates,
} from "../controller/marketControllers";
const router = Router();

router.get("/forex", exchangeRates);
router.get("/weeklyex", weeklyexchangeRates);
router.get("/stocks", stocksinfo);
router.get("/crypto", cryptomarket);
router.get("/status", marketStatus);

export default router;
