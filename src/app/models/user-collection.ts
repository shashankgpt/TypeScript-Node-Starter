import bcryptNodejs from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { USER1 } from "../../config/util/collection-name";
import { roleNum } from "../data-types/data-structure/role-info";
export type UserDocument = mongoose.Document & {
  username: string,
  email: string,
  password: string,
  passwordResetToken: string,
  passwordResetExpires: Date,
  role: number,
  active: boolean,
  lock: boolean
  profile: {
    firstName: string,
    lastName: string,
    gender: number,
    location: string,
    website: string,
    picture: string,
  },

  comparePassword: comparePasswordFunction,
  gravatar: (size: number) => string,
};

type comparePasswordFunction = (candidatePassword: string,
                                cb: (err: any, isMatch: any) =>
  any) => void;

export type AuthToken = {
  accessToken: string,
  kind: string,
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: Number,
    enum: roleNum,
    required: true,
    default: 4,
  },
  password: {
    type: String,
    required: true,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
  },
  lock: {
    type: Boolean,
    default: false,
  },
  profile: {
    firstName: String,
    lastName: String,
    gender: Number,
    location: String,
    website: String,
    picture: String,
  },
},                                     {
  timestamps: true,
});

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
// tslint:disable-next-line: no-this-assignment
  const thisRef = this;
  const user: any = thisRef;
  if (!user.isModified("password")) { return next(); }
  bcryptNodejs.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcryptNodejs.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
  bcryptNodejs.compare(candidatePassword,
                       this.password, (err: mongoose.Error, isMatch: boolean) => {
                         cb(err, isMatch);
                       });
};

userSchema.methods.comparePassword = comparePassword;

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function (size: number= 200) {
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash("md5").update(this.email).digest("hex");
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

// tslint:disable-next-line: variable-name
export const User1 = mongoose.model<UserDocument>(USER1, userSchema);
