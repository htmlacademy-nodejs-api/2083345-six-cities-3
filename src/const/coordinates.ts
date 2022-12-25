import {CoordinatesType} from '../types/coordinates.type';
import {CityEnum} from '../types/city.enum.js';

export const COORDINATES: {[city: string]: CoordinatesType} = {
  [CityEnum.Paris]: {latitude: '48.85661', longitude: '2.351499'},
  [CityEnum.Cologne]: {latitude: '50.938361', longitude: '6.959974'},
  [CityEnum.Brussels]: {latitude: '50.846557', longitude: '4.351697'},
  [CityEnum.Amsterdam]: {latitude: '52.370216', longitude: '4.895168'},
  [CityEnum.Hamburg]: {latitude: '53.550341', longitude: '10.000654'},
  [CityEnum.Dusseldorf]: {latitude: '51.225402', longitude: '6.776314'},
};


