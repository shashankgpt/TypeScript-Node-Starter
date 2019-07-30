export interface IEmail {
  sendThankYouEmail(to: string, cc: string, subject: string): boolean;
  registerUserEmail(to: string, cc: string, subject: string): boolean;

  forgotPasswordEmail(to: string, cc: string, subject: string): boolean;
}
