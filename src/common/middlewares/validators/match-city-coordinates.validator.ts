import {COORDINATES} from '../../../const/coordinates.js';
import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import {CoordinatesType} from '../../../types/coordinates.type.js';

@ValidatorConstraint({ name: 'MatchCityCoordinates' })
export class MatchCityCoordinates implements ValidatorConstraintInterface {
  validate(coordinates: CoordinatesType, args: ValidationArguments) {
    return JSON.stringify(coordinates) === JSON.stringify(COORDINATES[(args.object as never)['city']]);
  }

  defaultMessage(args: ValidationArguments): string {
    return `Coordinates do not match the city ${(args.object as never)['city']}`;
  }
}
