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
import { BlogDocument } from "../models/blog-collection";

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

export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
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
  const blogId = req.params.blogId;
  const blogHelp = new BlogHelper();
  const exist = await
  promiseErrorHandler<boolean, BlogDocument>(blogHelp.updateBlogByBlogId(blogId, blog));
  if (exist === false) {
    const msg = `Blog is cannot be updated with name ${blog.blogName}`;
    const resMessage: IResponseMessage = messageHelp
      .createFailureMessage(msg, 0, PRECONDITIONFAILED);
    return res.status(PRECONDITIONFAILED).json(resMessage);
  }
  const msg = `Blog is updated with name ${blog.blogName}`;
  const resMessage: IResponseMessage =
      messageHelp.createSuccessMessage(msg, { blog: exist }, SUCCESSFUL);
  return res.status(SUCCESSFUL).json(resMessage);
};
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const blogHelp = new BlogHelper();
  const messageHelp = new MessageHelper();
  const exist = await promiseErrorHandler<boolean, BlogDocument[]>(blogHelp.getAllBlog());
  if (exist === false) {
    const msg = `No Blog Found`;
    const resMessage: IResponseMessage = messageHelp
      .createFailureMessage(msg, 0, PRECONDITIONFAILED);
    return res.status(PRECONDITIONFAILED).json(resMessage);
  }
  const msg = `All Blog`;
  const resMessage: IResponseMessage =
      messageHelp.createSuccessMessage(msg, { blogs: exist }, SUCCESSFUL);
  return res.status(SUCCESSFUL).json(resMessage);
};

export const getAllByAuthor = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("author", "author must be at least 4 characters long").len({ min: 4 });
  const blogHelp = new BlogHelper();
  const messageHelp = new MessageHelper();
  const author = req.params.author;
  const exist = await
  promiseErrorHandler<boolean, BlogDocument[]>(blogHelp.findBlogByAuthor(author));
  if (exist === false) {
    const msg = `No Blog Found`;
    const resMessage: IResponseMessage = messageHelp
      .createFailureMessage(msg, 0, PRECONDITIONFAILED);
    return res.status(PRECONDITIONFAILED).json(resMessage);
  }
  const msg = `All Blog`;
  const resMessage: IResponseMessage =
      messageHelp.createSuccessMessage(msg, { blogs: exist }, SUCCESSFUL);
  return res.status(SUCCESSFUL).json(resMessage);
};
export const getAllByID = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("blogId", "blogId must be at least 4 characters long").len({ min: 4 });
  const blogHelp = new BlogHelper();
  const messageHelp = new MessageHelper();
  const blogId = req.params.blogId;
  const exist = await promiseErrorHandler<boolean, BlogDocument>(blogHelp.findBlogByBlogId(blogId));
  if (exist === false) {
    const msg = `No Blog found with blog ID ${blogId}`;
    const resMessage: IResponseMessage = messageHelp
      .createFailureMessage(msg, 0, PRECONDITIONFAILED);
    return res.status(PRECONDITIONFAILED).json(resMessage);
  }
  const msg = `Blog found with blog ID ${blogId}`;
  const resMessage: IResponseMessage =
      messageHelp.createSuccessMessage(msg, { blog: exist }, SUCCESSFUL);
  return res.status(SUCCESSFUL).json(resMessage);
};

export const getAllByUserID = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("blogId", "blogId must be at least 4 characters long").len({ min: 4 });
  const blogHelp = new BlogHelper();
  const messageHelp = new MessageHelper();
  const userId = req.user._id;
  const exist = await promiseErrorHandler<boolean, BlogDocument>(blogHelp.findBlogById(userId));
  if (exist === false) {
    const msg = `No Blog found with username ${req.user.username}`;
    const resMessage: IResponseMessage = messageHelp
      .createFailureMessage(msg, 0, PRECONDITIONFAILED);
    return res.status(PRECONDITIONFAILED).json(resMessage);
  }
  const msg = `Blog found with username ${req.user.username}`;
  const resMessage: IResponseMessage =
      messageHelp.createSuccessMessage(msg, { blog: exist }, SUCCESSFUL);
  return res.status(SUCCESSFUL).json(resMessage);
};
export const activeByBlogID = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("blogId", "blogId must be at least 4 characters long").len({ min: 4 });
  const blogHelp = new BlogHelper();
  const messageHelp = new MessageHelper();
  const blogId = req.params.blogId;
  const exist = await promiseErrorHandler<boolean, BlogDocument>(blogHelp.activeBlog(blogId));
  if (exist === false) {
    const msg = `Unable to activate Blog with blog ID ${blogId}`;
    const resMessage: IResponseMessage = messageHelp
      .createFailureMessage(msg, 0, PRECONDITIONFAILED);
    return res.status(PRECONDITIONFAILED).json(resMessage);
  }
  const msg = `Blog is  activated with blog ID ${blogId}`;
  const resMessage: IResponseMessage =
      messageHelp.createSuccessMessage(msg, { blog: exist }, SUCCESSFUL);
  return res.status(SUCCESSFUL).json(resMessage);
};

export const checkName = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("blogId", "blogId must be at least 4 characters long").len({ min: 4 });
  req.assert("blogName", "blogName must be at least 4 characters long").len({ min: 4 });

  const blogHelp = new BlogHelper();
  const messageHelp = new MessageHelper();
  const blogId = req.body.blogId;
  const blogName = req.body.blogName;
  const exist = await promiseErrorHandler<boolean, BlogDocument>(
    blogHelp.checkBlogName(blogId, blogName));
  if (exist) {
    const msg = `You can create a Blog with ID ${blogId}`;
    const resMessage: IResponseMessage =
      messageHelp.createSuccessMessage(msg, { }, SUCCESSFUL);
    return res.status(SUCCESSFUL).json(resMessage);
  }
  const msg = `Name exists ${blogId}`;
  const resMessage: IResponseMessage = messageHelp
    .createFailureMessage(msg, 0, PRECONDITIONFAILED);
  return res.status(PRECONDITIONFAILED).json(resMessage);
};

export const deActiveByBlogID = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("blogId", "blogId must be at least 4 characters long").len({ min: 4 });
  const blogHelp = new BlogHelper();
  const messageHelp = new MessageHelper();
  const blogId = req.params.blogId;
  const exist = await promiseErrorHandler<boolean, BlogDocument>(blogHelp.deactiveBlog(blogId));
  if (exist === false) {
    const msg = `Unable to deactivate Blog with blog ID ${blogId}`;
    const resMessage: IResponseMessage = messageHelp
      .createFailureMessage(msg, 0, PRECONDITIONFAILED);
    return res.status(PRECONDITIONFAILED).json(resMessage);
  }
  const msg = `Blog is  deactivated with blog ID ${blogId}`;
  const resMessage: IResponseMessage =
      messageHelp.createSuccessMessage(msg, { blog: exist }, SUCCESSFUL);
  return res.status(SUCCESSFUL).json(resMessage);
};

export const flaggedByBlogID = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("blogId", "blogId must be at least 4 characters long").len({ min: 4 });
  const blogHelp = new BlogHelper();
  const messageHelp = new MessageHelper();
  const blogId = req.params.blogId;
  const exist = await promiseErrorHandler<boolean, BlogDocument>(blogHelp.flaggedBlog(blogId));
  if (exist === false) {
    const msg = `Unable to deactivate Blog with blog ID ${blogId}`;
    const resMessage: IResponseMessage = messageHelp
      .createFailureMessage(msg, 0, PRECONDITIONFAILED);
    return res.status(PRECONDITIONFAILED).json(resMessage);
  }
  const msg = `Blog is  deactivated with blog ID ${blogId}`;
  const resMessage: IResponseMessage =
      messageHelp.createSuccessMessage(msg, { blog: exist }, SUCCESSFUL);
  return res.status(SUCCESSFUL).json(resMessage);
};

export const unFlaggedByBlogID = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("blogId", "blogId must be at least 4 characters long").len({ min: 4 });
  const blogHelp = new BlogHelper();
  const messageHelp = new MessageHelper();
  const blogId = req.params.blogId;
  const exist = await promiseErrorHandler<boolean, BlogDocument>(blogHelp.unFlaggedBlog(blogId));
  if (exist === false) {
    const msg = `Unable to deactivate Blog with blog ID ${blogId}`;
    const resMessage: IResponseMessage = messageHelp
      .createFailureMessage(msg, 0, PRECONDITIONFAILED);
    return res.status(PRECONDITIONFAILED).json(resMessage);
  }
  const msg = `Blog is  deactivated with blog ID ${blogId}`;
  const resMessage: IResponseMessage =
      messageHelp.createSuccessMessage(msg, { blog: exist }, SUCCESSFUL);
  return res.status(SUCCESSFUL).json(resMessage);
};
export const deleteBlogsById = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("blogId", "blogId must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const blogId = req.params.blogId;
  const blogHelp = new BlogHelper();
  const exist = await
  promiseErrorHandler<boolean, BlogDocument>(blogHelp.deleteBlogByBlogId(blogId));
  if (exist === false) {
    const msg = `Blog cannot be deleted with blog ID ${blogId}`;
    const resMessage: IResponseMessage = messageHelp
      .createFailureMessage(msg, 0, PRECONDITIONFAILED);
    return res.status(PRECONDITIONFAILED).json(resMessage);
  }
  const msg = `Blog is deleted with blog ID ${blogId}`;
  const resMessage: IResponseMessage =
      messageHelp.createSuccessMessage(msg, { BlogID: blogId }, SUCCESSFUL);
  return res.status(SUCCESSFUL).json(resMessage);
};

export const deleteBlogsByAuthor = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("author", "author must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const author = req.params.author;
  const blogHelp = new BlogHelper();
  const exist = await
  promiseErrorHandler<boolean, BlogDocument>(blogHelp.deleteBlogByAuthor(author));
  if (exist === false) {
    const msg = `Blog cannot be deleted with author ${author}`;
    const resMessage: IResponseMessage = messageHelp
      .createFailureMessage(msg, 0, PRECONDITIONFAILED);
    return res.status(PRECONDITIONFAILED).json(resMessage);
  }
  const msg = `Blog is deleted with author ${author}`;
  const resMessage: IResponseMessage =
      messageHelp.createSuccessMessage(msg, { Author: author }, SUCCESSFUL);
  return res.status(SUCCESSFUL).json(resMessage);
};
