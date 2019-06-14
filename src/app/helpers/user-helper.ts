import { User1, UserDocument, AuthToken } from "../models/user-collection";
import { IUserRegister, IUserProfile } from "../data-types/interfaces/IUser";
import { IUserHelper } from "../data-types/interfaces/IUserHelper";
import { ObjectID } from "bson";
export class UserHelper implements IUserHelper {
  createUser(user: IUserRegister): Promise<ObjectID | Boolean> {
    return new Promise<ObjectID | Boolean>((resolve, reject) => {
      const userModel = new User1({
        username: user.username,
        email: user.email,
        password: user.password,
      });
      userModel.save((err) => {
        if (err) { return reject(err); }
        resolve(userModel._id);
      });
    });
  }
  deleteUserByUsername(username: string): boolean {
    throw new Error("Method not implemented.");
  }
  deleteUserByUserID(userId: ObjectID): boolean {
    throw new Error("Method not implemented.");
  }
  updatePassword(userId: ObjectID, oldPassword: string, newPassword: string): boolean {
    throw new Error("Method not implemented.");
  }
  updateEmail(userId: ObjectID, newEmail: string): string {
    throw new Error("Method not implemented.");
  }
  updateProfileByUserID(userId: ObjectID, newProfile: UserDocument): IUserProfile {
    throw new Error("Method not implemented.");
  }
  updateProfileByUsername(username: string, newProfile: UserDocument): IUserProfile {
    throw new Error("Method not implemented.");
  }
  updateProfile(query: any): import("../data-types/interfaces/IUser").IUserProfile {
    throw new Error("Method not implemented.");
  }
  deleteUser(query: any): boolean {
    throw new Error("Method not implemented.");
  }
  async findUserByUsername(userName: string): Promise<UserDocument | boolean> {
    return new Promise<boolean | UserDocument>(async (resolve, reject) => {
      const query = { username : userName };
      const userDoc = await this.findUser(query);
      return resolve(userDoc);
    });
  }
  async findUserByEmail(mail: string): Promise<UserDocument | boolean> {
    return new Promise<boolean | UserDocument>(async (resolve, reject) => {
      const query = { email : mail };
      const userDoc = await this.findUser(query);
      return resolve(userDoc);
    });
  }
  findUserByUserID(userId: ObjectID): UserDocument {
    throw new Error("Method not implemented.");
  }
  async findUser(query: any): Promise<boolean | UserDocument> {
    return new Promise<boolean | UserDocument>((resolve, reject) => {
      User1.findOne(query, (err, existingUser) => {
        if (err) { return reject(err); }
        if (existingUser) {
          resolve(existingUser);
        }
        resolve(false);
      });
    });
  }
}
