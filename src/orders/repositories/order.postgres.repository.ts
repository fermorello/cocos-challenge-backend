import { Order } from '../entities/order.entity';
import { PrismaClient } from '@prisma/client';
import { IOrderRepository } from '../interfaces/order.interface';

export default class OrderPostgresRepository implements IOrderRepository {
  constructor(readonly prisma: PrismaClient) {}
  
  find(query?: { [key: string]: unknown }): Promise<Order[] | null> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string | number): Promise<Order | null> {
    throw new Error('Method not implemented.');
  }
  create(entity: Order | Partial<Order>): Promise<Order | null> {
    throw new Error('Method not implemented.');
  }
  update(
    id: string | number,
    entity: Order | Partial<Order>
  ): Promise<Order | null> {
    throw new Error('Method not implemented.');
  }
}
