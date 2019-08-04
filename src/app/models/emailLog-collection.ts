import bcryptNodejs from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import {  EMAILLOG } from "../../config/util/collection-name";
import { ObjectId } from "mongodb";
import { User1 } from "./user-collection";
import { token } from "morgan";
import { TokenHelper } from "../helpers/token-helper";
import { request } from "https";
const EXPIRATION = 30; // in days
const LEN = 32;

export type EmailLogDocument = mongoose.Document & {
  templateId: string,
  subject: string,
  body: string,
  username: string,
  to: string,
  cc: string,
  enabled: number,
  response: string,
};
const emailLogSchema = new mongoose.Schema({
  templateId: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
    default: "",
  },
  cc: {
    type: String,
    default: "",
  },
  enabled: {
    type: Number,
    default: 1,
  },
  response: {
    type: String,
  },
},                                         {
  timestamps: true,
});

// tslint:disable-next-line:variable-name
export const EmailLog = mongoose.model<EmailLogDocument>(EMAILLOG, emailLogSchema);
