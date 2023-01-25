import {UserType} from './user.type';

export type Comment = {
  text: string;
  postedDate: Date | null;
  rated: number;
  author: UserType;
}

export type NewComment = {
  text: string;
  rated: number;
  author: string;
}
