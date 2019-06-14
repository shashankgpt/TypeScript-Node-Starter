import { Request, Response, NextFunction } from "express";
import async from "async";
import crypto from "crypto";
import nodemailer from "nodemailer";
import passport from "passport";
import { User1, UserDocument, AuthToken } from "../models/user-collection";
import { IVerifyOptions } from "passport-local";
import { WriteError } from "mongodb";
import { UserHelper } from "../helpers/user-helper";
import { IResponseMessage } from "../data-types/interfaces/IResponseMessage";
import { CREATED, PRECONDITIONFAILED } from "../../config/util/response-code";
import "../../config/passport";
export let getUser = (req: Request, res: Response, next: NextFunction) => {
  res.send("hello");
};

export let register = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("email", "Email is not valid").isEmail();
  req.assert("password", "Password must be at least 4 characters long").len({ min: 4 });
  req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    console.log(errors);
  }
  const userHelp = new UserHelper();
  const exist = await userHelp.findUserByUsername(req.body.username);
  const exitEmail = await userHelp.findUserByEmail(req.body.email);
  if (exist || exitEmail) {
    let errMessage = "";
    if (exist) {
      errMessage += `Username ${req.body.username}`;
    }
    if (exist && exitEmail) {
      errMessage += " and ";
    }
    if (exitEmail) {
      errMessage += `email ${req.body.email}`;
    }
    const resMessage: IResponseMessage = {
      statusCode: PRECONDITIONFAILED,
      Message: `New User is cannot be created with ${errMessage}`,
      dateTime: new Date(),
    };
    return res.status(PRECONDITIONFAILED).json(resMessage);
  }
  const id = await userHelp.createUser(req.body);
  if (id) {
    const resMessage: IResponseMessage = {
      statusCode: CREATED,
      Message: `New User is created with Username ${req.body.username}`,
      dateTime: new Date(),
    };
    return res.status(CREATED).json(resMessage);
  }
};
export let login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("basic", (err: Error, user: UserDocument, info: IVerifyOptions) => {
    if (err) { return next(err); }
    if (!user) {
      // req.flash("errors", info.message);
      // return res.redirect("/login");
    }
    res.json(user);
  })(req, res, next);
};
