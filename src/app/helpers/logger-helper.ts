import { ILoggerHelper  } from "../data-types/interfaces";
import { LoggerDocument } from "../models/logger-collection";
import { ObjectId } from "bson";

export class LoggerHelper implements ILoggerHelper {
  save(username: string, warnType: number,
       requestType: number, errorTitle: string,
       errorBody: string, completeError: string): Promise<LoggerDocument> {
    throw new Error("Method not implemented.");
  }
  remove(loggerId: ObjectId): Promise<LoggerDocument> {
    throw new Error("Method not implemented.");
  }
  noticeLogger(username: string, requestType: number,
               errorTitle: string, errorBody: string, completeError: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  warningLogger(username: string, requestType: number, errorTitle: string,
                errorBody: string, completeError: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  errorLogger(username: string, requestType: number, errorTitle: string,
              errorBody: string, completeError: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
