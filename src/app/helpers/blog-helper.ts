import { Blog, BlogDocument } from "../models/blog-collection";
import { IBlogHelper, IBlogRegister, IBlog } from "../data-types/interfaces";
import { ObjectID } from "bson";
import { WriteError } from "mongodb";
import promiseErrorHandler from "../middlewares/promise.error-handler";

export class BlogHelper implements IBlogHelper {
  deleteBlogByAuthor(author: string): Promise<boolean | BlogDocument> {
    return new Promise<boolean | BlogDocument>(async (resolve, reject) => {
      const query = { author };
      const blogDoc = await promiseErrorHandler<boolean, BlogDocument>(this.deleteBlog(query));
      return resolve(blogDoc);
    });
  }
  deleteBlogByBlogId(blogId: string): Promise<boolean | BlogDocument> {
    return new Promise<boolean | BlogDocument>(async (resolve, reject) => {
      const query = { blogId };
      const blogDoc = await promiseErrorHandler<boolean, BlogDocument>(this.deleteBlog(query));
      return resolve(blogDoc);
    });
  }
  findBlogByBlogId(blogId: string): Promise<boolean | BlogDocument> {
    return new Promise<boolean | BlogDocument>(async (resolve, reject) => {
      const query = { blogId };
      const blogDoc = await promiseErrorHandler<boolean, BlogDocument>(this.findBlog(query));
      return resolve(blogDoc);
    });
  }
  getAllBlog(): Promise<boolean | BlogDocument[]> {
    return new Promise<boolean | BlogDocument[]>((resolve, reject) => {
      Blog.find({}, (err, existingBlog) => {
        if (err) { return reject(err); }
        if (existingBlog) {
          resolve(existingBlog);
        }
        resolve(false);
      });
    });
  }
  deactiveBlog(blogId: string): Promise<boolean> {
    return new Promise<boolean | boolean>(async (resolve, reject) => {
      const query = { blogId };
      const update = {
        active: false,
      };
      const blogDoc = await promiseErrorHandler<boolean, BlogDocument>(this.update(query, update));
      const val = blogDoc ? true : false;
      return resolve(val);
    });
  }
  activeBlog(blogId: string): Promise<boolean> {
    return new Promise<boolean | boolean>(async (resolve, reject) => {
      const query = { blogId };
      const update = {
        active: true,
      };
      const blogDoc = await promiseErrorHandler<boolean, BlogDocument>(this.update(query, update));
      const val = blogDoc ? true : false;
      return resolve(val);
    });
  }
  flaggedBlog(blogId: string): Promise<boolean> {
    return new Promise<boolean | boolean>(async (resolve, reject) => {
      const query = { blogId };
      const update = {
        flagged: true,
      };
      const blogDoc = await promiseErrorHandler<boolean, BlogDocument>(this.update(query, update));
      const val = blogDoc ? true : false;
      return resolve(val);
    });
  }
  unFlaggedBlog(blogId: string): Promise<boolean> {
    return new Promise<boolean | boolean>(async (resolve, reject) => {
      const query = { blogId };
      const update = {
        flagged: false,
      };
      const blogDoc = await promiseErrorHandler<boolean, BlogDocument>(this.update(query, update));
      const val = blogDoc ? true : false;
      return resolve(val);
    });
  }
  createBlog(blogMain: IBlogRegister, userID: ObjectID): Promise<ObjectID | boolean> {
    return new Promise<ObjectID | boolean>((resolve, reject) => {
      const blogModel = new Blog({
        author: blogMain.author,
        blogId: blogMain.blogId,
        blogName: blogMain.blogName,
        blog:  blogMain.blog,
        tags: blogMain.details,
        category: blogMain.category,
        user: userID,
      });
      blogModel.save((err) => {
        if (err) { return reject(err); }
        resolve(blogModel._id);
      });
    });
  }
  deleteBlogByBlogID(blogId: ObjectID): Promise<BlogDocument | boolean> {
    return new Promise<boolean | BlogDocument>(async (resolve, reject) => {
      const query = { blogId };
      const blogDoc = await promiseErrorHandler<boolean, BlogDocument>(this.deleteBlog(query));
      return resolve(blogDoc);
    });
  }
  updateBlogByBlogId(blogId: string, newBlog: IBlogRegister)
  : Promise<boolean | BlogDocument> {
    return new Promise<boolean | BlogDocument>(async (resolve, reject) => {
      const query = { blogId };
      const update = {
        blog: newBlog.blog,
        author: newBlog.author,
        category: newBlog.category,
        tags: newBlog.tags,
      };
      const blogDoc = await promiseErrorHandler<boolean, BlogDocument>(this.update(query, update));
      return resolve(blogDoc);
    });
  }
  update(query: object , update: object): Promise<boolean | BlogDocument> {
    return new Promise<boolean | BlogDocument>((resolve, reject) => {
      Blog.findOneAndUpdate(query, { $set: update }, { new: true }, (err, newBlog) => {
        if (err) { return reject(err); }
        if (newBlog) {
          resolve(newBlog);
        }
        resolve(false);
      });
    });
  }
  deleteBlog(query: any): Promise<boolean | BlogDocument> {
    return new Promise<boolean | BlogDocument>((resolve, reject) => {
      Blog.findOneAndRemove(query, (err, existingBlog) => {
        if (err) { return reject(err); }
        if (existingBlog) {
          resolve(existingBlog);
        }
        resolve(false);
      });
    });
  }
  async findBlogByAuthor(author: string): Promise<BlogDocument[] | boolean > {
    return new Promise<boolean | BlogDocument[]>(async (resolve, reject) => {
      const query = { author };
      const blogDoc = await promiseErrorHandler<boolean, BlogDocument[]>(this.findAllBlog(query));
      return resolve(blogDoc);
    });
  }
  async findBlogById(id: ObjectID): Promise< BlogDocument | boolean > {
    return new Promise<boolean | BlogDocument>(async (resolve, reject) => {
      const query = { _id : id };
      const blogDoc = await promiseErrorHandler<boolean, BlogDocument>(this.findBlog(query));
      return resolve(blogDoc);
    });
  }

  async checkBlogName(id: string, name: string): Promise< BlogDocument | boolean > {
    return new Promise<boolean | BlogDocument>(async (resolve, reject) => {
      const query = { blogId : id };
      const query1 = { blogName : name };
      const blogDoc = await promiseErrorHandler<boolean, BlogDocument>(this.findBlog(query));
      const blogDoc1 = await promiseErrorHandler<boolean, BlogDocument>(this.findBlog(query1));
      if (blogDoc || blogDoc1) {
        return resolve(false);
      }
      resolve(true);
    });
  }
  async findBlog(query: any): Promise < boolean | BlogDocument > {
    return new Promise<boolean | BlogDocument>((resolve, reject) => {
      Blog.findOne(query, (err, existingBlog) => {
        if (err) { return reject(err); }
        if (existingBlog) {
          resolve(existingBlog);
        }
        resolve(false);
      });
    });
  }
  async findAllBlog(query: any): Promise < boolean | BlogDocument[] > {
    return new Promise<boolean | BlogDocument[]>((resolve, reject) => {
      Blog.find(query, (err, existingBlog) => {
        if (err) { return reject(err); }
        if (existingBlog) {
          resolve(existingBlog);
        }
        resolve(false);
      });
    });
  }
}
