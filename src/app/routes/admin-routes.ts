import express from "express";
import passport from "passport";

import * as userController from "../controllers/user-controller";
import * as authenticationController from "../controllers/authentication-controller";
import * as authorisationController from "../middlewares/authorisation-handler";

const router = express.Router();

router.use(authenticationController.authentication);
router.use(authorisationController.isAdmin);
/* GET users listing. */
router.get("/listOfUser", userController.getAllUser);
router.get("/logoutAll/:username", userController.logoutAll);
router.get("/:username", userController.getUser);
router.patch("/lockUser/:username", userController.lockUser);
router.patch("/unlockUser/:username", userController.unlockUser);
router.patch("/activateUser/:username", userController.activateUser);
router.patch("/deactivateUser/:username", userController.deactivateUser);
router.patch("/changeRole/:username", userController.changeRole);
router.put("/:username",  userController.updateProfile);
router.delete("/:username", userController.deleteUser);

export { router };
