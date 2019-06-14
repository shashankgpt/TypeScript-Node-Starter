import passport from "passport";
import request from "request";
const BasicStrategy = require("passport-http").BasicStrategy;
import { User1 } from "../../app/models/user-collection";

export function initHttpBasicStrategy() {
  // tslint:disable-next-line:max-line-length
  passport.use(new BasicStrategy({ usernameField: "email" }, (email: string, password: string, done: any) => {
    User1.findOne({ email: email.toLowerCase() }, (err, user: any) => {
      if (err) { return done(err); }
      if (!user) {
        return done(undefined, false, { message: `Email ${email} not found.` });
      }
      user.comparePassword(password, (err: Error, isMatch: boolean) => {
        if (err) { return done(err); }
        if (isMatch) {
          return done(undefined, user);
        }
        return done(undefined, false, { message: "Invalid email or password." });
      });
    });
  }));
}
