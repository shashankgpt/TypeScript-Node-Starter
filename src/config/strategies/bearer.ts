import passport from "passport";
import request from "request";
// tslint:disable-next-line:variable-name
const BearerStrategy = require("passport-http-bearer").Strategy;

import { Token, TokenDocument } from "../../app/models/token-collection";
import { TokenHelper } from "../../app/helpers/token-helper";
// tslint:disable-next-line:variable-name

export function initBearerStrategy() {
  passport.use(
               new BearerStrategy(async(token: any, done: any) => {
                 const tokenHelp = new TokenHelper();
                 const result = await tokenHelp.getToken(token);
                 if (result === "Unauthorized.") {
                   return done(undefined, false, { message: "Unauthorized." });
                 }
                 done(undefined, result);
               }));
}
