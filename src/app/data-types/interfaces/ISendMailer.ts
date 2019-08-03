import { IMailer } from "./IMailer";
import { IMailResponse } from "./INodeMailResponse";

export interface ISendMailer {
  logEmailResponse(err: any, info: IMailResponse): void;
  send(mailOptions: IMailer): boolean;
  sendHtmlMail(to: string,  subject: string, htmlBody: string, cc: string): boolean;
  sendTextMail(to: string, subject: string, body: string, cc: string): boolean;
}
