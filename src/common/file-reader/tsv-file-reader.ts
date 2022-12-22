import {readFileSync} from 'fs';
import {Offer} from '../../types/offer.type.js';
import {FileReaderInterface} from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([
        title, description, postedDate, city, imagePreview,
        images, premium, favorite, rating, type,
        rooms, guests, price, features,
        name, email, avatarPath, password, status,
        coordinates,
      ]) => ({
        title,
        description,
        postedDate: new Date(postedDate),
        city,
        imagePreview,
        images: images.split(';'),
        premium: premium === 'true',
        favorite: favorite === 'true',
        rating: Number(rating),
        type,
        rooms: Number(rooms),
        guests: Number(guests),
        price: Number(price),
        features: features.split(';'),
        user: {
          name,
          email,
          avatarPath,
          password,
          status,
        },
        coordinates: {
          latitude: coordinates.split(';')[0],
          longitude: coordinates.split(';')[1]
        }
      } as Offer));
  }
}
