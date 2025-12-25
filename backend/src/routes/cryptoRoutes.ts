import { Router } from "express";
import {
  cryptoinfo,
  chartweekly,
  gainlosers,
  finagecrypto,
  curexchangee,
  getCryptoTable,
} from "../controller/cryptoControllers";

const router = Router();

router.get("/kpi", cryptoinfo);
router.get("/curr", curexchangee);
router.get("/finage", finagecrypto);
router.get("/table", getCryptoTable);
router.get("/weekly", chartweekly);
router.get("/gainloss", gainlosers);

export default router;
