import {DocumentType} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import {DocumentExistsInterface} from '../../types/document-exists.interface.js';

export interface OfferServiceInterface extends DocumentExistsInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string, userId: string | undefined): Promise<DocumentType<OfferEntity>[]>;
  find(userId: string | undefined, limit?: number | null): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity>[] | null>;
  incCommentQty(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremiumByCity(city: string, userId: string | undefined): Promise<DocumentType<OfferEntity>[]>;
  findFavorites(userId: string): Promise<DocumentType<OfferEntity>[] | null>;
  addFavorite(userId: string, offerId: string): Promise<DocumentType<OfferEntity>[] | null>;
  removeFavorite(userId: string, offerId: string): Promise<DocumentType<OfferEntity>[] | null>;
  exists(documentId: string): Promise<boolean>;
  setFavorite(data: DocumentType<OfferEntity>[] | DocumentType<OfferEntity>, userId: unknown): Promise<DocumentType<OfferEntity>[] | DocumentType<OfferEntity>>;
}
