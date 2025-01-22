import { Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { OrderService } from '../services/order.service';

export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
}
