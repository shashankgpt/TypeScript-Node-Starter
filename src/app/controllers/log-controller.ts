import { Request, Response, NextFunction } from "express";
import { LoggerDocument } from "../models/logger-collection";
import { WriteError, ObjectId } from "mongodb";
import { UserHelper } from "../helpers/user-helper";
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
const debug = Debug.debug("app:logController");
const http = require("http");
const horseman = require("node-horseman");
export const logError = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("errorTitle", "errorTitle must be at least 4 characters long").len({ min: 3 });
  req.assert("errorBody", "errorBody must be at least 4 characters long").len({ min: 3 });
  req.assert("completeError", "completeError must be at least 4 characters long").len({ min: 3 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const logHelp = new LoggerHelper();
  const { errorTitle, errorBody, completeError } = req.body;
  const logId = await promiseErrorHandler<boolean , ObjectId>(
    logHelp.errorLogger("", 2, errorTitle, errorBody, completeError));
  if (!logId) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp
      .createFailureMessage(`Unable to register ${logObject[log.error]} Log`);
    return res.status(FORBIDDEN).json(FORBIDDEN);
  }
  const resMessage: IResponseMessage =
    messageHelp.createSuccessMessage(`${logObject[log.error]} Logged`, { logId }, CREATED);
  return res.status(SUCCESSFUL).json(resMessage);
};

export const logWarning = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("warnTitle", "warnTitle must be at least 4 characters long").len({ min: 3 });
  req.assert("warnBody", "warnBody must be at least 4 characters long").len({ min: 3 });
  req.assert("completeWarn", "completeWarn must be at least 4 characters long").len({ min: 3 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const logHelp = new LoggerHelper();
  const { warnTitle, warnBody, completeWarn } = req.body;
  const logId = await promiseErrorHandler<boolean , ObjectId>(
      logHelp.warningLogger("", 2, warnTitle, warnBody, completeWarn));
  if (!logId) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp
      .createFailureMessage(`Unable to register ${logObject[log.warning]} Log`);
    return res.status(FORBIDDEN).json(resMessage);
  }
  const resMessage: IResponseMessage =
      messageHelp.createSuccessMessage(`${logObject[log.warning]} Logged`, { logId }, CREATED);
  return res.status(SUCCESSFUL).json(resMessage);
};

export const logNotice = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("noticeTitle", "noticeTitle must be at least 4 characters long").len({ min: 3 });
  req.assert("noticeBody", "noticeBody must be at least 4 characters long").len({ min: 3 });
  req.assert("completeNotice", "completeNotice must be at least 4 characters long").len({ min: 3 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const logHelp = new LoggerHelper();
  const { noticeTitle, noticeBody, completeNotice } = req.body;
  const logId = await promiseErrorHandler<boolean , ObjectId>(
      logHelp.noticeLogger("", 2, noticeTitle, noticeBody, completeNotice));
  if (!logId) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp
        .createFailureMessage(`Unable to register ${logObject[log.notice]} Log`);
    return res.status(FORBIDDEN).json(resMessage);
  }
  const resMessage: IResponseMessage =
      messageHelp.createSuccessMessage(`${logObject[log.notice]} Logged`, { logId }, CREATED);
  return res.status(SUCCESSFUL).json(resMessage);
};

export const logCritical = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("criticalTitle", "criticalBody must be at least 4 characters long").len({ min: 3 });
  req.assert("criticalBody", "criticalBody must be at least 4 characters long").len({ min: 3 });
  req.assert("completeCritical",
             "completeCritical must be at least 4 characters long").len({ min: 3 });
  const errors = req.validationErrors();
  const messageHelp = new MessageHelper();
  if (errors) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp.createRequiredFieldMessage(errors);
    return res.status(BADREQUEST).json(resMessage);
  }
  const logHelp = new LoggerHelper();
  const { criticalTitle, criticalBody, completeCritical } = req.body;
  const logId = await promiseErrorHandler<boolean , ObjectId>(
      logHelp.criticalLogger("", 2, criticalTitle, criticalBody, completeCritical));
  if (!logId) {
    debug(errors);
    const resMessage: IResponseMessage = messageHelp
    .createFailureMessage(`Unable to register ${logObject[log.critical]} Log`);
    return res.status(FORBIDDEN).json(resMessage);
  }
  const resMessage: IResponseMessage =
      messageHelp.createSuccessMessage(`${logObject[log.critical]} Logged`, { logId }, CREATED);
  return res.status(SUCCESSFUL).json(resMessage);
};

export const goldPrice = async (req: Request, res: Response, next: NextFunction) => {
  const horseman1 = new horseman();
  horseman1
  .userAgent("Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0")
      .open(`http://vijaybullion.com/`)
      .text("#gold_bid")
      .then((text: any) => {
        console.log("new value" + text);
      })
      .close();

};
