import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import {CommentEntity} from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import {DocumentExistsInterface} from '../../types/document-exists.interface';

export interface CommentServiceInterface extends DocumentExistsInterface {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId(offerId: string): Promise<number | null>;
}
