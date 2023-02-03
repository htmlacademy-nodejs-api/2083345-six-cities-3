import {Expose} from 'class-transformer';
import {UserType} from '../../../types/user.type';

export default class OffersResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public postedDate!: Date;

  @Expose()
  public city!: string;

  @Expose()
  public imagePreview!: string;

  @Expose()
  public premium!: boolean;

  @Expose()
  public favorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: string;

  @Expose()
  public price!: number;

  @Expose()
  public commentQty!: UserType;
}
