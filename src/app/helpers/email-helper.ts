import { IMailer } from "../data-types/interfaces/IMailer";
import { IEmail } from "../data-types/interfaces/IEmailHelper";
import { SendMail } from "../middlewares/send-mail.handler";
const ejs = require("ejs");
export class Email implements IEmail {
  sendMail: any;
  constructor() {
    this.sendMail = new SendMail();
  }
  sendThankYouEmail(to: string, cc: string, subject: string): boolean {
    const user = { firstName : "John", lastName: "Doe" };

    const subject2 = ejs.render("Hello <%= firstName %>", user);
    const text2 = ejs.render("Hello, <%= firstName %> <%= lastName %>!", user);
    return this.sendMail.sendHtmlMail(to, cc, subject2, text2);
  }
  registerUserEmail(to: string, cc: string, subject: string): boolean {
    return this.sendMail.sendHtmlMail(to, cc, subject, "<h1>Hello</h1>");
  }
  forgotPasswordEmail(to: string, cc: string, subject: string): boolean {
    return this.sendMail.sendHtmlMail(to, cc, subject, "<h1>Hello</h1>");
  }

}
