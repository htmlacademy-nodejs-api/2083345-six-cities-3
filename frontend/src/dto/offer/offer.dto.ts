export default class OfferDto {
  public title!: string;

  public description!: string;

  public postedDate!: Date;

  public city!: string;

  public imagePreview!: string;

  public images!: string[];

  public premium!: boolean;

  public rating!: number;

  public type!: string;

  public rooms!: number;

  public guests!: number;

  public price!: number;

  public features!: string[];

  public coordinates!: Location;

  public user!: string;
}

