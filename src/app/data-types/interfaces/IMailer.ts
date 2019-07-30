export interface IMailer {

  from: string;
  to: string;
  cc: string;
  subject: string;
  text ?: string;
  html ?: string;

}
