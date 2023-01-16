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
import {DEFAULT_OFFER_QTY, PROJECTED_FIELDS_FIND} from './offer.const.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity>[]> {
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
          }
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
        {
          $unwind: { path: '$user' }
        }
      ]).exec();
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.aggregate([
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'offerId',
          as: 'commentQty'
        }},
      {
        $set: { 'commentQty': { $size: '$commentQty'}, }
      },
      { $project: PROJECTED_FIELDS_FIND },
      { $sort: { postedDate: SortType.Down } },
      { $limit: DEFAULT_OFFER_QTY },
    ]).exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    this.offerModel.aggregate();

    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity>[] | null> {
    const isFound = await this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true});
    if (!isFound) {
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
          }},
        {
          $set: { 'commentQty': { $size: '$commentQty'}, }
        }
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

  public async findPremiumByCity(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({createdAt: SortType.Down})
      .limit(count)
      .populate(['user'])
      .exec();
  }

  public async findFavorites(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({commentQty: SortType.Down})
      .limit(count)
      .populate(['user'])
      .exec();
  }
}
