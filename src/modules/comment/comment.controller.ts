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
import CreateCommentDto from './dto/create-comment.dto';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
  ) {
    super(logger);
    this.logger.info('Registering routes for CommentController…');

    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.findByOfferId});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async findByOfferId(req: Request, res: Response): Promise<void> { // WIP
    const comments = await this.commentService.findByOfferId(req.params.offerId);
    this.send(res, StatusCodes.OK, comments);
    const commentResponse = fillDTO(CommentResponse, comments);
    this.send(res, StatusCodes.OK, commentResponse);
  }

  public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateCommentDto>, // WIP
    res: Response): Promise<void> {

    const result = await this.commentService.create(body);
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(CommentResponse, result)
    );
  }
}
