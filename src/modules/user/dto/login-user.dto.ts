import {IsEmail, IsString, MaxLength, MinLength} from 'class-validator';

export default class LoginUserDto {
  @IsEmail({}, {message: '$property is not valid.'})
  public email!: string;

  @IsString({message: '$property must be a valid string'})
  @MinLength(6, {message: '$property must be at least $constraint1 symbols long'})
  @MaxLength(12, {message: '$property must be no longer than $constraint1 symbols'})
  public password!: string;
}
