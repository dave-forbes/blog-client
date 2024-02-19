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
