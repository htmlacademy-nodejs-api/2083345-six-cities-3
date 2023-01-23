import {Expose} from 'class-transformer';

export default class CommentResponse {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;
}
