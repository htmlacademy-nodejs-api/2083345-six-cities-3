import {Expose, Type} from 'class-transformer';
import {CoordinatesType} from '../../../types/coordinates.type';
import UserResponse from '../../user/response/user.response.js';
import {SafeUserType} from '../../../types/user.type';

export default class OfferResponse {
  @Expose({name: '_id'})
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public postedDate!: Date;

  @Expose()
  public city!: string;

  @Expose()
  public imagePreview!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public premium!: boolean;

  @Expose()
  public favorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: string;

  @Expose()
  public rooms!: number;

  @Expose()
  public guests!: number;

  @Expose()
  public price!: number;

  @Expose()
  public features!: string[];

  @Expose()
  public coordinates!: CoordinatesType;

  @Expose()
  @Type(() => UserResponse)
  public user!: SafeUserType;

  @Expose()
  public commentQty!: number;
}
