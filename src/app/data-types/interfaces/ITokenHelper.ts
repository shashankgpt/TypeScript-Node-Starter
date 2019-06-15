import { UserDocument } from "../../models/user-collection";

export interface ITokenHelper {
  createToken(): string;
  saveToken(user: UserDocument): Promise<string>;

}
