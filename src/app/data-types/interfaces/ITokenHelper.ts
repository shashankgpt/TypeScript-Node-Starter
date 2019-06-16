import { UserDocument } from "../../models/user-collection";
import { ObjectId } from "bson";

export interface ITokenHelper {
  createToken(): string;
  saveToken(user: UserDocument): Promise<string>;
  getToken(token: string): Promise<ObjectId | string>;
  refreshToken(token: string): Promise<ObjectId | string>;
  deleteAllTokenUser(username: string): Promise<ObjectId | string>;
  getLatestTokenUser(username: string): Promise<ObjectId | string>;
}
