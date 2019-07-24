import { IMessageHelper, IResponseMessage, IValidationError } from "../data-types/interfaces";
import { SUCCESSFUL,
         FORBIDDEN,
         BADREQUEST,
         UNAUTHORIZED,
                    } from "../../config/util/response-code";

export class MessageHelper implements IMessageHelper {
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
    return resMessage;
  }
}
