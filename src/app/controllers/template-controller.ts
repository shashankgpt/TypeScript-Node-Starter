import { Request, Response, NextFunction } from "express";
import { LoggerDocument } from "../models/logger-collection";
import { WriteError, ObjectId } from "mongodb";
import { EmailTemplateHelper } from "../helpers/email.template-helper";
import { MessageHelper } from "../helpers/message-helper";
import { IResponseMessage , IUser , IValidationError } from "../data-types/interfaces";
import promiseErrorHandler from "../middlewares/promise.error-handler";
import { FORBIDDEN,
        SUCCESSFUL,
        CREATED,
        PRECONDITIONFAILED,
        BADREQUEST                    } from "../../config/util/response-code";
import { log, logObject } from "../data-types/data-structure/error-info";

import "../../config/passport";
import * as Debug from "debug";
import { LoggerHelper } from "../helpers/logger-helper";
import { IEmailTemplate, EmailRespond } from "../data-types/interfaces/IEmailTemplate";
import { EmailTemplateDocument, EmailTemp } from "../models/emailTemplate-collection";
import { type } from "os";
const debug = Debug.debug("app:logController");

export const saveTemplate = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("emailId", "username must be at least 4 characters long").len({ min: 4 });
  req.assert("emailSubject", "username must be at least 4 characters long").len({ min: 4 });
  req.assert("emailBody", "username must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const emailTemplate =  new EmailTemplateHelper();
  const { emailId, emailSubject: subject, emailBody: body } = req.body;
  const template: IEmailTemplate = {
    emailId,
    subject,
    body,
  };
  const id = await promiseErrorHandler<boolean, ObjectId>(emailTemplate.save(template));
  if (id) {
    const msg = `New template is created with Id ${emailId}`;
    const resMessage: IResponseMessage =
    messageHelp.createSuccessMessage(msg, { emailId }, CREATED);
    return res.status(CREATED).json(resMessage);
  }
};

export const deleteTemplate = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("emailId", "username must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const emailTemplate =  new EmailTemplateHelper();
  const tempId = req.params.emailId;
  const emailDoc =
  await promiseErrorHandler<boolean, EmailTemplateDocument>(
    emailTemplate.delete(tempId));
  if (emailDoc instanceof EmailTemp) {
    const template: IEmailTemplate = {
      emailId: emailDoc.templateId,
      subject: emailDoc.subject,
      body: emailDoc.body,
    };
    const msg = `Template is delete with Id ${tempId}`;
    const resMessage: IResponseMessage =
    messageHelp.createSuccessMessage(msg, { template });
    return res.status(SUCCESSFUL).json(resMessage);
  }
  const msg = `Unable to delete Template with emailId ${tempId}`;
  const resMessage: IResponseMessage = messageHelp.createFailureMessage(msg);
  return res.status(FORBIDDEN).json(resMessage);
};

export const findTemplate = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("emailId", "username must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const emailTemplate =  new EmailTemplateHelper();
  const tempId = req.params.emailId;
  const emailDoc =
  await promiseErrorHandler<boolean, EmailRespond>(
    emailTemplate.find(tempId));
  if (!emailDoc) {
    const msg = `Unable to find Template with emailId ${tempId}`;
    const resMessage: IResponseMessage = messageHelp.createFailureMessage(msg);
    return res.status(FORBIDDEN).json(resMessage);
  }
  const msg = `Template exist with Id ${tempId}`;
  const resMessage: IResponseMessage =
    messageHelp.createSuccessMessage(msg, { emailDoc });
  return res.status(SUCCESSFUL).json(resMessage);
};

export const updateTemplate = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("emailId", "emailId must be at least 4 characters long").len({ min: 4 });
  req.assert("emailSubject", "emailSubject must be at least 4 characters long").len({ min: 4 });
  req.assert("emailBody", "emailBody must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const emailTemplate =  new EmailTemplateHelper();
  const tempId = req.params.emailId;
  const { emailSubject, emailBody } = req.body;
  const emailDoc =
  await promiseErrorHandler<boolean, EmailRespond>(
    emailTemplate.updateEmail(tempId, emailSubject, emailBody));
  if (!emailDoc) {
    const msg = `Unable to update Template with emailId ${tempId}`;
    const resMessage: IResponseMessage = messageHelp.createFailureMessage(msg);
    return res.status(FORBIDDEN).json(resMessage);
  }
  const msg = `Template update with Id ${tempId}`;
  const resMessage: IResponseMessage =
    messageHelp.createSuccessMessage(msg, { emailDoc });
  return res.status(SUCCESSFUL).json(resMessage);
};

export const updateSubject = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("emailId", "emailId must be at least 4 characters long").len({ min: 4 });
  req.assert("emailSubject", "emailSubject must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const emailTemplate =  new EmailTemplateHelper();
  const tempId = req.params.emailId;
  const { emailSubject } = req.body;
  const emailDoc =
  await promiseErrorHandler<boolean, EmailRespond>(
    emailTemplate.updateSubject(tempId, emailSubject));
  if (!emailDoc) {
    const msg = `Unable to update Template with emailId ${tempId}`;
    const resMessage: IResponseMessage = messageHelp.createFailureMessage(msg);
    return res.status(FORBIDDEN).json(resMessage);
  }
  const msg = `Template update with Id ${tempId}`;
  const resMessage: IResponseMessage =
    messageHelp.createSuccessMessage(msg, { emailDoc });
  return res.status(SUCCESSFUL).json(resMessage);
};

export const updateBody = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("emailId", "emailId must be at least 4 characters long").len({ min: 4 });
  req.assert("emailSubject", "emailSubject must be at least 4 characters long").len({ min: 4 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const emailTemplate =  new EmailTemplateHelper();
  const tempId = req.params.emailId;
  const {  emailBody } = req.body;
  const emailDoc =
  await promiseErrorHandler<boolean, EmailRespond>(
    emailTemplate.updateBody(tempId, emailBody));
  if (!emailDoc) {
    const msg = `Unable to update Template with emailId ${tempId}`;
    const resMessage: IResponseMessage = messageHelp.createFailureMessage(msg);
    return res.status(FORBIDDEN).json(resMessage);
  }
  const msg = `Template update with Id ${tempId}`;
  const resMessage: IResponseMessage =
    messageHelp.createSuccessMessage(msg, { emailDoc });
  return res.status(SUCCESSFUL).json(resMessage);
};
