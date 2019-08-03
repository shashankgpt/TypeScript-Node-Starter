import { IMailResponse } from "../data-types/interfaces/INodeMailResponse";
import { IMailer } from "../data-types/interfaces/IMailer";
import { ISendMailer } from "../data-types/interfaces/ISendMailer";
import { EMAIL_USERNAME , EMAIL_PASSWORD, EMAIL_SERVICE } from "../../config/util/secrets";
const nodemailer = require("nodemailer");

export class SendMail implements ISendMailer {
  transporter: any;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });
  }
  logEmailResponse(err: any, info: IMailResponse): void {
    {
      if (err) {
        console.log(err);
      } else {
        console.log(info.response);
      }
    }
  }
  send(mailOptions: IMailer): boolean {
    this.transporter.sendMail(mailOptions, this.logEmailResponse);
    return true;
  }
  sendHtmlMail(to: string, subject: string, htmlBody: string, cc: string = ""): boolean {
    const mailOptions: IMailer = {
      to,
      cc,
      subject,
      from: EMAIL_USERNAME,
      html: htmlBody,
    };
    return this.send(mailOptions);
  }
  sendTextMail(to: string, subject: string, body: string, cc: string = ""): boolean {
    const mailOptions: IMailer = {
      to,
      cc,
      subject,
      from: EMAIL_USERNAME,
      text: body,
    };
    return this.send(mailOptions);
  }

}
