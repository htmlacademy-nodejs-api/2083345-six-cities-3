import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import {OfferServiceInterface} from './offer-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import {fillDTO} from '../../utils/common.js';
import OfferResponse from './response/offer.response.js';
import OffersResponse from './response/offers.response.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import HttpError from '../../common/errors/http-error.js';
import {ValidateObjectIdMiddleware} from '../../common/middlewares/validate-objectid.js';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto.middleware.js';
import {DocumentExistsMiddleware} from '../../common/middlewares/document-exists.middleware.js';

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);
    this.logger.info('Registering routes for OfferController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.find});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDto)]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.findById,
      middlewares: [new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]});
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.updateById,
      middlewares: [new ValidateObjectIdMiddleware('offerId'), new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]});
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.deleteById,
      middlewares: [new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]});
    this.addRoute({path: '/premium/:city', method: HttpMethod.Get, handler: this.findPremiumByCity});
    this.addRoute({path: '/favorite', method: HttpMethod.Get, handler: this.findFavorite}); // WIP - пока не работает
    this.addRoute({
      path: '/favorite/:offerId',
      method: HttpMethod.Post,
      handler: this.addFavorite,
      middlewares: [new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]});
    this.addRoute({
      path: '/favorite/:offerId',
      method: HttpMethod.Delete,
      handler: this.removeFavorite,
      middlewares: [new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]});
  }

  public async find(req: Request, res: Response): Promise<void> {
    const limit = isNaN(Number(req.query.limit)) ? null : Number(req.query.limit);
    const offers = await this.offerService.find(limit);
    const offersResponse = fillDTO(OffersResponse, offers);
    this.send(res, StatusCodes.OK, offersResponse);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response): Promise<void> {

    const result = await this.offerService.create(body);
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(OfferResponse, result)
    );
  }

  public async findById(req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findById(req.params.offerId);
    if (offers?.length === 0) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${req.params.offerId} not found.`,
        'OfferController'
      );
    }
    const offerResponse = fillDTO(OfferResponse, offers);
    this.ok(res, offerResponse);


  }

  public async updateById({params, body}: Request<Record<string, unknown>, Record<string, unknown>, UpdateOfferDto>,
    res: Response): Promise<void> {
    const result = await this.offerService.updateById(params.offerId as string, body);
    if (!result) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }
    this.send(
      res,
      StatusCodes.OK,
      fillDTO(OfferResponse, result)
    );
  }

  public async deleteById(req: Request, res: Response): Promise<void> {
    const offer = await this.offerService.deleteById(req.params.offerId as string);
    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${req.params.offerId} not found.`,
        'OfferController'
      );
    }
    this.send(res, StatusCodes.OK);
  }

  public async findPremiumByCity(req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findPremiumByCity(req.params.city);
    const offersResponse = fillDTO(OffersResponse, offers);
    this.send(res, StatusCodes.OK, offersResponse);
  }

  public async findFavorite(_req: Request, res: Response): Promise<void> { // WIP
    const offers = await this.offerService.findFavorites();
    const offersResponse = fillDTO(OffersResponse, offers);
    this.send(res, StatusCodes.OK, offersResponse);
  }

  public async addFavorite(req: Request, res: Response): Promise<void> { // WIP
    const offer = await this.offerService.addFavorite(req.params.offerId);
    const offerResponse = fillDTO(OfferResponse, offer);
    this.send(res, StatusCodes.OK, offerResponse);
  }

  public async removeFavorite(req: Request, res: Response): Promise<void> { // WIP
    const offer = await this.offerService.removeFavorite(req.params.offerId);
    const offerResponse = fillDTO(OfferResponse, offer);
    this.send(res, StatusCodes.OK, offerResponse);
  }
}
