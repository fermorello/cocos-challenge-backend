import { Order } from '../entities/order.entity';
import { BaseService } from '../../config/base.service';
import IRepository from '../../config/repository.interface';
import { IOrderService } from '../interfaces/order.interface';
import { CreateOrderDTO } from '../dto/createOrderDTO';

export class OrderService
  extends BaseService<Order, IRepository<Order>>
  implements IOrderService
{
  constructor(repository: IRepository<Order>) {
    super(repository);
  }
  findAll(query?: { [key: string]: unknown }): Promise<Order[] | null> {
    throw new Error('Method not implemented.');
  }

  findOne(id: Order['id']): Promise<Order | null> {
    throw new Error('Method not implemented.');
  }

  create(order: CreateOrderDTO): Promise<Order | null> {
    throw new Error('Method not implemented.');
  }
}
