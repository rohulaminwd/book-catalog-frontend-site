import { IUser } from './globalTypes';

export interface IReview {
  userId: string;
  review: string;
  rating: string[];
}

export interface IBook {
  _id: string;
  title?: string;
  author: IUser;
  publicationDate: string;
  genre: string;
  imageURL?: string;
  review: IReview[];
}
