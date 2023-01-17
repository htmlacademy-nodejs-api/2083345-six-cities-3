import {UserType} from './user.type';

export type Comment = {
  text: string;
  date: Date | null;
  rated: number;
  author: UserType;
}
