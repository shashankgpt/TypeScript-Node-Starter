export interface IEmailTemplate {
  emailId: string;
  subject: string;
  body: string;
  enabled?: number;

}

export interface EmailRespond {
  subject: string;
  body: string;
}
