import {CoordinatesType} from '../../../types/coordinates.type.js';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum, IsInt, IsNumber, IsOptional, IsString, Max,
  MaxLength, Min,
  MinLength, Validate
} from 'class-validator';
import {CityEnum} from '../../../types/city.enum.js';
import {TypeEnum} from '../../../types/type.enum.js';
import {FeatureEnum} from '../../../types/feature.enum.js';
import {MatchCityCoordinates} from '../../../common/middlewares/validators/match-city-coordinates.validator.js';
import {ValidImageFormat} from '../../../common/middlewares/validators/valid-image-format.validator.js';

export default class CreateOfferDto {
  @IsOptional()
  @IsString({message: '$property must be a string'})
  @MinLength(10, {message: 'Minimum $property length must be $constraint1'})
  @MaxLength(100, {message: 'Maximum $property length must be $constraint1'})
  public title?: string;

  @IsOptional()
  @IsString({message: '$property must be a string'})
  @MinLength(20, {message: 'Minimum $property length must be $constraint1'})
  @MaxLength(1024, {message: 'Maximum $property length must be $constraint1'})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: '$property must be a valid ISO date'})
  public postedDate?: Date;

  @IsOptional()
  @IsEnum(CityEnum, {message: '$property should be a value from CityEnum'})
  public city?: string;

  @IsOptional()
  @IsString({message: '$property must be a string'})
  @Validate(ValidImageFormat)
  public imagePreview?: string;

  @IsOptional()
  @IsArray({message: '$property must be an array'})
  @ArrayMinSize(6, {message: '$property must contain exactly $constraint1 items'})
  @ArrayMaxSize(6, {message: '$property must contain exactly $constraint1 items'})
  @IsString({message: '$property must be a string', each: true})
  @Validate(ValidImageFormat, {each: true})
  public images?: string[];

  @IsOptional()
  @IsBoolean({message: '$property must be a boolean'})
  public premium?: boolean;

  @IsOptional()
  @IsNumber({maxDecimalPlaces: 1}, {message: 'Only 1 digit precision to the right of decimal point is allowed'})
  @Min(1, {message: '$property must be a numerical value no less than $constraint1'})
  @Max(5, {message: '$property must be a numerical value no more than $constraint1'})
  public rating?: number;

  @IsOptional()
  @IsEnum(TypeEnum, {message: '$property should be a value from TypeEnum'})
  public type?: string;

  @IsOptional()
  @IsInt({message: '$property must be an integer'})
  @Min(1, {message: '$property must be an integer value no less than $constraint1'})
  @Max(8, {message: '$property must be an integer value no more than $constraint1'})
  public rooms?: number;

  @IsOptional()
  @IsInt({message: '$property must be an integer'})
  @Min(1, {message: '$property must be an integer value no less than $constraint1'})
  @Max(10, {message: '$property must be an integer value no more than $constraint1'})
  public guests?: number;

  @IsOptional()
  @IsInt({message: '$property must be an integer'})
  @Min(100, {message: '$property must be an integer value no less than $constraint1'})
  @Max(100000, {message: '$property must be an integer value no more than $constraint1'})
  public price?: number;

  @IsOptional()
  @IsArray({message: '$property must be an array'})
  @IsEnum(FeatureEnum, {message: '$property should be a value from FeatureEnum', each: true})
  public features?: string[];

  @IsOptional()
  @Validate(MatchCityCoordinates)
  public coordinates?: CoordinatesType;
}
