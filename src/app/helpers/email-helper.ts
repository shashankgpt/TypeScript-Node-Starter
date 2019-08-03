import { IEmail } from "../data-types/interfaces/IEmailHelper";
import { SendMail } from "../middlewares/send-mail.handler";
import { EmailTemplateHelper } from "./email.template-helper";
import { EmailRespond } from "../data-types/interfaces/IEmailTemplate";
import { EmailTemp, EmailTemplateDocument } from "../models/emailTemplate-collection";
import promiseErrorHandler from "../middlewares/promise.error-handler";

const ejs = require("ejs");
export class Email implements IEmail {
  async sendThankYouEmail(to: string, tempObj: Object, cc: string= ""): Promise<boolean> {
    const mailObj = await this.makeTemplate("thank.mail", tempObj);
    const { subject, body } = mailObj;
    return this.sendMail.sendHtmlMail(to, subject, body, cc);
  }
  async registerUserEmail(to: string, tempObj: Object, cc: string= ""): Promise<boolean> {
    const mailObj = await this.makeTemplate("register.mail", tempObj);
    const { subject, body } = mailObj;
    return this.sendMail.sendHtmlMail(to, subject, body, cc);
  }
  async forgotPasswordEmail(to: string, tempObj: Object, cc: string): Promise<boolean> {
    const mailObj = await this.makeTemplate("forgot.password.mail", tempObj);
    const { subject, body } = mailObj;
    return this.sendMail.sendHtmlMail(to, subject, body, cc);
  }
  async makeTemplate(templateId: string, tempObj: Object): Promise<EmailRespond> {
    return new Promise(async (resolve, reject) => {
      const emailTemplate = new EmailTemplateHelper();
      const mail = await
    promiseErrorHandler<boolean, EmailTemplateDocument>(emailTemplate.find(templateId));
      if (mail instanceof EmailTemp) {
        const subject = ejs.render(mail.subject, tempObj);
        const body = ejs.render(mail.body, tempObj);
        const email: EmailRespond = {
          subject,
          body,
        };
        return resolve(email);
      }
      return reject(mail);
    });
  }
  sendMail: SendMail;
  constructor() {
    this.sendMail = new SendMail();
  }

}
