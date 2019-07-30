import { Request, Response, NextFunction } from "express";
import async from "async";
import crypto from "crypto";
import nodemailer from "nodemailer";
import passport from "passport";
import { User1, UserDocument, AuthToken } from "../models/user-collection";
import { Token, TokenDocument } from "../models/token-collection";
import { IVerifyOptions } from "passport-local";
import { WriteError } from "mongodb";
import { UserHelper } from "../helpers/user-helper";
import { TokenHelper } from "../helpers/token-helper";
import { IResponseMessage } from "../data-types/interfaces";
import { SUCCESSFUL, CREATED, PRECONDITIONFAILED } from "../../config/util/response-code";
import promiseErrorHandler from "../middlewares/promise.error-handler";
import { MessageHelper } from "../helpers/message-helper";
import "../../config/passport";
export const authentication = (req: Request, res: Response, next: NextFunction) => {
  return passport.authenticate("bearer", { session: true })(req, res, next);
};
export const login =  (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("basic", async (err: Error, user: UserDocument, info: IVerifyOptions) => {
    if (err) { return next(err); }
    const messageHelp = new MessageHelper();
    if (!user) {
      const msg = "Incorrect Credentials";
      const resMessage: IResponseMessage = messageHelp
    .createFailureMessage(msg, 0, PRECONDITIONFAILED);
      return res.status(PRECONDITIONFAILED).json(resMessage);
    }
    const tokenHelp = new TokenHelper();
    const token = await promiseErrorHandler<boolean, string>(
      tokenHelp.saveToken(user));
    const msg = "Logged In";
    const resMessage: IResponseMessage =
    messageHelp.createSuccessMessage(msg, { token });
    return res.status(SUCCESSFUL).json(resMessage);
  })(req, res, next);
};
