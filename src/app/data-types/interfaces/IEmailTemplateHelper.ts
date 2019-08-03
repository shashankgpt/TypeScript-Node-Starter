import { IEmailTemplate, EmailRespond } from "./IEmailTemplate";
import { ObjectID } from "bson";
import { EmailTemplateDocument } from "../../models/emailTemplate-collection";

export interface IEmailTemplateHelper {
  save(template: IEmailTemplate): Promise<boolean| ObjectID>;
  delete(templateName: string): Promise<boolean|EmailTemplateDocument>;
  update(templateName: object, update: object):
   Promise<boolean | EmailTemplateDocument>;
  updateEmail(templateName: string, subject: string, body: string):
   Promise<boolean | EmailTemplateDocument>;
  updateSubject(templateName: string, subject: string):
   Promise<boolean | EmailTemplateDocument>;
  update(templateName: object, update: object):
   Promise<boolean | EmailTemplateDocument>;

  find(templateName: string): Promise<boolean|EmailTemplateDocument>;

}
