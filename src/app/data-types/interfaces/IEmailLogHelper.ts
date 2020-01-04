import { EmailLogDocument } from "../../models/emailLog-collection";
import { ObjectID } from "bson";
import { IEmailLog } from "./IEmailLog";

export interface IEmailLogHelper {
  save(templateId: string, subject: string, body: string, to: string, cc: string,
       username: string, response: string):
   Promise<ObjectID>;
  remove(id: ObjectID): Promise<boolean>;
  removeAllByUsername(username: string): Promise<boolean>;
  read(id: ObjectID): Promise<boolean | EmailLogDocument>;
  update(id: ObjectID, newLog: IEmailLog): Promise<boolean | EmailLogDocument>;
  getAllByUsername(username: string): Promise<boolean | EmailLogDocument[]>;
}
