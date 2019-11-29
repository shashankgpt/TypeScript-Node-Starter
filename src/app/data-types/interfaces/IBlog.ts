export interface IBlogRegister {
  author: string;
  blogId: string;
  blogName: string;
  details: string;
  tags: string;
  category: string;
  blog: IBlog[];
}

export interface IBlog {
  blogHeading: string;
  details: string;
  pageNo: string;
}
