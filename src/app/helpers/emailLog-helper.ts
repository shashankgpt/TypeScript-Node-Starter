import { IEmailLogHelper } from "../data-types/interfaces/IEmailLogHelper";
import { EmailLogDocument, EmailLog } from "../models/emailLog-collection";
import { IEmailLog } from "../data-types/interfaces/IEmailLog";
import { ObjectId } from "bson";

export class EmailLogHelper implements IEmailLogHelper {
  save(templateId: string, subject: string, body: string, to: string,
       cc: string, username: string, response: string)
  : Promise<ObjectId > {
    return new Promise<ObjectId >((resolve, reject) => {
      const templateModel = new EmailLog({
        templateId,
        subject,
        body,
        username,
        to,
        cc,
        response,
      });
      templateModel.save((err) => {
        if (err) { return reject(err); }
        resolve(templateModel._id);
      });
    });
  }
  remove(id: ObjectId): Promise<boolean> {
    return new Promise<boolean >((resolve, reject) => {
      EmailLog.findOneAndRemove({ _id: id }, (err, logger) => {
        if (err) { return reject(err); }
        if (logger) {
          resolve(true);
        }
        resolve(false);
      });
    });
  }

  removeAllByUsername(username: string): Promise<boolean> {
    return new Promise<boolean >((resolve, reject) => {
      EmailLog.deleteMany({ username }, (err: any) => {
        if (err) { return reject(err); }
        resolve(true);
      });
    });
  }
  read(id: ObjectId): Promise<boolean | EmailLogDocument> {
    return new Promise<boolean | EmailLogDocument>((resolve, reject) => {
      EmailLog.findOne({ _id: id }, (err, emailLog) => {
        if (err) { return reject(err); }
        if (emailLog) {
          resolve(emailLog);
        }
        resolve(false);
      });
    });
  }
  update(id: ObjectId, newLog: IEmailLog): Promise<boolean | EmailLogDocument> {
    return new Promise<boolean | EmailLogDocument>((resolve, reject) => {
      EmailLog.findOneAndUpdate({ _id: id }, { $set: newLog }, { new: true }, (err, newLog) => {
        if (err) { return reject(err); }
        if (newLog) {
          resolve(newLog);
        }
        resolve(false);
      });
    });
  }
  getAllByUsername(username: string): Promise<boolean | EmailLogDocument[]> {
    return new Promise<boolean | EmailLogDocument[]>((resolve, reject) => {
      EmailLog.find({ username }, (err, emailLog) => {
        if (err) { return reject(err); }
        if (emailLog) {
          resolve(emailLog);
        }
        resolve(false);
      });
    });
  }
}
