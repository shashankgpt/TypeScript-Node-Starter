import { IMailResponse } from "../data-types/interfaces/INodeMailResponse";
import { IMailer } from "../data-types/interfaces/IMailer";
import { ISendMailer } from "../data-types/interfaces/ISendMailer";
import { EMAIL_USERNAME , EMAIL_PASSWORD, EMAIL_SERVICE } from "../../config/util/secrets";
import { IEmailLog } from "../data-types/interfaces/IEmailLog";
import { EmailTemplateHelper } from "../helpers/email.template-helper";
import { EmailLogHelper } from "../helpers/emailLog-helper";
const nodemailer = require("nodemailer");

export class SendMail implements ISendMailer {
  transporter: any;
  mailLog: IEmailLog;
  constructor(mailLog: IEmailLog) {
    this.transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });
    this.mailLog = mailLog;
  }
  async logEmailResponse(err: any, info: IMailResponse): Promise<boolean> {
    {
      return new Promise<boolean>(async(resolve, reject) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info.response);
          this.mailLog.response = info.response;
        }
        const logMail = new EmailLogHelper();
        const { templateId, subject, cc, to, username, body, response } = this.mailLog;
        const id = await logMail.save(templateId, subject, body, to, cc, username, response);
        if (id) { resolve(true); }
      });
    }
  }
  async send(mailOptions: IMailer): Promise<boolean> {
    return new Promise<boolean>(async(resolve, reject) => {
      const info: IMailResponse =   await this.transporter.sendMail(mailOptions);
      return resolve(this.logEmailResponse("", info));
    });
  }
  async sendHtmlMail(to: string, subject: string, htmlBody: string, cc: string = "")
  : Promise< boolean> {
    const mailOptions: IMailer = {
      to,
      cc,
      subject,
      from: EMAIL_USERNAME,
      html: htmlBody,
    };
    return await this.send(mailOptions);
  }
  async sendTextMail(to: string, subject: string, body: string, cc: string = ""): Promise<boolean> {
    const mailOptions: IMailer = {
      to,
      cc,
      subject,
      from: EMAIL_USERNAME,
      text: body,
    };
    return await this.send(mailOptions);
  }

}
