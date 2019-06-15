import { UserDocument } from "../../models/user-collection";
import { ObjectId } from "bson";

export interface ITokenHelper {
  createToken(): string;
  saveToken(user: UserDocument): Promise<string>;

  getToken(token: string): Promise<ObjectId | string>;
}
