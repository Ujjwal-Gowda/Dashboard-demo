import { Router } from "express";
import { exchangeRates } from "../controller/marketControllers";
const router = Router();

router.get("/forex", exchangeRates);

export default router;
