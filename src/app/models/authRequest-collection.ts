import bcryptNodejs from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { AUTHREQUEST } from "../../config/util/collection-name";
import { ObjectId } from "mongodb";
import { User1 } from "./user-collection";
import { token } from "morgan";
import { TokenHelper } from "../helpers/token-helper";
const EXPIRATION = 30; // in days
const LEN = 32;

export type AuthRequestDocument = mongoose.Document & {
  username: string,
  hash: string,
  requestType: number,
  expiresAt: Date,
};
const authRequestSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  requestType: {
    type: Number,
    required: true,
  },
  expiresAt: {
    type: Date,
    default() {
      const now = new Date();
      now.setDate(now.getDate() + EXPIRATION);
      return now;
    },
  },
},                                            {
  timestamps: true,
});

// tslint:disable-next-line: variable-name
export const AuthRequest = mongoose.model<AuthRequestDocument>(AUTHREQUEST, authRequestSchema);
