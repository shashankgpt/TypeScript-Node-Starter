import express from "express";
import passport from "passport";

import * as userController from "../controllers/user-controller";
import * as authenticationController from "../controllers/authentication-controller";

const router = express.Router();

router.use(authenticationController.authentication);
/* GET users listing. */
router.get("/", userController.getLoggedUserProfile);
router.get("/username/:username", userController.getUser);
router.patch("/updatePassword", userController.updatePassword);
router.patch("/forgotPassword", userController.forgotPassword);
router.patch("/lockUser/:username", userController.lockUser);
router.patch("/unlockUser/:username", userController.unlockUser);
router.patch("/activateUser/:username", userController.activateUser);
router.patch("/deactivateUser/:username", userController.deactivateUser);

router.patch("/changeRole/:username", userController.deactivateUser);

router.get("/listOfUser", userController.getAllUser);
router.put("/:username",  userController.updateProfile);
router.delete("/:username", userController.deleteUser);

export { router };
