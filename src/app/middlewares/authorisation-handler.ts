import { Request, Response, NextFunction } from "express";
import { UserDocument } from "../models/user-collection";
import { role } from "../data-types/data-structure/role-info";
import { IResponseMessage } from "../data-types/interfaces";
import { PRECONDITIONFAILED } from "../../config/util/response-code";
import { MessageHelper } from "../helpers/message-helper";
export interface RequestNew extends Request {
  user: UserDocument;
}

export const isAdmin = (req: RequestNew, res: Response, next: NextFunction) => {
  if (req.user.role === role.superAdmin) {
    return next();
  }
  const messageHelp = new MessageHelper();

  const msg = "Only Allowed to Admin";
  const resMessage: IResponseMessage = messageHelp
    .createFailureMessage(msg, 0, PRECONDITIONFAILED);
  return res.status(PRECONDITIONFAILED).json(resMessage);
};
