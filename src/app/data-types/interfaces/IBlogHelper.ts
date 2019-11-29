import { ObjectID } from "bson";
import { BlogDocument } from "../../models/blog-collection";
import { IBlogRegister, IUserProfile } from ".";

export interface IBlogHelper {
  getAllBlog(): Promise<boolean | BlogDocument[]>;
  createBlog(blog: IBlogRegister, userID: ObjectID): Promise<ObjectID | Boolean>;
  deleteBlogByAuthor(author: string): Promise<BlogDocument | boolean>;
  deleteBlogByBlogId(blogId: string): Promise<BlogDocument | boolean>;
  deleteBlogByBlogID(id: ObjectID): Promise<BlogDocument | boolean>;
  updateBlogByBlogId(blogId: string, newBlog: IBlogRegister)
        : Promise<boolean | BlogDocument>;
  update(query: object, update: object): Promise<boolean | BlogDocument>;
  deleteBlog(query: any): Promise<boolean | BlogDocument>;
  findBlogByBlogId(blogId: string): Promise<BlogDocument | boolean>;
  findBlogById(id: ObjectID): Promise<BlogDocument | boolean>;
  findBlogByAuthor(author: string): Promise<BlogDocument | boolean>;

  findBlogById(id: ObjectID): Promise<BlogDocument | boolean>;
  findBlog(query: any): Promise<BlogDocument | boolean>;
  flaggedBlog(blogId: string): Promise<boolean>;
  unFlaggedBlog(blogId: string): Promise<boolean>;
  activeBlog(blogId: string): Promise<boolean>;
  deactiveBlog(blogId: string): Promise<boolean>;
}
