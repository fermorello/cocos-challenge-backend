import { Order } from '../entities/order.entity';
import { CreateOrderDTO } from '../dto/createOrderDTO';
import IRepository from '../../config/repository.interface';

export interface IOrderRepository extends IRepository<Order> {}

export interface IOrderService {
  findAll(query?: { [key: string]: unknown }):
    | Promise<Order[] | null>
    | Promise<{
        data: Order[] | null;
        pagination: { total: number; pages: number };
      }>;
  findOne: (id: Order['id']) => Promise<Order | null>;
  create: (order: CreateOrderDTO) => Promise<Order | null>;
}
