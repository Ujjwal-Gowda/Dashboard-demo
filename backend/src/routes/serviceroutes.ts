import { Router } from "express";
import { converterEnd } from "../controller/serviceController";
const router = Router();

router.get("/convert", converterEnd);

export default router;
