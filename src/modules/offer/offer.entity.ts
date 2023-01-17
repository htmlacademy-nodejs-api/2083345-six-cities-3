import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import {OfferType} from '../../types/offer.type.js';
import {UserEntity} from '../user/user.entity.js';
import {CityEnum} from '../../types/city.enum.js';
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
    minlength: 10,
    maxlength: 100,
  })
  public title!: string;

  @prop({
    trim: true,
    required: true,
    minlength: 20,
    maxlength: 1024,
  })
  public description!: string;

  @prop({
    required: true,
  })
  public postedDate!: Date;

  @prop({
    required: true,
    type: () => String,
    enum: CityEnum,
  })
  public city!: string;

  @prop({
    required: true,
  })
  public imagePreview!: string;

  @prop({
    required: true,
    /*validate: {
      validator: (list: string[]) => list.length === 6,
      message: 'An offer should always have 6 images'
    },*/
  })
  public images!: string[];

  @prop({
    required: true,
  })
  public premium!: boolean;

  @prop({
    required: true,
  })
  public favorite!: boolean;

  @prop({
    required: true,
    min: 1,
    max: 5,
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
    min: 1,
    max: 8,
  })
  public rooms!: number;

  @prop({
    required: true,
    min: 1,
    max: 10,
  })
  public guests!: number;

  @prop({
    required: true,
    min: 100,
    max: 100000,
  })
  public price!: number;

  @prop({})
  public commentQty!: number;

  @prop({
    required: true,
    /*validate: {
      validator: (coords: CoordinatesType) => coords === COORDINATES[this.city],
      message: 'Coordinates do not match the city'
    }*/
  })
  public coordinates!: CoordinatesType;

  @prop({
    required: true,
    ref: UserEntity,
  })
  public user!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
