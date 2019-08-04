import { IAuthRequestHelper } from "../data-types/interfaces/IAuthRequestHelper";
import{ TokenHelper } from "./token-helper";
import { AuthRequest } from "../models/authRequest-collection";
import { authRequest } from "../data-types/data-structure/authRequest-info";
export class AuthRequestHelper implements IAuthRequestHelper {
  saveRequestAuth(username: string, requestType: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const tokenHelp = new TokenHelper();
      const tokenString = tokenHelp.createToken();
      const authRequest = new AuthRequest({
        username,
        requestType,
        hash: tokenString,
      });
      authRequest.save((err) => {
        if (err) { return reject(err); }
        resolve(tokenString);
      });
    });
  }
  getRequestToken(token: string): Promise<number> {
    return new Promise((resolve, reject) => {
      AuthRequest.findOne({ hash: token }, {}, { sort: { createdAt : -1 } },  (err, token) => {
        return resolve(token.requestType);
      });
    });
  }
  async refreshRequestToken(token: string): Promise<string | boolean> {
    return new Promise<boolean | string>(async(resolve, reject) => {
      AuthRequest.findOneAndRemove({ hash: token }, async (err, authToken) => {
        if (err) { return reject(err); }
        if (authToken) {
          const token = await this.saveRequestAuth(authToken.username, authToken.requestType);
          resolve(token);
        }
      });
    });
  }
  deleteAllTokenRequest(username: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      AuthRequest.deleteMany({ username }, (err) => {
        return reject(err);
      });
      return resolve(true);
    });
  }
  getLatestTokenRequest(username: string): Promise<string> {
    return new Promise((resolve, reject) => {
      AuthRequest.findOne({ username }, {}, { sort: { createdAt : -1 } },  (err, token) => {
        return resolve(token.hash);
      });
    });
  }
}
