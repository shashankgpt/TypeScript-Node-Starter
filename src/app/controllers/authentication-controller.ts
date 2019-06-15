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
import { IResponseMessage } from "../data-types/interfaces/IResponseMessage";
import { SUCCESSFUL, CREATED, PRECONDITIONFAILED } from "../../config/util/response-code";
import "../../config/passport";
export let authentication = (req: Request, res: Response, next: NextFunction) => {
  return passport.authenticate("bearer", { session: true })(req, res, next);
};
