import express from "express";
import passport from "passport";

import * as userController from "../controllers/user-controller";
import * as authenticationController from "../controllers/authentication-controller";

const router = express.Router();

router.use(authenticationController.authentication);
/* GET users listing. */
router.get("/", userController.getLoggedUserProfile);
router.get("/logout", userController.logout);
// router.get("/listOfUser", userController.getAllUser);
// router.get("/:username", userController.getUser);
router.patch("/updatePassword", userController.updatePassword);
// router.patch("/lockUser/:username", userController.lockUser);
// router.patch("/unlockUser/:username", userController.unlockUser);
// router.patch("/deactivateUser/:username", userController.deactivateUser);
// router.patch("/changeRole/:username", userController.changeRole);
// TO DO updateProfile for logged IN
router.put("/",  userController.updateLoggedInProfile);
// router.put("/:username",  userController.updateProfile);
// router.delete("/:username", userController.deleteUser);

export { router };
