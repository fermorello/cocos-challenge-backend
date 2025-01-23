import { Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { OrderService } from '../services/order.service';
import { CreateOrderDTO } from '../dto/createOrder.dto';

export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  async putNewOrder(req: Request, res: Response) {
    const newOrder: CreateOrderDTO = req.body;

    console.log('newOrder', newOrder);

    if (!newOrder) {
      return this.httpResponse.NoContent(res);
    }

    try {
      const orderCreated = await this.orderService.create(newOrder);
      return this.httpResponse.Ok(res, orderCreated);
    } catch (e: unknown) {
      console.error(e);
      return this.httpResponse.ERROR(res, e);
    }
  }
}
