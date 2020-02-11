import express from "express";
import * as userController from "../controllers/user-controller";
import * as authenticationController from "../controllers/authentication-controller";
import * as logController from "../controllers/log-controller";

const router = express.Router();

/* GET users listing. */
router.get("/gold", logController.goldPrice);
router.post("/register", userController.register);
router.post("/login", authenticationController.login);
router.patch("/activateUser/:username", userController.activateUser);
router.patch("/forgotPassword", userController.forgotPassword);
router.patch("/forgotPasswordReq", userController.forgotPasswordReq);

export { router };
