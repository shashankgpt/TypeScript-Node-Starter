import bcryptNodejs from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { USER1, BLOG } from "../../config/util/collection-name";
import { ObjectId } from "mongodb";
import { User1 } from "./user-collection";
import { token } from "morgan";
import { IBlog } from "../data-types/interfaces";
const EXPIRATION = 30; // in days
const LEN = 32;

export type BlogDocument = mongoose.Document & {
  author: string, // Username
  blogId: string,
  blogName: string,
  blog: IBlog[],
  tags: string,
  category: string,
  active: boolean,
  user: ObjectId,
  flagged: boolean,
};
const blogSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: USER1,
    required: true,
  },
  blogId: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  blogName: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  blog: [{
    blogHeading: {
      type: String,
      required: true,
    },
    details: {
      type: String,
    },
    pageNo: {
      type: Number,
      default: 1,
    },
  }],
  author: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
  },
  category: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  flagged: {
    type: Boolean,
    default: false,
  },
},                                     {
  timestamps: true,
});

// tslint:disable-next-line: variable-name
export const Blog = mongoose.model<BlogDocument>(BLOG, blogSchema);
