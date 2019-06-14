import { Request, Response, NextFunction } from "express";
import async from "async";
import crypto from "crypto";
import nodemailer from "nodemailer";
import passport from "passport";
import { User1, UserDocument, AuthToken } from "../models/user-collection";
import { IVerifyOptions } from "passport-local";
import { WriteError } from "mongodb";
export let getUser = (req: Request, res: Response, next: NextFunction) => {
  res.send("hello");
};

export let register = (req: Request, res: Response, next: NextFunction) => {
  req.assert("email", "Email is not valid").isEmail();
  req.assert("password", "Password must be at least 4 characters long").len({ min: 4 });
  // req.assert("confirmPassword", "Passwords do not match").equals(req.body.password);
  req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    console.log(errors);
  }

  const user = new User1({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    profile: {
      firstName : req.body.firstName,
    },
  });
  User1.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      req.flash("errors", { msg: "Account with that email address already exists." });
      // return res.redirect("/signup");
    }
    user.save((err) => {
      if (err) { return next(err); }
      res.send("Register");
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        // res.redirect("/");
      });
    });
  });
};
