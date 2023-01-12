import {CoordinatesType} from '../../../types/coordinates.type';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public postedDate!: Date;
  public city!: string;
  public imagePreview!: string;
  public images!: string[];
  public premium!: boolean;
  public favorite!: boolean;
  public rating!: number;
  public type!: string;
  public rooms!: number;
  public guests!: number;
  public price!: number;
  public features!: string[];
  public coordinates!: CoordinatesType;
  public user!: string;
}
