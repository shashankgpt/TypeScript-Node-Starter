import express from "express";
import * as userController from "../controllers/user-controller";
import * as authenticationController from "../controllers/authentication-controller";

const router = express.Router();

/* GET users listing. */
router.post("/register", userController.register);
router.post("/login", authenticationController.login);
router.patch("/activateUser/:username", userController.activateUser);
router.patch("/forgotPassword", userController.forgotPassword);
router.patch("/forgotPasswordReq", userController.forgotPasswordReq);

export { router };
