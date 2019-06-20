import passport from "passport";
import request from "request";
const BasicStrategy = require("passport-http").BasicStrategy;
import { User1, UserDocument } from "../../app/models/user-collection";
import { UserHelper } from "../../app/helpers/user-helper";
import promiseErrorHandler from "../../app/middlewares/promise.error-handler";
export function initHttpBasicStrategy() {
  passport.use(
    new BasicStrategy(
      { usernameField: "username" },
      async (username: string, password: string, done: any) => {
        const userHelp = new UserHelper();
        const user = await promiseErrorHandler<boolean , UserDocument>(
          userHelp.findUserByUsername(username));
        if (user === false) {
          return done(undefined, false, { message: `username ${username} not found.` });
        }
        if (user instanceof User1) {
          user.comparePassword(password, (err: Error, isMatch: boolean) => {
            if (err) { return done(err); }
            if (isMatch) {
              return done(undefined, user);
            }
            return done(undefined, false, { message: "Invalid email or password." });
          });
        }
      }));
}
