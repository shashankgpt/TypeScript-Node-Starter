import express from "express";
import * as templateController from "../controllers/template-controller";

const router = express.Router();

/* GET users listing. */
router.post("/create", templateController.saveTemplate);

export { router };
