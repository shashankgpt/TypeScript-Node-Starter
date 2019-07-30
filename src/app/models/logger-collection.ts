import bcryptNodejs from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { USER1, LOGGER } from "../../config/util/collection-name";
import { ObjectId } from "mongodb";
import { User1 } from "./user-collection";
import { token } from "morgan";
import { TokenHelper } from "../helpers/token-helper";
import { request } from "https";
const EXPIRATION = 30; // in days
const LEN = 32;

export type LoggerDocument = mongoose.Document & {
  username: string,
  warnType: number,
  requestType: number,
  errorTitle: string,
  errorBody: string,
  completeError: string,
};
const loggerSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  warnType: {
    type: Number,
    required: true,
  },
  requestType: {
    type: Number,
    required: true,
  },
  errorTitle: {
    type: String,
    required: true,
  },
  errorBody: {
    type: String,
    required: true,
  },
  completeError: {
    type: String,
    required: true,
  },
},                                       {
  timestamps: true,
});

// tslint:disable-next-line:variable-name
export const Logger = mongoose.model<LoggerDocument>(LOGGER, loggerSchema);
