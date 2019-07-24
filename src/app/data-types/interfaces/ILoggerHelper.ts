import { LoggerDocument } from "../../models/logger-collection";
import { ObjectId } from "bson";

export interface ILoggerHelper {
  save(username: string,
       warnType: number, requestType: number,
       errorTitle: string, errorBody: string,  completeError: string): Promise<LoggerDocument>;
  remove(loggerId: ObjectId): Promise<LoggerDocument>;
  noticeLogger(username: string, requestType: number,
               errorTitle: string, errorBody: string, completeError: any): Promise<boolean>;
  warningLogger(username: string, requestType: number,
                errorTitle: string, errorBody: string, completeError: any): Promise<boolean>;
  errorLogger(username: string, requestType: number,
              errorTitle: string, errorBody: string, completeError: any): Promise<boolean>;
}
