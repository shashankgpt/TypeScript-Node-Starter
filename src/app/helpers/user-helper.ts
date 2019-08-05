import { User1, UserDocument, AuthToken } from "../models/user-collection";
import { IUserHelper, IUserRegister, IUserProfile, IUser } from "../data-types/interfaces";
import { ObjectID } from "bson";
import { WriteError } from "mongodb";
import promiseErrorHandler from "../middlewares/promise.error-handler";
export class UserHelper implements IUserHelper {
  getAllUser(): Promise<boolean | UserDocument[]> {
    return new Promise<boolean | UserDocument[]>((resolve, reject) => {
      User1.find({}, (err, existingUser) => {
        if (err) { return reject(err); }
        if (existingUser) {
          resolve(existingUser);
        }
        resolve(false);
      });
    });
  }
  unLockUser(username: string): Promise<boolean> {
    return new Promise<boolean | boolean>(async (resolve, reject) => {
      const query = { username };
      const update = {
        lock: false,
      };
      const userDoc = await promiseErrorHandler<boolean, UserDocument>(this.update(query, update));
      const val = userDoc ? true : false;
      return resolve(val);
    });
  }
  lockUser(username: string): Promise<boolean> {
    return new Promise<boolean | boolean>(async (resolve, reject) => {
      const query = { username };
      const update = {
        lock: true,
      };
      const userDoc = await promiseErrorHandler<boolean, UserDocument>(this.update(query, update));
      const val = userDoc ? true : false;
      return resolve(val);
    });
  }
  activeUser(username: string): Promise<boolean> {
    return new Promise<boolean | boolean>(async (resolve, reject) => {
      const query = { username };
      const update = {
        active: true,
      };
      const userDoc = await promiseErrorHandler<boolean, UserDocument>(this.update(query, update));
      const val = userDoc ? true : false;
      return resolve(val);
    });
  }
  deactivateUser(username: string): Promise<boolean> {
    return new Promise<boolean | boolean>(async (resolve, reject) => {
      const query = { username };
      const update = {
        active: false,
      };
      const userDoc = await promiseErrorHandler<boolean, UserDocument>(this.update(query, update));
      const val = userDoc ? true : false;
      return resolve(val);
    });
  }
  changeRole(username: string, role: number): Promise<boolean> {
    return new Promise<boolean | boolean>(async (resolve, reject) => {
      const query = { username };
      const update = {
        role,
      };
      const userDoc = await promiseErrorHandler<boolean, UserDocument>(this.update(query, update));
      const val = userDoc ? true : false;
      return resolve(val);
    });
  }
  createUser(user: IUserRegister): Promise<ObjectID | boolean> {
    return new Promise<ObjectID | boolean>((resolve, reject) => {
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
      const userDoc = await promiseErrorHandler<boolean, UserDocument>(this.deleteUser(query));
      return resolve(userDoc);
    });
  }
  deleteUserByUserID(userId: ObjectID): Promise<UserDocument | boolean> {
    return new Promise<boolean | UserDocument>(async (resolve, reject) => {
      const query = { _id: userId };
      const userDoc = await promiseErrorHandler<boolean, UserDocument>(this.deleteUser(query));
      return resolve(userDoc);
    });
  }
  updatePassword(userId: ObjectID, oldPassword: string, newPassword: string)
  : Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      const user = await promiseErrorHandler<boolean, UserDocument>(this.findUserByUserID(userId));
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

  forgotPassword(userId: ObjectID, reqHash: string, newPassword: string)
  : Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      const user = await promiseErrorHandler<boolean, UserDocument>(this.findUserByUserID(userId));
      if (user instanceof User1) {
      //  user.comparePassword(reqHash, (err: Error, isMatch: boolean) => {
         // if (err) { return reject(err); }
          // if (isMatch) {
        user.password = newPassword;
        user.save((err: WriteError) => {
          if (err) { return reject(err); }
              // delete all active session for a user
          resolve(true);
        });
          // }
          // else { resolve(false); }
       // });
      }
      else { resolve(false); }
    });
  }
  updateEmail(userId: ObjectID, newEmail: string): Promise<boolean> {
    return new Promise<boolean | boolean>(async (resolve, reject) => {
      const query = { _id : userId };
      const update = {
        email: newEmail,
      };
      const userDoc = await promiseErrorHandler<boolean, UserDocument>(this.update(query, update));
      const val = userDoc ? true : false;
      return resolve(val);
    });
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
      const userDoc = await promiseErrorHandler<boolean, UserDocument>(this.update(query, update));
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
      const userDoc = await promiseErrorHandler<boolean, UserDocument>(this.update(query, update));
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
      const userDoc = await promiseErrorHandler<boolean, UserDocument>(this.findUser(query));
      return resolve(userDoc);
    });
  }
  async findUserByEmail(mail: string): Promise< UserDocument | boolean > {
    return new Promise<boolean | UserDocument>(async (resolve, reject) => {
      const query = { email : mail };
      const userDoc = await promiseErrorHandler<boolean, UserDocument>(this.findUser(query));
      return resolve(userDoc);
    });
  }
  async findUserByUserID(userId: ObjectID): Promise< UserDocument | boolean > {
    return new Promise<boolean | UserDocument>(async (resolve, reject) => {
      const query = { _id : userId };
      const userDoc = await promiseErrorHandler<boolean, UserDocument>(this.findUser(query));
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
  async findAllUser(query: any): Promise < boolean | UserDocument[] > {
    return new Promise<boolean | UserDocument[]>((resolve, reject) => {
      User1.find(query, (err, existingUser) => {
        if (err) { return reject(err); }
        if (existingUser) {
          resolve(existingUser);
        }
        resolve(false);
      });
    });
  }
}
