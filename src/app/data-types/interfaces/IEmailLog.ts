export interface IEmailLog {
  templateId: string;
  subject?: string;
  body?: string;
  username: string;
  to: string;
  cc?: string;
  enabled?: number;
  response?: string;
}
