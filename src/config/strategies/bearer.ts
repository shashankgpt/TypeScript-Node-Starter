import passport from "passport";
import request from "request";
import promiseErrorHandler from "../../app/middlewares/promise.error-handler";
// tslint:disable-next-line:variable-name
const BearerStrategy = require("passport-http-bearer").Strategy;

import { Token, TokenDocument } from "../../app/models/token-collection";
import { TokenHelper } from "../../app/helpers/token-helper";
import { UNAUTHORIZED } from "../util/response-message";
import { booleanLiteral } from "babel-types";
import { ObjectId } from "mongodb";
// tslint:disable-next-line:variable-name

export function initBearerStrategy() {
  passport.use(
               new BearerStrategy(async(token: any, done: any) => {
                 const tokenHelp = new TokenHelper();
                 const result = await promiseErrorHandler<boolean, ObjectId>(
                   tokenHelp.getToken(token));
                 if (result === false) {
                   return done(undefined, false, { message: UNAUTHORIZED });
                 }
                 done(undefined, result);
               }));
}
