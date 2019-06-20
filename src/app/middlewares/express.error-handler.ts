import { Request, Response, NextFunction  } from "express";
import httpException from "../data-types/data-structure/httpException";
export default function errorHandlerExpress(
    err: httpException, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(200).send("Something broke");
  return true;
}
