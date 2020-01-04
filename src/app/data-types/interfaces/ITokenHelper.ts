import { UserDocument } from "../../models/user-collection";
import { ObjectId } from "bson";

export interface ITokenHelper {
  createToken(): string;
  saveToken(user: UserDocument): Promise<string>;
  getToken(token: string): Promise<ObjectId | boolean>;
  refreshToken(token: string): Promise<string | boolean>;
  deleteAllTokenUser(username: string): Promise<boolean>;
  deleteToken(token: string): Promise<boolean>;
  getLatestTokenUser(username: string): Promise<ObjectId | string>;
}
