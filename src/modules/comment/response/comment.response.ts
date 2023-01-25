import {Expose, Type} from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';
import {SafeUserType} from '../../../types/user.type.js';

export default class CommentResponse {
  @Expose({name: '_id'})
  public id!: string;

  @Expose()
  public text!: string;

  @Expose({name: 'createdAt'})
  public postedDate!: string;

  @Expose()
  public rated!: number;

  @Expose({name: 'userId'})
  @Type(() => UserResponse)
  public user!: SafeUserType;
}
