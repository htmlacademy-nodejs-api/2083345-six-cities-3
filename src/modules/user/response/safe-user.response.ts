import {Expose} from 'class-transformer';

export default class SafeUserResponse {
  @Expose()
  public id!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatarPath!: string;

  @Expose()
  public name!: string;

  @Expose()
  public status!: string;
}
