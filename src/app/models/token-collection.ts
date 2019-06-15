import bcryptNodejs from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { USER1, TOKEN } from "../../config/util/collection-name";
import { ObjectId } from "mongodb";
import { User1 } from "./user-collection";
import { token } from "morgan";
import { TokenHelper } from "../helpers/token-helper";
const EXPIRATION = 30; // in days
const LEN = 32;

export type TokenDocument = mongoose.Document & {
  username: string,
  hash: string,
  expiresAt: Date,
  user: ObjectId,
};
const tokenSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: USER1,
    required: true,
  },
  username: {
    type: String,
  },
  hash: {
    type: String,
  },
  expiresAt: {
    type: Date,
    default() {
      const now = new Date();
      now.setDate(now.getDate() + EXPIRATION);
      return now;
    },
  },
},                                      {
  timestamps: true,
});

// tslint:disable-next-line: variable-name
export const Token = mongoose.model<TokenDocument>(TOKEN, tokenSchema);
