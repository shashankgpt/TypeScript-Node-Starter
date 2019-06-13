import passport from "passport";
import { Request, Response, NextFunction } from "express";

// Controllers (route handlers)
import * as homeController from "../controllers/home";
import * as userController from "../controllers/user";
import * as apiController from "../controllers/api";
import * as contactController from "../controllers/contact";
import * as passportConfig from "../config/passport";

export function initRoutes(app: any) {
  app.get("/", homeController.index);
  app.get("/login", userController.getLogin);
  app.post("/login", userController.postLogin);
  app.get("/logout", userController.logout);
  app.get("/forgot", userController.getForgot);
  app.post("/forgot", userController.postForgot);
  app.get("/reset/:token", userController.getReset);
  app.post("/reset/:token", userController.postReset);
  app.get("/signup", userController.getSignup);
  app.post("/signup", userController.postSignup);
  app.get("/contact", contactController.getContact);
  app.post("/contact", contactController.postContact);
  app.get("/account", passportConfig.isAuthenticated, userController.getAccount);
  app.post("/account/profile", passportConfig.isAuthenticated, userController.postUpdateProfile);
  app.post("/account/password", passportConfig.isAuthenticated, userController.postUpdatePassword);
  app.post("/account/delete", passportConfig.isAuthenticated, userController.postDeleteAccount);
  app.get("/account/unlink/:provider",
          passportConfig.isAuthenticated,
          userController.getOauthUnlink);
  app.get("/api", apiController.getApi);
  app.get("/api/facebook",
          passportConfig.isAuthenticated
  ,       passportConfig.isAuthorized
  ,       apiController.getFacebook);

  /**
   * OAuth authentication routes. (Sign in)
   */
  app.get("/auth/facebook",
          passport.authenticate("facebook",
                                { scope: ["email", "public_profile"] }));
  app.get("/auth/facebook/callback",
          passport.authenticate("facebook",
                                { failureRedirect: "/login" }),
          (req: Request, res: Response) => {
            res.redirect(req.session.returnTo || "/");
          });

}
