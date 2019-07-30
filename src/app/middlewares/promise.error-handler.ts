import { request } from "../data-types/data-structure/request-info";
import { LoggerHelper } from "../helpers/logger-helper";

export default function to<T, T2>(promise: Promise<T | T2>) {
  return promise.then((data: T | T2) => {
    return data;
  })
  .catch((err) => {
    console.log(err);
    const log  = new LoggerHelper();
    const error = JSON.stringify(err);
    log.errorLogger("app", request.backend, "global promise failed", "", error);
    return false;
  });
}
