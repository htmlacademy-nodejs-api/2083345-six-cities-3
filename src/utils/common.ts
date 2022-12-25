import {OfferType} from '../types/offer.type';

export const createOffer = (row: string): OfferType => {
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
    favorite,
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
    images: images.split(';'),
    premium: premium === 'true',
    favorite: favorite === 'true',
    rating: Number(rating),
    type,
    rooms: Number(rooms),
    guests: Number(guests),
    price: Number(price),
    features: features.split(';'),
    user: {
      name,
      email,
      avatarPath,
      password,
      status,
    },
  };
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
