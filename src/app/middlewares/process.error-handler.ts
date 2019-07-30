import { request } from "../data-types/data-structure/request-info";
import { LoggerHelper } from "../helpers/logger-helper";

export  function processPromiseErrorHandler(error: any, p: any) {
  console.log("Unhandled Rejection1:", error.stack);
  const log  = new LoggerHelper();
  const stack = JSON.stringify(error.stack);
  const error1 = JSON.stringify(error);
  log.errorLogger("app", request.backend, "global unhandled promise failed", stack, error1);
  // process.exit(1);
}
export  function processErrorHandler(error: any) {
  console.log("Unhandled Error1:", error.stack);
  const log  = new LoggerHelper();
  const stack = JSON.stringify(error.stack);
  const error1 = JSON.stringify(error);
  log.errorLogger("app", request.backend, "global unhandled promise failed", stack, error1);
    // process.exit(1);
}
