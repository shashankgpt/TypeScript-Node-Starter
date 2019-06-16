import { User1, UserDocument, AuthToken } from "../models/user-collection";
import { IUserRegister, IUserProfile, IUser } from "../data-types/interfaces/IUser";
import { IUserHelper } from "../data-types/interfaces/IUserHelper";
import { ObjectID } from "bson";
import { WriteError } from "mongodb";

export class UserHelper implements IUserHelper {
  getAllUser(): Promise<UserDocument[]> {
    throw new Error("Method not implemented.");
  }
  unLockUser(username: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  lockUser(username: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  activeUser(username: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
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
  deleteUserByUsername(username: string): Promise<UserDocument | boolean> {
    return new Promise<boolean | UserDocument>(async (resolve, reject) => {
      const query = { username };
      const userDoc = await this.deleteUser(query);
      return resolve(userDoc);
    });
  }
  deleteUserByUserID(userId: ObjectID): Promise<UserDocument | boolean> {
    return new Promise<boolean | UserDocument>(async (resolve, reject) => {
      const query = { _id: userId };
      const userDoc = await this.deleteUser(query);
      return resolve(userDoc);
    });
  }
  updatePassword(userId: ObjectID, oldPassword: string, newPassword: string)
  : Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      const user = await this.findUserByUserID(userId);
      if (user instanceof User1) {
        user.comparePassword(oldPassword, (err: Error, isMatch: boolean) => {
          if (err) { return reject(err); }
          if (isMatch) {
            user.password = newPassword;
            user.save((err: WriteError) => {
              if (err) { return reject(err); }
              // delete all active session for a user
              resolve(true);
            });
          }
          else { resolve(false); }
        });
      }
      else { resolve(false); }
    });
  }
  updateEmail(userId: ObjectID, newEmail: string): string {
    throw new Error("Method not implemented.");
  }
  updateProfileByUserID(userId: ObjectID, newProfile: IUser)
  : Promise<boolean | UserDocument> {
    return new Promise<boolean | UserDocument>(async (resolve, reject) => {
      const query = { _id : userId };
      const update = {
        email: newProfile.email,
        profile: {
          firstName: newProfile.firstName,
          lastName: newProfile.lastName,
          gender: newProfile.gender,
          location: newProfile.location,
          website: newProfile.website,
        },
      };
      const userDoc = await this.update(query, update);
      return resolve(userDoc);
    });
  }
  updateProfileByUsername(username: string, newProfile: IUser)
  : Promise<boolean | UserDocument> {
    return new Promise<boolean | UserDocument>(async (resolve, reject) => {
      const query = { username };
      const update = {
        email: newProfile.email,
        profile: {
          firstName: newProfile.firstName,
          lastName: newProfile.lastName,
          gender: newProfile.gender,
          location: newProfile.location,
          website: newProfile.website,
        },
      };
      const userDoc = await this.update(query, update);
      return resolve(userDoc);
    });
  }
  update(query: object , update: object): Promise<boolean | UserDocument> {
    return new Promise<boolean | UserDocument>((resolve, reject) => {
      User1.findOneAndUpdate(query, { $set: update }, { new: true }, (err, newUser) => {
        if (err) { return reject(err); }
        if (newUser) {
          resolve(newUser);
        }
        resolve(false);
      });
    });
  }
  deleteUser(query: any): Promise<boolean | UserDocument> {
    return new Promise<boolean | UserDocument>((resolve, reject) => {
      User1.findOneAndRemove(query, (err, existingUser) => {
        if (err) { return reject(err); }
        if (existingUser) {
          resolve(existingUser);
        }
        resolve(false);
      });
    });
  }
  async findUserByUsername(userName: string): Promise<UserDocument | boolean > {
    return new Promise<boolean | UserDocument>(async (resolve, reject) => {
      const query = { username : userName };
      const userDoc = await this.findUser(query);
      return resolve(userDoc);
    });
  }
  async findUserByEmail(mail: string): Promise< UserDocument | boolean > {
    return new Promise<boolean | UserDocument>(async (resolve, reject) => {
      const query = { email : mail };
      const userDoc = await this.findUser(query);
      return resolve(userDoc);
    });
  }
  async findUserByUserID(userId: ObjectID): Promise< UserDocument | boolean > {
    return new Promise<boolean | UserDocument>(async (resolve, reject) => {
      const query = { _id : userId };
      const userDoc = await this.findUser(query);
      return resolve(userDoc);
    });
  }
  async findUser(query: any): Promise < boolean | UserDocument > {
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
