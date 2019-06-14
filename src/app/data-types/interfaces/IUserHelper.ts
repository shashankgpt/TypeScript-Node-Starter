import { ObjectID } from "bson";
import { UserDocument } from "../../models/user-collection";
import { IUserRegister, IUserProfile } from "./IUser";

export interface IUserHelper {
  createUser(user: IUserRegister): Promise<ObjectID | Boolean>;
  deleteUserByUsername(username: string): boolean;
  deleteUserByUserID(userId: ObjectID): boolean;
  updatePassword(userId: ObjectID, oldPassword: string, newPassword: string): boolean;
  updateEmail(userId: ObjectID, newEmail: string): string;
  updateProfileByUserID(userId: ObjectID, newProfile: UserDocument): IUserProfile;
  updateProfileByUsername(username: string, newProfile: UserDocument): IUserProfile;
  updateProfile(query: any): IUserProfile;
  deleteUser(query: any): boolean;
  findUserByUsername(username: string): Promise<UserDocument | boolean>;
  findUserByEmail(email: string): Promise<UserDocument | boolean>;
  findUserByUserID(userId: ObjectID): UserDocument;
  findUser(query: any): Promise<UserDocument | boolean>;
}
