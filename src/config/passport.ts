import passport from "passport";
import request from "request";
import passportLocal from "passport-local";
import passportFacebook from "passport-facebook";
import lodash from "lodash";
import * as local from "./strategies/local";
import * as facebook from "./strategies/facebook";
import * as basic from "./strategies/basic";
// import { User, UserType } from '../models/User';
import { User1 } from "../app/models/user-collection";
import { Request, Response, NextFunction } from "express";
const BasicStrategy = require("passport-http").BasicStrategy;

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
  User1.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in using Email and Password.
 */
local.initLocalStrategy();
basic.initHttpBasicStrategy();
// tslint:disable-next-line:max-line-length
/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */

/**
 * Sign in with Facebook.
 */
facebook.initFacebookStrategy();
/**
 * Login Required middleware.
 */
export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

/**
 * Authorization Required middleware.
 */
export let isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  const provider = req.path.split("/").slice(-1)[0];

  if (lodash.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
