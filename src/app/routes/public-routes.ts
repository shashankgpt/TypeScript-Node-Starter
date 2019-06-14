import express from "express";
import * as userController from "../controllers/user-controller";

const router = express.Router();

/* GET users listing. */
router.post("/register", userController.register);

export { router };
