import { IMailer } from "./IMailer";
import { IMailResponse } from "./INodeMailResponse";

export interface ISendMailer {
  send(mailOptions: IMailer): boolean;
  sendHtmlMail(to: string, cc: string, subject: string, htmlBody: string): boolean;
  sendTextMail(to: string, cc: string, subject: string, body: string): boolean;
}
