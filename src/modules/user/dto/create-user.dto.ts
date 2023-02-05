import {IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength} from 'class-validator';
import {UserTypeEnum} from '../../../types/user-type.enum.js';

export default class CreateUserDto {
  @IsEmail({}, {message: '$property is not valid.'})
  public email!: string;

  @IsString({message: '$property must be a valid string'})
  @MinLength(1, {message: '$property must be at least $constraint1 symbol long'})
  @MaxLength(15, {message: '$property must be no longer than $constraint1 symbols'})
  public name!: string;

  @IsString({message: '$property must be a valid string'})
  @MinLength(6, {message: '$property must be at least $constraint1 symbols long'})
  @MaxLength(12, {message: '$property must be no longer than $constraint1 symbols'})
  public password!: string;

  @IsEnum(UserTypeEnum, {message: '$property must be a value from UserTypeEnum'})
  public status!: string;

  @IsOptional()
  public avatarPath?: string;
}
