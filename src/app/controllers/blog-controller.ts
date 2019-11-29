import { Request, Response, NextFunction } from "express";
import { User1, UserDocument, AuthToken } from "../models/user-collection";
import { WriteError, ObjectId } from "mongodb";
import { BlogHelper } from "../helpers/blog-helper";
import { Email } from "../helpers/email-helper";
import { role as roleEnum, roleArr } from "../data-types/data-structure/role-info";
import { MessageHelper } from "../helpers/message-helper";
import { IResponseMessage , IUser , IValidationError, IBlogRegister }
from "../data-types/interfaces";
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
export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("blogId", "blogId must be at least 4 characters long").len({ min: 4 });
  req.assert("blogName", "blogName must be at least 4 characters long").len({ min: 4 });
  req.assert("details", "details must be at least 4 characters long").len({ min: 4 });
  req.assert("blog", "blog must be at least 4 characters long").len({ min: 4 });
  req.assert("category", "category must be at least 4 characters long").len({ min: 4 });

  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const blog: IBlogRegister = {
    author: req.body.author,
    blogId: req.body.blogId,
    blogName: req.body.blogName,
    details: req.body.details,
    tags: req.body.tags,
    category: req.body.category,
    blog: req.body.blog,
  };
  const ID = req.user._id;
  const blogHelp = new BlogHelper();
  const exist = await promiseErrorHandler<boolean, ObjectId>(blogHelp.createBlog(blog, ID));
  if (exist === false) {
    const msg = `New Blog is cannot be created with name ${blog.blogName}`;
    const resMessage: IResponseMessage = messageHelp
      .createFailureMessage(msg, 0, PRECONDITIONFAILED);
    return res.status(PRECONDITIONFAILED).json(resMessage);
  }
  const msg = `New Blog is created with name ${blog.blogName}`;
  const resMessage: IResponseMessage =
      messageHelp.createSuccessMessage(msg, { blogName: blog.blogName }, CREATED);
  return res.status(CREATED).json(resMessage);
};
