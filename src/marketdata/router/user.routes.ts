import { Request, Response } from 'express';
import { UserServiceImp } from '../../shared/instances';
import { BaseRouter } from '../../config/base.router';
import { UserController } from '../../users/controller/user.controller';

const userController = new UserController(UserServiceImp);

export default class InstrumentRouter extends BaseRouter<UserController> {
  constructor() {
    super(userController);
  }
  routes(): void {}
}
