import 'reflect-metadata';
import express, {Express} from 'express';
import {inject, injectable} from 'inversify';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import {Component} from '../types/component.types.js';
import {DatabaseInterface} from '../common/database-client/database.interface';
import {getURI} from '../utils/db.js';
import {ControllerInterface} from '../common/controller/controller.interface';
import {ExceptionFilterInterface} from '../common/errors/exception-filter.interface.js';
import {OfferServiceInterface} from '../modules/offer/offer-service.interface.js';
import {fillDTO} from '../utils/common.js';
import OffersResponse from '../modules/offer/response/offers.response.js';

@injectable()
export default class Application {
  private expressApp: Express;
  constructor (
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
    @inject(Component.OfferController) private offerController: ControllerInterface,
    @inject(Component.CommentController) private commentController: ControllerInterface,
    @inject(Component.UserController) private userController: ControllerInterface,
    @inject(Component.ExceptionFilterInterface) private exceptionFilter: ExceptionFilterInterface,

    @inject(Component.OfferServiceInterface) private offerService: OfferServiceInterface,
    //@inject(Component.CommentServiceInterface) private commentService: CommentServiceInterface
  ) {
    this.expressApp = express();
  }

  public initMiddleware() {
    this.expressApp.use(express.json());
  }

  public initRoutes() {
    this.expressApp.use('/offers', this.offerController.router);
    this.expressApp.use('/users', this.userController.router);
    this.expressApp.use('/comments', this.commentController.router);
  }

  public initExceptionFilters() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

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

    this.initExceptionFilters();
    this.initMiddleware();
    this.initRoutes();
    await this.databaseClient.connect(uri);

    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);


    const offers = await this.offerService.findFavorites();
    const offersResponse = fillDTO(OffersResponse, offers);
    console.log(offersResponse);
  }
}
