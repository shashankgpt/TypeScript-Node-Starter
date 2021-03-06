import { Request, Response, NextFunction } from "express";
import { User1, UserDocument, AuthToken } from "../models/user-collection";
import { WriteError, ObjectId } from "mongodb";
import { UserHelper } from "../helpers/user-helper";
import { Email } from "../helpers/email-helper";
import { role as roleEnum, roleArr } from "../data-types/data-structure/role-info";
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
import { IEmailLog } from "../data-types/interfaces/IEmailLog";
import { AuthRequestHelper } from "../helpers/authRequest-helper";
import { authRequest } from "../data-types/data-structure/authRequest-info";
import { TokenHelper } from "../helpers/token-helper";

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
  req.assert("newPassword", "new password must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const userHelp = new UserHelper();
  const { reqHash , newPassword } = req.body;
  const user = await promiseErrorHandler<boolean, UserDocument>(
    userHelp.findUserByResetToken(req.body.reqHash));
  if (user instanceof User1) {
    const deleteToken = await promiseErrorHandler<boolean, boolean>(
      userHelp.deleteToken(user._id));
    if (deleteToken) {
      const updated = await promiseErrorHandler<boolean, boolean>(
    userHelp.forgotPassword(user._id, reqHash, newPassword));
      if (updated) {
        const msg = `User password is updated with username ${user.username}`;
        const resMessage: IResponseMessage = messageHelp.createSuccessMessage(msg);
        return res.status(SUCCESSFUL).json(resMessage);
      }
    }
  }
  const msg = `User password is NOT updated with username ${req.user.username}`;
  const resMessage: IResponseMessage = messageHelp.createFailureMessage(msg);
  return res.status(FORBIDDEN).json(resMessage);
};
export const forgotPasswordReq = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("username", "username must be at least 4 characters long").len({ min: 4 });
  req.assert("email", "email must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const userHelp = new UserHelper();
  const tokenHelp = new TokenHelper();
  const { username , email } = req.body;
  const user = await promiseErrorHandler<boolean, UserDocument>(
    userHelp.findUserByUsername(username));
  const token = tokenHelp.createToken();
  if (user instanceof User1 && user.email === email && token) {
    const updated = await promiseErrorHandler<boolean, UserDocument>(
      userHelp.createPasswordToken(username, token));
    if (updated) {
      const msg = `User password token ${token} created for username ${username}`;
      const resMessage: IResponseMessage = messageHelp
      .createSuccessMessage(msg, { resetToken : token }, CREATED);
      return res.status(CREATED).json(resMessage);
    }
  }
  const msg = `Unable to created token for username ${username}`;
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

export const changeRole = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("username", "username must be at least 4 characters long").len({ min: 4 });
  req.assert("role", "Role must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const userHelp = new UserHelper();
  let exist = false;
  if (roleArr.indexOf(req.body.role) > -1) {
    const roleName: string = req.body.role.toString();
    const roleVal = +roleEnum[<any>roleName];
    exist = await promiseErrorHandler<boolean, boolean>(
      userHelp.changeRole(req.params.username, roleVal));
  }

  if (!exist) {
    const msg = `Unable to change User Role User with username ${req.params.username}`;
    const resMessage: IResponseMessage = messageHelp.createFailureMessage(msg);
    return res.status(FORBIDDEN).json(resMessage);
  }

  const msg = `Changed user role with username ${req.params.username}`;
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
  req.assert("gender", "gender must be at least 1 characters long").len({ min: 1 });
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
  const genderVal = Number(gender);
  const oldUser: IUser = {
    email,
    firstName,
    location,
    website,
    lastName,
    gender: genderVal,
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
      user.firstName = newUser.profile.firstName;
      user.lastName = newUser.profile.lastName ;
      user.gender = newUser.profile.gender ;
      user.location = newUser.profile.location ;
      user.website = newUser.profile.website ;
      user.picture = newUser.profile.picture;
    }
    const msg = `User is updated with username ${newUser.username}`;
    const resMessage: IResponseMessage =
    messageHelp.createSuccessMessage(msg, { user });
    return res.status(SUCCESSFUL).json(resMessage);
  }
};

export const updateLoggedInProfile = async (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.headers.authorization);
  req.assert("email", "Email is not valid").isEmail();
  req.assert("firstName", "firstName must be at least 4 characters long").len({ min: 4 });
  req.assert("gender", "gender must be at least 1 characters long").len({ min: 1 });
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
  const genderVal = Number(gender);
  const oldUser: IUser = {
    email,
    firstName,
    location,
    website,
    lastName,
    gender : genderVal,
  };
  const username = req.user.username;
  const newUser = await promiseErrorHandler<boolean, UserDocument>(
    userHelp.updateProfileByUsername(username, oldUser));
  if (newUser === false) {
    const msg = `User is not found with username ${username}`;
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
      user.firstName = newUser.profile.firstName;
      user.lastName = newUser.profile.lastName ;
      user.gender = newUser.profile.gender ;
      user.location = newUser.profile.location ;
      user.website = newUser.profile.website ;
      user.picture = newUser.profile.picture;
    }
    const msg = `User is updated with username ${newUser.username}`;
    const resMessage: IResponseMessage =
    messageHelp.createSuccessMessage(msg, { user });
    return res.status(SUCCESSFUL).json(resMessage);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization.split(" ")[1];
  const messageHelp = new MessageHelper();
  const tokenHelp = new TokenHelper();

  const deleted = await promiseErrorHandler<boolean, UserDocument>(
    tokenHelp.deleteToken(token));
  if (deleted === false) {
    const msg = `Token is not found ${token}`;
    const resMessage: IResponseMessage = messageHelp.createFailureMessage(msg);
    return res.status(FORBIDDEN).json(resMessage);
  }
  const msg = `User username ${req.user.username} is logged off successfully`;
  const resMessage: IResponseMessage =
    messageHelp.createSuccessMessage(msg, { token });
  return res.status(SUCCESSFUL).json(resMessage);
};
export const logoutAll = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username;
  const messageHelp = new MessageHelper();
  const tokenHelp = new TokenHelper();

  const deleted = await promiseErrorHandler<boolean, UserDocument>(
    tokenHelp.deleteAllTokenUser(username));
  if (deleted === false) {
    const msg = `User is not found with Username ${username}`;
    const resMessage: IResponseMessage = messageHelp.createFailureMessage(msg);
    return res.status(FORBIDDEN).json(resMessage);
  }
  const msg = `User with username ${username} is forced logged off successfully`;
  const resMessage: IResponseMessage =
    messageHelp.createSuccessMessage(msg, { username });
  return res.status(SUCCESSFUL).json(resMessage);
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
    const msg = `New User is cannot be created with ${errMessage}`;
    const resMessage: IResponseMessage = messageHelp
    .createFailureMessage(msg, 0, PRECONDITIONFAILED);
    return res.status(PRECONDITIONFAILED).json(resMessage);
  }
  const id = await promiseErrorHandler<boolean, ObjectId>(
    userHelp.createUser(req.body));
  if (id) {

    const mailLog: IEmailLog = {
      username: req.body.username,
      subject: "",
      body: "",
      templateId: "",
      to: req.body.email,
      cc: "",
      enabled: 1,
      response: "",
    };
    const mail = new Email(mailLog);
    const authReq = new AuthRequestHelper();
    const token = await promiseErrorHandler<boolean, string>(
      authReq.saveRequestAuth(req.body.username, authRequest.activeUser));
    const user = { token, username: req.body.username };
    mail.registerUserEmail(req.body.email, user);
    const msg = `New User is created with Username ${req.body.username}`;
    const resMessage: IResponseMessage =
    messageHelp.createSuccessMessage(msg, { username: req.body.username }, CREATED);
    return res.status(CREATED).json(resMessage);
  }
};
