import SafeUserResponse from '../user/safe-user.response';

export default class CommentResponse {
  public id!: string;

  public text!: string;

  public postedDate!: string;

  public rated!: number;

  public user!: SafeUserResponse;
}
