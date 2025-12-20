import { Router } from "express";
import { exchangeRates, stocksinfo } from "../controller/marketControllers";
const router = Router();

router.get("/forex", exchangeRates);
router.get("/stocks", stocksinfo);

export default router;
