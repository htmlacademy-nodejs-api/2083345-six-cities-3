import {City, Comment, Offer, Type, User} from '../types/types.js';
import OfferResponse from '../dto/offer/offer.response';
import OffersResponse from '../dto/offer/offers.response';
import {CityLocation, UserType} from '../const';
import SafeUserResponse from '../dto/user/safe-user.response';
import CommentResponse from '../dto/comment/comment.response';

export const adaptCityToClient = (serverCity: string): City => ({
  name: serverCity,
  location: CityLocation[serverCity],
});


export const adaptOffersToClient =
  (serverOffers: OffersResponse[]): Offer[] => serverOffers
    .map((offer: OffersResponse) => ({
      id: offer.id,
      price: offer.price,
      rating: offer.rating,
      title: offer.title,
      isPremium: offer.premium,
      isFavorite: offer.favorite,
      city: adaptCityToClient(offer.city),
      location: CityLocation[offer.city],
      previewImage: offer.imagePreview,
      type: offer.type.toLowerCase() as Type,
      bedrooms: 0,
      description: '',
      goods: [''],
      host: {name: '', type: UserType.Regular, email: '', avatarUrl: ''},
      images: [''],
      maxAdults: 0,
    })
    );

export const adaptOfferToClient =
  (offer: OfferResponse): Offer => ({
    id: offer.id,
    price: offer.price,
    rating: offer.rating,
    title: offer.title,
    isPremium: offer.premium,
    isFavorite: offer.favorite,
    city: adaptCityToClient(offer.city),
    location: CityLocation[offer.city],
    previewImage: offer.imagePreview,
    type: (offer.type as string).toLowerCase() as Type,
    bedrooms: offer.rooms,
    description: offer.description,
    goods: offer.features,
    host: adaptSafeUserToClient(offer.user),
    images: offer.images,
    maxAdults: offer.guests,
  });

export const adaptSafeUserToClient =
  (user: SafeUserResponse): User => ({
    name: user.name,
    avatarUrl: user.avatarPath,
    type: user.status === 'Standard' ? UserType.Regular : UserType.Pro,
    email: user.email,
  });

export const adaptCommentToClient =
    (comment: CommentResponse) => ({
      id: comment.id,
      comment: comment.text,
      date: comment.postedDate,
      rating: comment.rated,
      user: {...adaptSafeUserToClient(comment.user), favorites: comment.user.favorites}
    });

export const adaptCommentsToClient =
  (comments: CommentResponse[]): Comment[] => comments.map(
    (comment: CommentResponse) => ({
      id: comment.id,
      comment: comment.text,
      date: comment.postedDate,
      rating: comment.rated,
      user: {...adaptSafeUserToClient(comment.user), favorites: comment.user.favorites}
    })
  );
