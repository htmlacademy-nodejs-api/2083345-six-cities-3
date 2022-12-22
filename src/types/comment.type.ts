import {User} from './user.type';

export type Comment = {
  text: string;
  date: Date | null;
  rating: number;
  author: User;
}
