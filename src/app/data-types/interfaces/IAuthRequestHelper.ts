import { ObjectId } from "bson";

export interface IAuthRequestHelper {
  saveRequestAuth(username: string, requestType: number): Promise<string>;
  getRequestToken(token: string): Promise<number>;
  refreshRequestToken(token: string): Promise<string | boolean>;
  deleteAllTokenRequest(username: string): Promise<ObjectId | boolean>;
  getLatestTokenRequest(username: string): Promise<ObjectId | string>;
}
