import express from "express";
import passport from "passport";

import * as blogController from "../controllers/blog-controller";
import * as authenticationController from "../controllers/authentication-controller";

const router = express.Router();

router.use(authenticationController.authentication);
/* GET users listing. */
router.post("/", blogController.createBlog);

export { router };
