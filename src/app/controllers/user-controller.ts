import { Request, Response, NextFunction } from "express";

export let getUser = (req: Request, res: Response, next: NextFunction) => {
  res.send("hello");
};

export let register = (req: Request, res: Response, next: NextFunction) => {
  res.send("register");
};
