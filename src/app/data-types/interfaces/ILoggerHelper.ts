import { LoggerDocument } from "../../models/logger-collection";
import { ObjectId, ObjectID } from "bson";

export interface ILoggerHelper {
  save(username: string,
       warnType: number, requestType: number,
       errorTitle: string, errorBody: string,  completeError: string): Promise<ObjectID | boolean>;
  remove(loggerId: ObjectId): Promise<boolean | LoggerDocument>;
  noticeLogger(username: string, requestType: number,
               errorTitle: string, errorBody: string, completeError: any):
               Promise<ObjectID | boolean>;
  warningLogger(username: string, requestType: number,
                errorTitle: string, errorBody: string, completeError: any):
                Promise<boolean | ObjectID>;
  errorLogger(username: string, requestType: number,
              errorTitle: string, errorBody: string, completeError: any):
              Promise<boolean | ObjectID>;
}
