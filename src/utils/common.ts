import {CreateOfferType} from '../types/offer.type';
import crypto from 'crypto';
import {plainToInstance} from 'class-transformer';
import {ClassConstructor} from 'class-transformer/types/interfaces/class-constructor.type.js';

export const createOffer = (row: string): CreateOfferType => {
  const items = row.replace('\n', '').split('\t');
  const [
    title,
    description,
    postedDate,
    city,
    coordinates,
    imagePreview,
    images,
    premium,
    rating,
    type,
    rooms,
    guests,
    price,
    features,
    name,
    email,
    avatarPath,
    password,
    status,
    favorites
  ] = items;
  return {
    title,
    description,
    postedDate: new Date(postedDate),
    city,
    coordinates: {
      latitude: coordinates.split(';')[0],
      longitude: coordinates.split(';')[1]
    },
    imagePreview,
    images: images.split(','),
    premium: premium === 'true',
    rating: Number(rating),
    type,
    rooms: Number(rooms),
    guests: Number(guests),
    price: Number(price),
    features: features.split(','),
    user: {
      name,
      email,
      avatarPath,
      password,
      status,
      favorites: favorites.split(';')
    },
  };
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: string) => ({
  error: message,
});
