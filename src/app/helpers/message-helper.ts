import { IMessageHelper, IResponseMessage, IValidationError } from "../data-types/interfaces";
import { SUCCESSFUL,
         FORBIDDEN,
         BADREQUEST,
         UNAUTHORIZED,
                    } from "../../config/util/response-code";
import { LoggerHelper } from "../helpers/logger-helper";

export class MessageHelper implements IMessageHelper {
  log: LoggerHelper;
  constructor() {
    this.log = new LoggerHelper();
  }
  createSuccessMessage(message: string, data: any= 0, statusCode: number= SUCCESSFUL)
  : IResponseMessage {
    const resMessage: IResponseMessage = {
      statusCode,
      data,
      Message: message,
      dateTime: new Date(),
    };
    return resMessage;
  }
  createFailureMessage(message: string, data: any= 0, statusCode: number = FORBIDDEN)
  : IResponseMessage {
    const resMessage: IResponseMessage = {
      statusCode,
      data,
      Message: message,
      dateTime: new Date(),
    };
    this.log.noticeLogger("", 1, message, data, (`${message}  ${data}`));
    return resMessage;
  }
  createRequiredFieldMessage(message: any, data: any= 0, statusCode: number= BADREQUEST)
  : IResponseMessage {
    const resMessage: IResponseMessage = {
      statusCode,
      data,
      Message: this.createMessage(message),
      dateTime: new Date(),
    };
    this.log.noticeLogger("", 1, message, data, (`${message}  ${data}`));
    return resMessage;
  }
  createMessage(data: any[] | string | IValidationError[]): string {
    if (data instanceof Array) {
      const message: string[] = [];
      // replace with map
      data.forEach((messageObj) => {
        message.push(messageObj.msg);
      });
      return message.join(",");
    }
  }
  createUnauthorizedUserMessage(message: string, data: any= 0, statusCode: number= UNAUTHORIZED)
  : IResponseMessage {
    const resMessage: IResponseMessage = {
      statusCode,
      data,
      Message: message,
      dateTime: new Date(),
    };
    this.log.warningLogger("", 1, message, data, (`${message}  ${data}`));
    return resMessage;
  }
}
