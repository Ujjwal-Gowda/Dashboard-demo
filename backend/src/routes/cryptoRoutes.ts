import { Router } from "express";
import {
  cryptoinfo,
  chartweekly,
  gainlosers,
} from "../controller/cryptoControllers";

const router = Router();

router.get("/kpi", cryptoinfo);
router.get("/weekly", chartweekly);
router.get("/gainloss", gainlosers);

export default router;
