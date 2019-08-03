import { Request, Response, NextFunction } from "express";
import { User1, UserDocument, AuthToken } from "../models/user-collection";
import { WriteError, ObjectId } from "mongodb";
import { UserHelper } from "../helpers/user-helper";
import { Email } from "../helpers/email-helper";

import { MessageHelper } from "../helpers/message-helper";
import { IResponseMessage , IUser , IValidationError } from "../data-types/interfaces";
import promiseErrorHandler from "../middlewares/promise.error-handler";
import { FORBIDDEN,
        SUCCESSFUL,
        CREATED,
        PRECONDITIONFAILED,
        BADREQUEST                    } from "../../config/util/response-code";
import "../../config/passport";
import * as Debug from "debug";

const debug = Debug.debug("app:controller");

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("username", "username must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const userHelp = new UserHelper();
  const exist = await promiseErrorHandler<boolean , UserDocument>(
    userHelp.findUserByUsername(req.params.username));
  if (exist === false) {
    const msg = `User is not found with username ${req.params.username}`;
    const resMessage: IResponseMessage = messageHelp.createFailureMessage(msg);
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
    const msg = `User is exists with username ${exist.username}`;
    const resMessage: IResponseMessage = messageHelp.createSuccessMessage(msg, { user });
    return res.status(SUCCESSFUL).json(resMessage);
  }
};

export const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  const userHelp = new UserHelper();
  const exist = await promiseErrorHandler<boolean , UserDocument[]>(
    userHelp.findAllUser({}));
  const messageHelp = new MessageHelper();
  if (exist === false) {
    const msg = "No User is found";
    const resMessage: IResponseMessage = messageHelp.createFailureMessage(msg);
    return res.status(FORBIDDEN).json(resMessage);
  }
  const msg = "All users";
  const resMessage: IResponseMessage = messageHelp.createSuccessMessage(msg, { users: exist });
  return res.status(SUCCESSFUL).json(resMessage);
};
export const getLoggedUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (!req.user) {
    debug("no such user");
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
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
      user.gender = exist.profile.gender === undefined ? undefined : exist.profile.gender;
      user.website = exist.profile.website === undefined ? undefined : exist.profile.website;
      user.picture = exist.profile.picture === undefined ? undefined : exist.profile.picture;
    }
    const msg = `User is exists with username ${req.user.username}`;
    const resMessage: IResponseMessage = messageHelp.createSuccessMessage(msg, { user });
    return res.status(SUCCESSFUL).json(resMessage);
  }
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("oldPassword", "old password must be at least 4 characters long").len({ min: 4 });
  req.assert("newPassword", "new password must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const userHelp = new UserHelper();
  const { oldPassword , newPassword } = req.body;
  const updated = await promiseErrorHandler<boolean, boolean>(
    userHelp.updatePassword(req.user._id, oldPassword, newPassword));
  if (updated) {
    const msg = `User password is updated with username ${req.user.username}`;
    const resMessage: IResponseMessage = messageHelp.createSuccessMessage(msg);
    return res.status(SUCCESSFUL).json(resMessage);
  }
  const msg = `User password is NOT updated with username ${req.user.username}`;
  const resMessage: IResponseMessage = messageHelp.createFailureMessage(msg);
  return res.status(FORBIDDEN).json(resMessage);
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("reqHash", "reqHash must be at least 4 characters long").len({ min: 4 });
  // TO DO: Implement reqHash Check
  req.assert("oldPassword", "old password must be at least 4 characters long").len({ min: 4 });
  req.assert("newPassword", "new password must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const userHelp = new UserHelper();
  const { oldPassword , newPassword } = req.body;
  const updated = await promiseErrorHandler<boolean, boolean>(
    userHelp.updatePassword(req.user._id, oldPassword, newPassword));
  if (updated) {
    const msg = `User password is updated with username ${req.user.username}`;
    const resMessage: IResponseMessage = messageHelp.createSuccessMessage(msg);
    return res.status(SUCCESSFUL).json(resMessage);
  }
  const msg = `User password is NOT updated with username ${req.user.username}`;
  const resMessage: IResponseMessage = messageHelp.createFailureMessage(msg);
  return res.status(FORBIDDEN).json(resMessage);
};

export const lockUser = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("username", "username must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const userHelp = new UserHelper();
  const exist = await promiseErrorHandler<boolean, UserDocument>(
    userHelp.lockUser(req.params.username));
  if (exist === false) {
    const msg = `Unable to lock User with username ${req.params.username}`;
    const resMessage: IResponseMessage = messageHelp.createFailureMessage(msg);
    return res.status(FORBIDDEN).json(resMessage);
  }

  const msg = `lock the user with username ${req.params.username}`;
  const resMessage: IResponseMessage =
    messageHelp.createSuccessMessage(msg, { username: req.params.username });
  return res.status(SUCCESSFUL).json(resMessage);

};

export const unlockUser = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("username", "username must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const userHelp = new UserHelper();
  const exist = await promiseErrorHandler<boolean, UserDocument>(
    userHelp.unLockUser(req.params.username));
  if (exist === false) {
    const msg = `Unable to unlock User with username ${req.params.username}`;
    const resMessage: IResponseMessage = messageHelp.createFailureMessage(msg);
    return res.status(FORBIDDEN).json(resMessage);
  }

  const msg = `unlock the user with username ${req.params.username}`;
  const resMessage: IResponseMessage =
    messageHelp.createSuccessMessage(msg, { username: req.params.username });
  return res.status(SUCCESSFUL).json(resMessage);

};

export const activateUser = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("username", "username must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const userHelp = new UserHelper();
  const exist = await promiseErrorHandler<boolean, UserDocument>(
    userHelp.activeUser(req.params.username));
  if (exist === false) {
    const msg = `Unable to activate User with username ${req.params.username}`;
    const resMessage: IResponseMessage = messageHelp.createFailureMessage(msg);
    return res.status(FORBIDDEN).json(resMessage);
  }

  const msg = `activate the user with username ${req.params.username}`;
  const resMessage: IResponseMessage =
    messageHelp.createSuccessMessage(msg, { username: req.params.username });
  return res.status(SUCCESSFUL).json(resMessage);

};

export const deactivateUser = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("username", "username must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const userHelp = new UserHelper();
  const exist = await promiseErrorHandler<boolean, UserDocument>(
    userHelp.deactivateUser(req.params.username));
  if (exist === false) {
    const msg = `Unable to deactivate User with username ${req.params.username}`;
    const resMessage: IResponseMessage = messageHelp.createFailureMessage(msg);
    return res.status(FORBIDDEN).json(resMessage);
  }

  const msg = `deactivate the user with username ${req.params.username}`;
  const resMessage: IResponseMessage =
    messageHelp.createSuccessMessage(msg, { username: req.params.username });
  return res.status(SUCCESSFUL).json(resMessage);

};
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("username", "username must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const userHelp = new UserHelper();
  const exist = await promiseErrorHandler<boolean, UserDocument>(
    userHelp.deleteUserByUsername(req.params.username));
  if (exist === false) {
    const msg = `User is not found with username ${req.params.username}`;
    const resMessage: IResponseMessage = messageHelp.createFailureMessage(msg);
    return res.status(FORBIDDEN).json(resMessage);
  }
  if (exist instanceof User1) {
    const msg = `User is delete with username ${exist.username}`;
    const resMessage: IResponseMessage =
    messageHelp.createSuccessMessage(msg, { username: exist.username });
    return res.status(SUCCESSFUL).json(resMessage);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("email", "Email is not valid").isEmail();
  req.assert("username", "username must be at least 4 characters long").len({ min: 4 });
  req.assert("firstName", "firstName must be at least 4 characters long").len({ min: 4 });
  req.assert("gender", "gender must be at least 4 characters long").len({ min: 4 });
  req.assert("location", "location must be at least 4 characters long").len({ min: 4 });
  req.assert("website", "website must be at least 4 characters long").len({ min: 4 });
  req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
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
    const msg = `User is not found with username ${req.params.username}`;
    const resMessage: IResponseMessage = messageHelp.createFailureMessage(msg);
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
      user.gender = newUser.profile.gender === undefined ? undefined : newUser.profile.gender;
      user.location = newUser.profile.location === undefined ? undefined : newUser.profile.location;
      user.website = newUser.profile.website === undefined ? undefined : newUser.profile.website;
      user.picture = newUser.profile.picture === undefined ? undefined : newUser.profile.picture;
    }
    const msg = `User is updated with username ${newUser.username}`;
    const resMessage: IResponseMessage =
    messageHelp.createSuccessMessage(msg, { user });
    return res.status(SUCCESSFUL).json(resMessage);
  }
};
export const register = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("email", "Email is not valid").isEmail();
  req.assert("password", "Password must be at least 4 characters long").len({ min: 4 });
  req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
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
    const mail = new Email();
    const user = { username: req.body.username };
    mail.registerUserEmail(req.body.email, user);
    const msg = `New User is cannot be created with ${errMessage}`;
    const resMessage: IResponseMessage = messageHelp
    .createFailureMessage(msg, 0, PRECONDITIONFAILED);
    return res.status(PRECONDITIONFAILED).json(resMessage);
  }
  const id = await promiseErrorHandler<boolean, ObjectId>(
    userHelp.createUser(req.body));
  if (id) {
    const msg = `New User is created with Username ${req.body.username}`;
    const resMessage: IResponseMessage =
    messageHelp.createSuccessMessage(msg, { username: req.body.username }, CREATED);
    return res.status(CREATED).json(resMessage);
  }
};
