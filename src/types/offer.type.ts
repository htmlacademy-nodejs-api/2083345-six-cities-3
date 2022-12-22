import {User} from './user.type.js';
import {Coordinates} from './coordinates.type';

export type Offer = {
  title: string;
  description: string;
  postedDate: Date;
  city: string;
  imagePreview: string;
  images: string[];
  premium: boolean;
  favorite: boolean;
  rating: number;
  type: string;
  rooms: number;
  guests: number;
  price: number;
  features: string[];
  user: User;
  coordinates: Coordinates;
}
