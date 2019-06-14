import express from "express";
import * as userController from "../controllers/user-controller";

const router = express.Router();

/* GET users listing. */
router.post("/register", userController.register);
router.post("/login", userController.login);

export { router };
