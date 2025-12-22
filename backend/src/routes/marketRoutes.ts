import { Router } from "express";
import {
  exchangeRates,
  stocksinfo,
  cryptomarket,
  marketStatus,
} from "../controller/marketControllers";
const router = Router();

router.get("/forex", exchangeRates);
router.get("/stocks", stocksinfo);
router.get("/crypto", cryptomarket);
router.get("/status", marketStatus);

export default router;
