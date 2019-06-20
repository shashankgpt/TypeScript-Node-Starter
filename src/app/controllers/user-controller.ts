import { Request, Response, NextFunction } from "express";
import async from "async";
import crypto from "crypto";
import nodemailer from "nodemailer";
import passport from "passport";
import { User1, UserDocument, AuthToken } from "../models/user-collection";
import { Token, TokenDocument } from "../models/token-collection";
import { IVerifyOptions } from "passport-local";
import { WriteError, ObjectId } from "mongodb";
import { UserHelper } from "../helpers/user-helper";
import { TokenHelper } from "../helpers/token-helper";
import { IResponseMessage , IUser } from "../data-types/interfaces";
import { RoleName } from "../data-types/data-structure";
import promiseErrorHandler from "../middlewares/promise.error-handler";

import { FORBIDDEN,
        SUCCESSFUL,
        CREATED,
        PRECONDITIONFAILED,
                            } from "../../config/util/response-code";
import "../../config/passport";

export let getUser = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("username", "username must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  if (errors) {
    console.log(errors);
  }
  const userHelp = new UserHelper();
  const exist = await promiseErrorHandler<boolean , UserDocument>(
    userHelp.findUserByUsername(req.params.username));
  if (exist === false) {
    const resMessage: IResponseMessage = {
      statusCode: FORBIDDEN,
      Message: `User is not found with username ${req.params.username}`,
      dateTime: new Date(),
      data: 0,
    };
    return res.status(FORBIDDEN).json(resMessage);
  }
  if (exist instanceof User1) {
    const user: IUser = {
      email : exist.email,
      username : exist.username,
      roleName : "User",
    };
    if (exist.profile) {
      user.firstName = exist.profile.firstName === undefined ? undefined : exist.profile.firstName;
      user.lastName = exist.profile.lastName === undefined ? undefined : exist.profile.lastName;
      user.location = exist.profile.location === undefined ? undefined : exist.profile.location;
      user.website = exist.profile.website === undefined ? undefined : exist.profile.website;
      user.picture = exist.profile.picture === undefined ? undefined : exist.profile.picture;
    }
    const resMessage: IResponseMessage = {
      statusCode: SUCCESSFUL,
      Message: `User is exists with username ${exist.username}`,
      dateTime: new Date(),
      data: { user },
    };
    return res.status(SUCCESSFUL).json(resMessage);
  }
};
export let getLoggedUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    console.log("no such user");
  }
  if (req.user instanceof User1) {
    const exist  = req.user;
    const user: IUser = {
      email : exist.email,
      username : exist.username,
      roleName : "User",
    };
    if (exist.profile) {
      user.firstName = exist.profile.firstName === undefined ? undefined : exist.profile.firstName;
      user.lastName = exist.profile.lastName === undefined ? undefined : exist.profile.lastName;
      user.location = exist.profile.location === undefined ? undefined : exist.profile.location;
      user.website = exist.profile.website === undefined ? undefined : exist.profile.website;
      user.picture = exist.profile.picture === undefined ? undefined : exist.profile.picture;
    }
    const resMessage: IResponseMessage = {
      statusCode: SUCCESSFUL,
      Message: `User is exists with username ${req.user.username}`,
      dateTime: new Date(),
      data: { user },
    };
    return res.status(SUCCESSFUL).json(resMessage);
  }
};

export let updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("oldPassword", "old password must be at least 4 characters long").len({ min: 4 });
  req.assert("newPassword", "new password must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  if (errors) {
    console.log(errors);
  }
  const userHelp = new UserHelper();
  const { oldPassword , newPassword } = req.body;
  const updated = await promiseErrorHandler<boolean, boolean>(
    userHelp.updatePassword(req.user._id, oldPassword, newPassword));
  if (updated) {
    const resMessage: IResponseMessage = {
      statusCode: SUCCESSFUL,
      Message: `User password is updated with username ${req.user.username}`,
      dateTime: new Date(),
      data: 0,
    };
    return res.status(SUCCESSFUL).json(resMessage);
  }
  const resMessage: IResponseMessage = {
    statusCode: FORBIDDEN,
    Message: `User password is NOT updated with username ${req.user.username}`,
    dateTime: new Date(),
    data: 0,
  };
  return res.status(FORBIDDEN).json(resMessage);
};

export let deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("username", "username must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  if (errors) {
    console.log(errors);
  }
  const userHelp = new UserHelper();
  const exist = await promiseErrorHandler<boolean, UserDocument>(
    userHelp.deleteUserByUsername(req.params.username));
  if (exist === false) {
    const resMessage: IResponseMessage = {
      statusCode: FORBIDDEN,
      Message: `User is not found with username ${req.params.username}`,
      dateTime: new Date(),
      data: 0,
    };
    return res.status(FORBIDDEN).json(resMessage);
  }
  if (exist instanceof User1) {
    const resMessage: IResponseMessage = {
      statusCode: SUCCESSFUL,
      Message: `User is delete with username ${exist.username}`,
      dateTime: new Date(),
      data: { username: exist.username },
    };
    return res.status(SUCCESSFUL).json(resMessage);
  }
};

export let updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("email", "Email is not valid").isEmail();
  req.assert("username", "username must be at least 4 characters long").len({ min: 4 });
  req.assert("firstName", "firstName must be at least 4 characters long").len({ min: 4 });
  req.assert("gender", "gender must be at least 4 characters long").len({ min: 4 });
  req.assert("location", "location must be at least 4 characters long").len({ min: 4 });
  req.assert("website", "website must be at least 4 characters long").len({ min: 4 });
  req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    console.log(errors);
  }
  const userHelp = new UserHelper();
  const { email, firstName, lastName , gender, location, website } = req.body;
  const oldUser: IUser = {
    email,
    firstName,
    gender,
    location,
    website,
    lastName,
  };
  const newUser = await promiseErrorHandler<boolean, UserDocument>(
    userHelp.updateProfileByUsername(req.params.username, oldUser));
  if (newUser === false) {
    const resMessage: IResponseMessage = {
      statusCode: FORBIDDEN,
      Message: `User is not found with username ${req.params.username}`,
      dateTime: new Date(),
      data: 0,
    };
    return res.status(FORBIDDEN).json(resMessage);
  }
  if (newUser instanceof User1) {
    const user: IUser = {
      email : newUser.email,
      username : newUser.username,
      roleName : "User",
    };
    if (newUser.profile) {
      user.firstName =
      newUser.profile.firstName === undefined ? undefined : newUser.profile.firstName;
      user.lastName = newUser.profile.lastName === undefined ? undefined : newUser.profile.lastName;
      user.location = newUser.profile.location === undefined ? undefined : newUser.profile.location;
      user.website = newUser.profile.website === undefined ? undefined : newUser.profile.website;
      user.picture = newUser.profile.picture === undefined ? undefined : newUser.profile.picture;
    }
    const resMessage: IResponseMessage = {
      statusCode: SUCCESSFUL,
      Message: `User is updated with username ${newUser.username}`,
      dateTime: new Date(),
      data: { user },
    };
    return res.status(SUCCESSFUL).json(resMessage);
  }
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
  const exist = await promiseErrorHandler<boolean, UserDocument>(
    userHelp.findUserByUsername(req.body.username));
  const exitEmail = await promiseErrorHandler<boolean, UserDocument>(
    userHelp.findUserByEmail(req.body.email));
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
      data: 0,
    };
    return res.status(PRECONDITIONFAILED).json(resMessage);
  }
  const id = await promiseErrorHandler<boolean, ObjectId>(
    userHelp.createUser(req.body));
  if (id) {
    const resMessage: IResponseMessage = {
      statusCode: CREATED,
      Message: `New User is created with Username ${req.body.username}`,
      dateTime: new Date(),
      data: { username: req.body.username },
    };
    return res.status(CREATED).json(resMessage);
  }
};
