import {Expose} from 'class-transformer';

export default class UploadImagePreviewResponse {
  @Expose()
  public imagePreview!: string;
}
