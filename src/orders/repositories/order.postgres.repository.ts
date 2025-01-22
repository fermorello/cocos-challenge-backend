import { Order } from '../entities/order.entity';
import { PrismaClient } from '@prisma/client';
import { IOrderRepository, OrderStatus } from '../interfaces/order.interface';
import { DatabaseError } from '../../shared/errors/app.errors';

export default class OrderPostgresRepository implements IOrderRepository {
  constructor(readonly prisma: PrismaClient) {}

  async find(query?: { [key: string]: unknown }): Promise<Order[] | null> {
    return null;
  }

  async findOne(id: number): Promise<Order | null> {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          id,
        },
      });
      if (!order) return null;
      return {
        ...order,
        userId: order.userid,
        instrumentId: order.instrumentid,
      };
    } catch (e) {
      console.error(e);
      throw new DatabaseError('Error retrieving order from database');
    }
  }

  async create(newOrder: {
    userId: number;
    instrumentId: number;
    price: number;
    side: string;
    size: number;
    status: string;
    type: string;
    date: Date;
  }): Promise<Order | null> {
    try {
      const { userId, instrumentId, ...orderData } = newOrder;
      const order = await this.prisma.order.create({
        data: {
          ...orderData,
          userid: newOrder.userId,
          instrumentid: newOrder.instrumentId,
        },
      });
      return {
        ...order,
        userId: order.userid,
        instrumentId: order.instrumentid,
      };
    } catch (e) {
      console.error(e);
      throw new DatabaseError('Error creating order in database');
    }
  }

  async update(id: string, entity: Order): Promise<Order | null> {
    try {
      const { id, instrumentId, userId, ...rest } = entity;

      const orderUpdated = await this.prisma.order.update({
        where: {
          id: +id,
        },
        data: {
          ...rest,
          userid: entity.userId,
          instrumentid: entity.instrumentId,
        },
      });

      if (!orderUpdated) return null;

      return {
        ...orderUpdated,
        userId: orderUpdated.userid,
        instrumentId: orderUpdated.instrumentid,
      };
    } catch (e) {
      console.error(e);
      throw new DatabaseError('Error updating order in database');
    }
  }

  async findFilledOrdersByUserId(
    userId: Order['userId']
  ): Promise<Order[] | null> {
    try {
      const orders = await this.prisma.order.findMany({
        where: {
          userid: userId,
          status: OrderStatus.FILLED,
        },
      });
      return orders.map((o) => ({
        ...o,
        userId: o.userid,
        instrumentId: o.instrumentid,
      }));
    } catch (e) {
      console.error(e);
      throw new DatabaseError('Error retrieving orders from database');
    }
  }
}
