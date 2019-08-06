import  crypto  from "crypto";
import { Function } from "babel-types";
import { ITokenHelper } from "../data-types/interfaces";
import { reject } from "bluebird";
import { Token, TokenDocument } from "../models/token-collection";
import { UserDocument } from "../models/user-collection";
import { ObjectId } from "bson";

const LEN = 16;

export class TokenHelper implements ITokenHelper {
  deleteAllTokenUser(username: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      Token.deleteMany({ username }, (err) => {
        return reject(err);
      });
      return resolve(true);
    });
  }
  deleteToken(token: string) {
    return new Promise<boolean>((resolve, reject) => {
      Token.deleteOne({ hash: token }, (err) => {
        return reject(err);
      });
      return resolve(true);
    });
  }
  refreshToken(token: string): Promise<string | boolean> {
    return new Promise<boolean | string>((resolve, reject) => {
      Token.findOneAndRemove({ hash: token }, (err, token) => {
        if (err) { return reject(err); }
        if (token) {
          const tokenString = this.createToken();
          const tokenInstance = new Token({
            user: token.user,
            hash: tokenString,
            username: token.username,
          });
          tokenInstance.save((err) => {
            if (err) { return reject(err); }
            resolve(tokenString);
          });
        }
      });
    });
  }
  getLatestTokenUser(username: string): Promise<string | ObjectId> {
    return new Promise((resolve, reject) => {
      Token.findOne({ username }, {}, { sort: { createdAt : -1 } },  (err, token) => {
        return resolve(token.hash);
      });
    });
  }
  getToken(token: string): Promise<ObjectId | boolean> {
    return new Promise((resolve, reject) => {
      Token.findOne({ hash: token })
                 .populate("user")
                 .exec((err, result) => {
                   if (err) {
                     return resolve(false);
                   }
                   if (!result) {
                     return resolve(false);
                   }

                   if (!result.user) {
                     return resolve(false);
                   }
                   return resolve(result.user);
                 });
    });
  }
  createToken(): string {
    const buf = crypto.randomBytes(LEN);
    return buf.toString("hex");
  }
  saveToken(user: UserDocument): Promise<string> {
    return new Promise((resolve, reject) => {
      const tokenString = this.createToken();
      const token = new Token({
        user: user._id,
        hash: tokenString,
        username: user.username,
      });
      token.save((err) => {
        if (err) { return reject(err); }
        resolve(tokenString);
      });
    });
  }
}
