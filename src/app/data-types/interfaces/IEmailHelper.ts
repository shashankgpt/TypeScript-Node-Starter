import { EmailRespond } from "./IEmailTemplate";

export interface IEmail {
  sendThankYouEmail(to: string, tempObj: Object, cc: string): Promise<boolean>;
  registerUserEmail(to: string,  tempObj: Object, cc: string): Promise<boolean>;
  forgotPasswordEmail(to: string, tempObj: Object, cc: string): Promise<boolean>;
  makeTemplate(templateId: string, tempObj: Object): Promise<boolean | EmailRespond>;
}
