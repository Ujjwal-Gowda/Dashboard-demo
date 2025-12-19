import { Router } from "express";
import { cryptoinfo, chartweekly } from "../controller/cryptoControllers";

const router = Router();

router.get("/kpi", cryptoinfo);
router.get("/weekly", chartweekly);

export default router;
