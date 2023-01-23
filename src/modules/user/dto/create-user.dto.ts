export default class CreateUserDto {
  public email!: string;
  public avatarPath!: string;
  public name!: string;
  public password!: string;
  public status!: string;
  public favorites!: string[];
}
