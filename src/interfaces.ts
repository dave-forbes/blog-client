export interface PostI {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  published: boolean;
  text: string;
  title: string;
  user: UserI;
  __v: number;
  img1: string;
}

export interface FeaturedPostI {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  published: boolean;
  text: string;
  title: string;
  user: UserI;
  __v: number;
  img1: string;
}

export interface UserI {
  _id: string;
  username: string;
  password: string;
  author: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface CommentI {
  text: string;
  user: UserI;
  post: PostI;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

export interface ExpressValidatorErrorI {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: string;
}
