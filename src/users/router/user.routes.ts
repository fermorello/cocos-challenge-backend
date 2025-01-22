import { Request, Response } from 'express';
import { UserController } from '../controller/user.controller';
import { BaseRouter } from '../../config/base.router';
import { PortfolioServiceImp, UserServiceImp } from '../../shared/instances';

const UserControllerImp = new UserController(
  UserServiceImp,
  PortfolioServiceImp,
);

export default class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserControllerImp);
  }
  routes(): void {
    this.router.get('/users/portfolio', (req: Request, res: Response): any =>
      this.controller.getPortfolio(req, res)
    );
  }
}
