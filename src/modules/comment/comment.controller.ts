import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {CommentServiceInterface} from './comment-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import CommentResponse from './response/comment.response.js';
import {fillDTO} from '../../utils/common.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import HttpError from '../../common/errors/http-error.js';
import {OfferServiceInterface} from '../offer/offer-service.interface.js';
import {ValidateObjectIdMiddleware} from '../../common/middlewares/validate-objectid.middleware.js';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto.middleware.js';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-route.middleware.js';
import {ConfigInterface} from '../../common/config/config.interface.js';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger, configService);
    this.logger.info('Registering routes for CommentController…');

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.findByOfferId,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
      ]
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto)
      ]
    });
  }

  public async findByOfferId(req: Request, res: Response): Promise<void> { // WIP
    if (!await this.offerService.exists(req.params.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${req.params.offerId} not found.`,
        'OfferController'
      );
    }

    const comments = await this.commentService.findByOfferId(req.params.offerId);
    this.ok(res, fillDTO(CommentResponse, comments));
  }

  public async create(req: Request<Record<string, unknown>, Record<string, unknown>, CreateCommentDto>,
    res: Response): Promise<void> {

    if (!await this.offerService.exists(req.body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${req.body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create({...req.body, userId: req.user.id});
    await this.offerService.incCommentQty(req.body.offerId);
    this.created(res, fillDTO(CommentResponse, comment));
  }
}
