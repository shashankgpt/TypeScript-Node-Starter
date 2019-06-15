import  crypto  from "crypto";
import { Function } from "babel-types";
import { ITokenHelper } from "../data-types/interfaces/ITokenHelper";
import { reject } from "bluebird";
import { Token, TokenDocument } from "../models/token-collection";
import { UserDocument } from "../models/user-collection";
import { ObjectId } from "bson";

const LEN = 16;
export class TokenHelper implements ITokenHelper {
  getToken(token: string): Promise<ObjectId | string> {
    return new Promise((resolve, reject) => {
      Token.findOne({ hash: token })
                 .populate("user")
                 .exec((err, result) => {
                   if (err) {
                     return resolve("Unauthorized.");
                   }
                   if (!result) {
                     return resolve("Unauthorized.");
                   }

                   if (!result.user) {
                    // tslint:disable-next-line:no-null-keyword
                     return resolve("Unauthorized.");
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
