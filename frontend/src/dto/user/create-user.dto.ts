export default class CreateUserDto {
  public email!: string;
  public name!: string;
  public password!: string;
  public status!: string;
  public avatarPath?: string;
}
