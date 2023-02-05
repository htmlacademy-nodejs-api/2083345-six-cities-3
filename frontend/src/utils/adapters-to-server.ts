import {NewOffer, UserRegister} from '../types/types';
import CreateOfferDto from '../dto/offer/create-offer.dto';
import CreateCommentDto from '../dto/comment/create-comment.dto';
import CreateUserDto from '../dto/user/create-user.dto';
import {capitalizeFirstOfEveryWord} from './utils';

export const adaptOfferToServer =
  (offer: NewOffer): CreateOfferDto => ({
    title: offer.title,
    description: offer.description,
    postedDate: new Date().toISOString(),
    city: capitalizeFirstOfEveryWord(offer.city.name),
    imagePreview: offer.previewImage,
    images: offer.images,
    premium: offer.isPremium,
    rating: 2.5,
    type: capitalizeFirstOfEveryWord(offer.type),
    rooms: offer.bedrooms,
    guests: offer.maxAdults,
    price: offer.price,
    features: offer.goods.map((feature) => capitalizeFirstOfEveryWord(feature)),
    coordinates: {latitude: offer.location.latitude.toString(), longitude: offer.location.longitude.toString()},
  });

export const adaptRegisterToServer =
  (user: UserRegister): CreateUserDto => ({
    email: user.email,
    name: user.name,
    password: user.password,
    status: user.type === 'regular' ? 'Standard' : 'Premium',
  });

export const adaptNewCommentToServer =
  ({id, comment, rating}: {id: string; comment: string; rating: number}): CreateCommentDto => ({
    text: comment,
    offerId: id,
    rated: rating,
  });
