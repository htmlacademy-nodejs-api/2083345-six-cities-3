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
import CreateOfferDto from './dto/create-offer.dto';
import UpdateOfferDto from './dto/update-offer.dto';

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
      //@inject(Component.ConfigInterface) private readonly configService: ConfigInterface,
  ) {
    super(logger);
    this.logger.info('Registering routes for OfferController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.find});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.findById});
    this.addRoute({path: '/:offerId', method: HttpMethod.Post, handler: this.updateById});
    this.addRoute({path: '/:offerId', method: HttpMethod.Delete, handler: this.deleteById});
    this.addRoute({path: '/premium/:city', method: HttpMethod.Get, handler: this.findPremiumByCity});

    this.addRoute({path: '/favorite', method: HttpMethod.Get, handler: this.findFavorite}); // WIP - пока не работает
    this.addRoute({path: '/favorite/:offerId', method: HttpMethod.Post, handler: this.addFavorite});
    this.addRoute({path: '/favorite/:offerId', method: HttpMethod.Delete, handler: this.removeFavorite});
  }

  public async find(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
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
    const offer = await this.offerService.findById(req.params.offerId);
    const offerResponse = fillDTO(OfferResponse, offer);
    this.send(res, StatusCodes.OK, offerResponse);
  }

  public async updateById({params, body}: Request<Record<string, unknown>, Record<string, unknown>, UpdateOfferDto>,
    res: Response): Promise<void> {
    const result = await this.offerService.updateById(params.offerId as string, body);
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(OfferResponse, result)
    );
  }

  public async deleteById(req: Request, res: Response): Promise<void> {
    await this.offerService.deleteById(req.params.offerId as string);
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
