import express from "express";
import * as templateController from "../controllers/template-controller";

const router = express.Router();
import * as authenticationController from "../controllers/authentication-controller";
import * as authorisationController from "../middlewares/authorisation-handler";

router.use(authenticationController.authentication);
router.use(authorisationController.isAdmin);

/* GET users listing. */
router.post("/create", templateController.saveTemplate);

export { router };
