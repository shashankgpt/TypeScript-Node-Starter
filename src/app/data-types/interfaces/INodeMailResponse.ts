export interface IMailResponse {
  accepted: string[];
  rejected: string[];
  envelopeTime: number;
  messageTime: number;
  response: string;
  envelope: Envelope;
}

interface Envelope {
  from: string;
  to: string[];
  messageId: string;
}
