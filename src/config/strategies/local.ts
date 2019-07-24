import passport from "passport";
import request from "request";
import passportLocal from "passport-local";
import { User1 } from "../../app/models/user-collection";
const localStrategy = passportLocal.Strategy;

export function initLocalStrategy() {
  passport.use(new localStrategy({ usernameField: "email" }, (email, password, done) => {
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
