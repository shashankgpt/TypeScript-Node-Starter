import { ObjectID } from "bson";
import { UserDocument } from "../../models/user-collection";
import { IUserRegister, IUserProfile } from "./";

export interface IUserHelper {
  getAllUser(): Promise<UserDocument[]>;
  createUser(user: IUserRegister): Promise<ObjectID | Boolean>;
  deleteUserByUsername(username: string): Promise<UserDocument | boolean>;
  deleteUserByUserID(userId: ObjectID): Promise<UserDocument | boolean>;
  updatePassword(userId: ObjectID, oldPassword: string, newPassword: string): Promise<boolean>;
  updateEmail(userId: ObjectID, newEmail: string): string;
  updateProfileByUserID(userId: ObjectID, newProfile: UserDocument):
  Promise<boolean | UserDocument>;
  updateProfileByUsername(username: string, newProfile: UserDocument)
  : Promise<boolean | UserDocument>;
  update(query: object, update: object): Promise<boolean | UserDocument>;
  deleteUser(query: any): Promise<boolean | UserDocument>;
  findUserByUsername(username: string): Promise<UserDocument | boolean>;
  findUserByEmail(email: string): Promise<UserDocument | boolean>;
  findUserByUserID(userId: ObjectID): Promise<UserDocument | boolean>;
  findUser(query: any): Promise<UserDocument | boolean>;
  unLockUser(username: string): Promise<boolean>;
  lockUser(username: string): Promise<boolean>;
  activeUser(username: string): Promise<boolean>;
}
