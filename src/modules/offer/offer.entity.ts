import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import {OfferType} from '../../types/offer.type.js';
import {UserEntity} from '../user/user.entity.js';
import {TypeEnum} from '../../types/type.enum.js';
import {CoordinatesType} from '../../types/coordinates.type.js';

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true,
  })
  public title!: string;

  @prop({
    trim: true,
    required: true,
  })
  public description!: string;

  @prop({
    required: true,
  })
  public postedDate!: Date;

  @prop({
    required: true,
  })
  public city!: string;

  @prop({
    required: true,
  })
  public imagePreview!: string;

  @prop({
    required: true,
  })
  public images!: string[];

  @prop({
    required: true,
  })
  public premium!: boolean;

  @prop({
    required: true,
    default: false
  })
  public favorite!: boolean;

  @prop({
    required: true,
  })
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
    enum: TypeEnum
  })
  public type!: OfferType;

  @prop({
    required: true,
  })
  public rooms!: number;

  @prop({
    required: true,
  })
  public guests!: number;

  @prop({
    required: true,
  })
  public price!: number;

  @prop({
    required: true,
    default: [],
  })
  public features!: string[];

  @prop({})
  public commentQty!: number;

  @prop({
    required: true,
  })
  public coordinates!: CoordinatesType;

  @prop({
    required: true,
    ref: UserEntity,
  })
  public user!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
