import { Order } from '../entities/order.entity';
import { BaseService } from '../../config/base.service';
import IRepository from '../../config/repository.interface';
import { IOrderRepository, IOrderService } from '../interfaces/order.interface';
import { CreateOrderDTO } from '../dto/createOrder.dto';

export class OrderService
  extends BaseService<Order, IOrderRepository>
  implements IOrderService
{
  constructor(repository: IOrderRepository) {
    super(repository);
  }
  findAll(query?: { [key: string]: unknown }): Promise<Order[] | null> {
    throw new Error('Method not implemented.');
  }

  findOne(id: Order['id']): Promise<Order | null> {
    throw new Error('Method not implemented.');
  }

  create(createOrderDto: CreateOrderDTO): Promise<Order | null> {
    //TODO:

    //Add ZOD for DTO validation

    // Validate business rules

    // Get Marketdata price for the instrument

    // Validate User has enough cash to buy the instrument or has enough quantity to sell

    return createOrderDto;
  }

  findFilledOrdersByUserId(userId: number): Promise<Order[] | null> {
    return this.repository.findFilledOrdersByUserId(userId);
  }
}
