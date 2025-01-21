import { Router } from 'express';

export class BaseRouter<T> {
  public router: Router;
  public controller: T;

  constructor(TController: T) {
    this.router = Router();
    this.controller = TController;
    this.routes();
  }

  routes() {}
}
