import {UserType} from './user.type.js';
import {CoordinatesType} from './coordinates.type';

export type OfferType = {
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
  user: UserType;
  coordinates: CoordinatesType;
}
