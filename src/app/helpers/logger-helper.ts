import { ILoggerHelper } from "../data-types/interfaces";
import { LoggerDocument, Logger } from "../models/logger-collection";
import { ObjectId, ObjectID } from "bson";
import { log } from "../data-types/data-structure/error-info";
export class LoggerHelper implements ILoggerHelper {
  save(username: string, warnType: number,
       requestType: number, errorTitleVal: string,
       errorBody: string, completeError: string): Promise<ObjectID | boolean> {
    return new Promise<ObjectID | boolean>((resolve, reject) => {
      const errorTitle = JSON.stringify(errorTitleVal);
      const loggerModel = new Logger({
        username,
        warnType,
        requestType,
        errorTitle,
        errorBody,
        completeError,
      });
      loggerModel.save((err) => {
        if (err) { return reject(err); }
        resolve(loggerModel._id);
      });
    });
  }
  remove(loggerId: ObjectId): Promise<boolean | LoggerDocument> {
    return new Promise<boolean | LoggerDocument>((resolve, reject) => {
      Logger.findOneAndRemove({ _id: loggerId }, (err, logger) => {
        if (err) { return reject(err); }
        if (logger) {
          resolve(logger);
        }
        resolve(false);
      });
    });
  }
  noticeLogger(username: string, requestType: number = 1,
               errorTitle: string, errorBody: string, completeError: any):
        Promise<boolean | ObjectID> {
    return this.save(username, log.notice, requestType, errorTitle, errorBody, completeError);
  }
  warningLogger(username: string, requestType: number = 1, errorTitle: string,
                errorBody: string, completeError: any): Promise<boolean | ObjectID> {
    return this.save(username, log.warning, requestType, errorTitle, errorBody, completeError);
  }
  errorLogger(username: string, requestType: number = 1, errorTitle: string,
              errorBody: string, completeError: any): Promise<boolean | ObjectID> {
    return this.save(username, log.error, requestType, errorTitle, errorBody, completeError);
  }
  criticalLogger(username: string, requestType: number = 1, errorTitle: string,
                 errorBody: string, completeError: any): Promise<boolean | ObjectID> {
    return this.save(username, log.critical, requestType, errorTitle, errorBody, completeError);
  }
}
