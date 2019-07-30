import express from "express";
import * as logController from "../controllers/log-controller";

const router = express.Router();

/* GET users listing. */
router.post("/error", logController.logError);
router.post("/warn", logController.logWarning);
router.post("/notice", logController.logNotice);
router.post("/critical", logController.logCritical);

export { router };
