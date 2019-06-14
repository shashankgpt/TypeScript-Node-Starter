import express from "express";
import * as userController from "../controllers/user-controller";

const router = express.Router();

/* GET users listing. */
router.get("/", userController.getUser);

export { router };
