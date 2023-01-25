import {IsInt, IsMongoId, IsString, Max, MaxLength, Min, MinLength} from 'class-validator';

export default class CreateCommentDto {
  @IsString({message: '$property must be a string'})
  @MinLength(5, {message: 'Minimum $property length is $constraint1 symbols'})
  @MaxLength(5, {message: 'Maximum $property length is $constraint1 symbols'})
  public text!: string;

  @IsMongoId({message: '$property field must contain a valid id'})
  public offerId!: string;

  @IsMongoId({message: '$property field must contain a valid id'})
  public userId!: string;

  @IsInt({message: '$property must be an integer'})
  @Min(1, {message: '$property must be an integer value no less than $constraint1'})
  @Max(5, {message: '$property must be an integer value no more than $constraint1'})
  public rated!: number;
}
