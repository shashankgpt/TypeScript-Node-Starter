import bcryptNodejs from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { USER1, TEMPLATE } from "../../config/util/collection-name";
import { ObjectId } from "mongodb";
import { User1 } from "./user-collection";
import { token } from "morgan";
import { TokenHelper } from "../helpers/token-helper";
import { request } from "https";
const EXPIRATION = 30; // in days
const LEN = 32;

export type EmailTemplateDocument = mongoose.Document & {
  templateId: string,
  subject: string,
  body: string,
  enabled: string,
};
const emailTemplateSchema = new mongoose.Schema({
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
  enabled: {
    type: Number,
    required: true,
    default: 1,
  },
},                                              {
  timestamps: true,
});

// tslint:disable-next-line:variable-name
export const EmailTemp = mongoose.model<EmailTemplateDocument>(TEMPLATE, emailTemplateSchema);
