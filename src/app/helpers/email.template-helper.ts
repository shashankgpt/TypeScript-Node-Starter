import { IEmailTemplateHelper } from "../data-types/interfaces/IEmailTemplateHelper";
import { IEmailTemplate, EmailRespond } from "../data-types/interfaces/IEmailTemplate";
import { ObjectId } from "mongodb";
import { EmailTemp, EmailTemplateDocument } from "../models/emailTemplate-collection";

export class EmailTemplateHelper implements IEmailTemplateHelper {
  save(template: IEmailTemplate): Promise<boolean | ObjectId> {
    return new Promise<ObjectId | boolean>((resolve, reject) => {
      const emailModel = new EmailTemp({
        templateId: template.emailId,
        subject: template.subject,
        body: template.body,
      });
      emailModel.save((err) => {
        if (err) { return reject(err); }
        resolve(emailModel._id);
      });
    });
  }
  delete(templateName: string): Promise<boolean | EmailTemplateDocument> {
    return new Promise<boolean | EmailTemplateDocument>((resolve, reject) => {
      EmailTemp.findOneAndRemove({ templateId: templateName }, (err, existingTemplate) => {
        if (err) { return reject(err); }
        if (existingTemplate) {
          resolve(existingTemplate);
        }
        resolve(false);
      });
    });
  }
  update(query: object , update: object): Promise<boolean | EmailTemplateDocument> {
    return new Promise<boolean | EmailTemplateDocument>((resolve, reject) => {
      EmailTemp.findOneAndUpdate(query, { $set: update }, { new: true }, (err, newTemp) => {
        if (err) { return reject(err); }
        if (newTemp) {
          resolve(newTemp);
        }
        resolve(false);
      });
    });
  }

  updateSubject(templateId: string, subject: string): Promise<boolean | EmailTemplateDocument> {
    const update = { subject };
    return this.update({ templateId }, update);
  }
  updateBody(templateId: string, body: string): Promise<boolean | EmailTemplateDocument> {
    const update = { body };
    return this.update({ templateId }, update);
  }

  updateEmail(templateId: string, subject: string, body: string):
  Promise<boolean | EmailTemplateDocument> {
    const update = { subject, body };
    return this.update({ templateId }, update);
  }
  find(templateName: string): Promise<boolean | EmailTemplateDocument> {
    return new Promise<boolean | EmailTemplateDocument>((resolve, reject) => {
      EmailTemp.findOne({ templateId: templateName }, (err, template) => {
        if (err) { return reject(err); }
        if (template) {
          resolve(template);
        }
        resolve(false);
      });
    });
  }

}
