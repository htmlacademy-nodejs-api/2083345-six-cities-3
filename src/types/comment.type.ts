import {UserType} from './user.type';

export type Comment = {
  text: string;
  date: Date | null;
  rating: number;
  author: UserType;
}
