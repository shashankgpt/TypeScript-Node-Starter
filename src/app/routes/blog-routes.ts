import express from "express";
import passport from "passport";

import * as blogController from "../controllers/blog-controller";
import * as authenticationController from "../controllers/authentication-controller";
import * as authorisationController from "../middlewares/authorisation-handler";

const router = express.Router();

router.use(authenticationController.authentication);
router.use(authorisationController.isAdmin);
/* GET users listing. */
router.post("/", blogController.createBlog);
router.get("/", blogController.getAll);
router.post("/existBlogName", blogController.checkName);
router.get("/:blogId", blogController.getAllByID);
router.get("/user/:userID", blogController.getAllByUserID);
router.patch("/activate/:blogId", blogController.activeByBlogID);
router.patch("/deactivate/:blogId", blogController.deActiveByBlogID);
router.patch("/flagged/:blogId", blogController.flaggedByBlogID);
router.patch("/unFlagged/:blogId", blogController.unFlaggedByBlogID);
router.put("/:blogId", blogController.updateBlog);
router.get("/byAuthor/:author", blogController.getAllByAuthor);
router.delete("/deleteBlogId/:blogId", blogController.deleteBlogsById);
router.delete("/deleteBlogAuthor/:author", blogController.deleteBlogsByAuthor);

export { router };
