import {inject, injectable} from 'inversify';
import {OfferServiceInterface} from './offer-service.interface.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import {SortType} from '../../types/sort-type.enum.js';
import mongoose from 'mongoose';
import {DEFAULT_OFFER_QTY, DEFAULT_PREMIUM_OFFER_QTY, PROJECTED_FIELDS_FIND} from './offer.const.js';
import {CommentServiceInterface} from '../comment/comment-service.interface.js';
import {UserServiceInterface} from '../user/user-service.interface.js';
import {UserEntity} from '../user/user.entity';


@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${result.title}, ${result._id}`);
    result.user = await this.userService.findById(dto.user) as UserEntity;
    return result;
  }

  public async findById(offerId: string, userId: string | undefined): Promise<DocumentType<OfferEntity>[]> {
    const result = await this.offerModel
      .aggregate([
        {
          $match: { '_id': new mongoose.Types.ObjectId(offerId) },
        },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerId',
            as: 'commentQty'
          }
        },
        {
          $addFields: {
            rating: {
              $avg: {
                $map: {
                  input: '$commentQty',
                  in: '$$this.rated'
                }
              }
            }
          }
        },
        {
          $set: { 'commentQty': { $size: '$commentQty'} }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $unwind: { path: '$user' }
        },
        { $addFields: { id: {$toString: '$_id' } } }
      ]).exec();
    return await this.setFavorite(result[0], userId) as DocumentType<OfferEntity>[];
  }

  public async find(userId: string | undefined, limit?: number | null): Promise<DocumentType<OfferEntity>[]> {
    const qty = limit ?? DEFAULT_OFFER_QTY;
    const result = await this.offerModel.aggregate([
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'offerId',
          as: 'commentQty'
        }
      },
      {
        $set: { 'commentQty': { $size: '$commentQty'}, }
      },
      { $project: PROJECTED_FIELDS_FIND },
      { $sort: { postedDate: SortType.Down } },
      { $limit: qty },
      { $addFields: { id: {$toString: '$_id' } } }
    ]).exec();
    return await this.setFavorite(result, userId) as DocumentType<OfferEntity>[];
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    await this.commentService.deleteByOfferId(offerId);

    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity>[] | null> {
    const documentExists = await this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true});
    if (!documentExists) {
      return null;
    }
    return this.offerModel
      .aggregate([
        {
          $match: { '_id': new mongoose.Types.ObjectId(offerId) },
        },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerId',
            as: 'commentQty'
          },
        },
        {
          $set: { 'commentQty': { $size: '$commentQty'}, }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
          }
        },
        { $addFields: { id: {$toString: '$_id' } } }
      ]).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  public async incCommentQty(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentQty: 1,
      }}).exec();
  }

  public async findPremiumByCity(city: string, userId: string | undefined): Promise<DocumentType<OfferEntity>[]> {
    const result = await this.offerModel
      .find({city: city, premium: true})
      .select(PROJECTED_FIELDS_FIND)
      .sort({createdAt: SortType.Down})
      .limit(DEFAULT_PREMIUM_OFFER_QTY)
      .exec();
    return await this.setFavorite(result, userId) as DocumentType<OfferEntity>[];
  }

  public async findFavorites(userId: string): Promise<DocumentType<OfferEntity>[] | null> {
    const user = await this.userService.findById(userId);

    if (!user) {
      return null;
    }

    return this.offerModel
      .aggregate([
        {
          $match: {
            _id: {
              $in: user.favorites.map((id) => new mongoose.Types.ObjectId(id))
            }
          }
        },
        { $project: PROJECTED_FIELDS_FIND },
        { $addFields: { id: {$toString: '$_id' } } }
      ]).exec();
  }

  public async addFavorite(userId: string, offerId: string): Promise<DocumentType<OfferEntity>[] | null> {
    await this.userService.addToFavoritesById(userId, offerId);
    return this.findById(offerId, userId);
  }

  public async removeFavorite(userId: string, offerId: string): Promise<DocumentType<OfferEntity>[] | null> {
    await this.userService.removeFromFavoritesById(userId, offerId);
    return this.findById(offerId, userId);

  }

  public async setFavorite(
    data: DocumentType<OfferEntity>[] | DocumentType<OfferEntity>,
    userId: string | unknown,
  ): Promise<DocumentType<OfferEntity>[] | DocumentType<OfferEntity>> {

    if (!userId) {
      return data;
    }

    const currentUser = await this.userService.findById(userId as string);
    if (!currentUser) {
      return data;
    }

    const favorites = currentUser?.favorites.map((item) => item.toString()) as string[];
    if (Array.isArray(data)) {
      data.map((obj) => {
        obj.favorite = favorites.includes(obj._id.toString());
      });
      return data;
    }

    data.favorite = favorites.includes(data._id.toString());
    return data;
  }
}
