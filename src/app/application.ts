import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import {Component} from '../types/component.types.js';
import {DatabaseInterface} from '../common/database-client/database.interface';
import {getURI} from '../utils/db.js';
import {OfferServiceInterface} from '../modules/offer/offer-service.interface';


@injectable()
export default class Application {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,

    @inject(Component.OfferServiceInterface) private offerService: OfferServiceInterface) {}

  public async init() {
    this.logger.info('Application initialization…');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(uri);

    const data = await this.offerService.updateById('6969121c428d47704ecaebca',
      {
        title: 'Cheap Hotel Rooms For Everyone',
        description: 'Duis a lacus massa. Fusce viverra nisl justo, quis tristique massa varius et.',
        postedDate: new Date('2022-04-06T08:45:40.283Z'),
        city: 'Paris',
        imagePreview: 'image1.png',
        images: [
          'image10.png,image12.png,image5.png,image1.png,image4.png,image6.png'
        ],
        premium: false,
        favorite: true,
        rating: 1.1,
        type: 'Hotel',
        features: [],
        rooms: 16,
        guests: 16,
        price: 46198,
        coordinates: { latitude: '48.85661', longitude: '2.351499' },
      });
    console.log(data);
  }
}
