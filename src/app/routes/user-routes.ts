import express from "express";
import passport from "passport";

import * as userController from "../controllers/user-controller";
import * as authenticationController from "../controllers/authentication-controller";

const router = express.Router();

router.use(authenticationController.authentication);
/* GET users listing. */
router.get("/", userController.getLoggedUserProfile);
router.get("/:username", userController.getUser);
router.patch("/updatePassword", userController.updatePassword);
router.put("/:username",  userController.updateProfile);
router.delete("/:username", userController.deleteUser);

export { router };
