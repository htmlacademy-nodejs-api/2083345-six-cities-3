import {MockDataType} from '../types/mock-data.type';
import {getRandomInteger, getRandomFloat, getRandomItem, getRandomSample} from '../utils/random.js';
import {OfferGeneratorInterface} from '../types/offer-generator.interface';
import {COORDINATES} from '../const/coordinates.js';
import {UserType} from '../types/user.type';

const IMAGES_QTY = 6;
const RATING_RANGE = [1, 5];
const RATING_FRAC_DIGITS = 1;
const ROOMS_QTY_RANGE = [1, 8];
const GUESTS_QTY_RANGE = [1, 10];
const PRICE_RANGE = [100, 100000];


export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockDataType) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postedDate = getRandomItem<string>(this.mockData.postedDates);
    const city = getRandomItem<string>(this.mockData.cities);
    const coordinates = `${COORDINATES[city].latitude};${COORDINATES[city].longitude}`;
    const imagePreview = getRandomItem<string>(this.mockData.imagePreviews);
    const images = getRandomSample<string>(this.mockData.imagesSelection, IMAGES_QTY);
    const premium = getRandomItem<string>(['true', 'false']);
    const favorite = getRandomItem<string>(['true', 'false']);
    const rating = getRandomFloat(RATING_RANGE[0], RATING_RANGE[1]).toFixed(RATING_FRAC_DIGITS).toString();
    const type = getRandomItem<string>(this.mockData.types);
    const rooms = getRandomInteger(ROOMS_QTY_RANGE[0], ROOMS_QTY_RANGE[1]);
    const guests = getRandomInteger(GUESTS_QTY_RANGE[0], GUESTS_QTY_RANGE[1]);
    const price = getRandomInteger(PRICE_RANGE[0], PRICE_RANGE[1]);
    const features = getRandomSample<string>(this.mockData.featuresSelection, getRandomInteger(0, this.mockData.featuresSelection.length - 1));
    const name = getRandomItem<UserType>(this.mockData.users).name;
    const email = getRandomItem<UserType>(this.mockData.users).email;
    const avatarPath = getRandomItem<UserType>(this.mockData.users).avatarPath;
    const password = getRandomItem<UserType>(this.mockData.users).password;
    const status = getRandomItem<UserType>(this.mockData.users).status;

    return [
      title,
      description,
      postedDate,
      city,
      coordinates,
      imagePreview,
      images,
      premium,
      favorite,
      rating,
      type,
      rooms,
      guests,
      price,
      features,
      name,
      email,
      avatarPath,
      password,
      status,
    ]
      .join('\t');
  }
}
