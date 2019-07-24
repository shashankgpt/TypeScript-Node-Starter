import { IResponseMessage , IUser } from "./";
export interface IMessageHelper {
  createSuccessMessage(message: string, data: any, statusCode: number): IResponseMessage;
  createFailureMessage(message: string, data: any, statusCode: number): IResponseMessage;
  createRequiredFieldMessage(message: any[], data: any, statusCode: number): IResponseMessage;
  createMessage(data: any[]): string;
  createUnauthorizedUserMessage(message: string, data: any, statusCode: number): IResponseMessage;
}
