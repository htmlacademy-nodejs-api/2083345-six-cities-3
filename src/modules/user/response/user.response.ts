import {Expose} from 'class-transformer';

export default class UserResponse {
  @Expose({name: '_id'})
  public id!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatarPath!: string;

  @Expose()
  public name!: string;

  @Expose()
  public status!: string;

  @Expose()
  public favorites!: string;
}
