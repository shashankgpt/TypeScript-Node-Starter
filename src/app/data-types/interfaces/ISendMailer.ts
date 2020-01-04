import { IMailer } from "./IMailer";
import { IMailResponse } from "./INodeMailResponse";

export interface ISendMailer {
  logEmailResponse(err: any, info: IMailResponse): Promise<boolean>;
  send(mailOptions: IMailer): Promise<boolean>;
  sendHtmlMail(to: string,  subject: string, htmlBody: string, cc: string): Promise<boolean>;
  sendTextMail(to: string, subject: string, body: string, cc: string): Promise<boolean>;
}
