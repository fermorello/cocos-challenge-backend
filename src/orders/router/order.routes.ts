import { Request, Response } from 'express';
import { BaseRouter } from '../../config/base.router';
import { OrderController } from '../controller/order.controller';
import { validateSchema } from '../../shared/middleware/validate.middleware';
import { OrderServiceImp } from '../../shared/instances';
import { createOrderSchema } from '../dto/createOrder.dto';

const OrderControllerImp = new OrderController(OrderServiceImp);

export default class OrderRouter extends BaseRouter<OrderController> {
  constructor() {
    super(OrderControllerImp);
  }
  routes(): void {
    this.router.post(
      '/orders',
      validateSchema(createOrderSchema) as any,
      (req: Request, res: Response): any =>
        this.controller.putNewOrder(req, res)
    );
  }
}
