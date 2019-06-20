import  crypto  from "crypto";
import { Function } from "babel-types";
import { ITokenHelper } from "../data-types/interfaces";
import { reject } from "bluebird";
import { Token, TokenDocument } from "../models/token-collection";
import { UserDocument } from "../models/user-collection";
import { ObjectId } from "bson";

const LEN = 16;

export class TokenHelper implements ITokenHelper {
  refreshToken(token: string): Promise<string | ObjectId> {
    throw new Error("Method not implemented.");
  }
  deleteAllTokenUser(username: string): Promise<string | ObjectId> {
    throw new Error("Method not implemented.");
  }
  getLatestTokenUser(username: string): Promise<string | ObjectId> {
    throw new Error("Method not implemented.");
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
                    // tslint:disable-next-line:no-null-keyword
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