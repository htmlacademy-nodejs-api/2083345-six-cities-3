import {ExtendedUserType, UserType} from './user.type.js';
import {CoordinatesType} from './coordinates.type.js';

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
  coordinates: CoordinatesType;
  user: UserType;
}

export type CreateOfferType = {
  title: string;
  description: string;
  postedDate: Date;
  city: string;
  imagePreview: string;
  images: string[];
  premium: boolean;
  rating: number;
  type: string;
  rooms: number;
  guests: number;
  price: number;
  features: string[];
  coordinates: CoordinatesType;
  user: ExtendedUserType;
}
