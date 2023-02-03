import {MiddlewareInterface} from '../../types/middleware.interface.js';
import {NextFunction, Request, Response} from 'express';
import {UserServiceInterface} from '../../modules/user/user-service.interface.js';


export class SetFavoriteMiddleware implements MiddlewareInterface {
  constructor(
    private readonly userService: UserServiceInterface) {
  }

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!req.user) {
      return next();
    }

    const currentUser = await this.userService.findById(req.user.id);
    const favorites = currentUser?.favorites.map((item) => item.toString());

    res.on('finish', () => {
      console.log(favorites);
      console.log(res);
    });

    return next();
  }
}
