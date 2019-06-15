import express from "express";
import passport from "passport";

import * as userController from "../controllers/user-controller";
import * as authenticationController from "../controllers/authentication-controller";

const router = express.Router();

/* GET users listing. */
router.get("/", authenticationController.authentication, userController.getUser);

export { router };
