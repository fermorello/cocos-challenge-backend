import { Order } from '../entities/order.entity';
import { IOrderRepository } from '../interfaces/order.interface';

export default class OrderInMemoryRepository implements IOrderRepository {
  private orders: Order[] = [];
  constructor() {}

  findFilledOrdersByUserId(id: Order['userId']): Promise<Order[] | null> {
    const filledOrders = this.orders.filter(
      (o: Order) => o.userId === id && o.status === 'FILLED'
    );
    return Promise.resolve(filledOrders.length ? filledOrders : null);
  }

  find(query?: { [key: string]: unknown }): Promise<Order[] | null> {
    throw new Error('Method not implemented.');
  }

  findOne(id: string | number): Promise<Order | null> {
    return Promise.resolve(
      this.orders.find((order) => order.id === id) || null
    );
  }

  create(entity: Order | Partial<Order>): Promise<Order | null> {
    let newOrder: Order | null = null;

    if (!this.orders.length) {
      newOrder = { ...(entity as Omit<Order, 'id'>), id: 1 };
    } else {
      const lastOrder = this.orders[this.orders.length - 1];

      newOrder = {
        ...(entity as Omit<Order, 'id'>),
        id: +lastOrder.id + 1,
      };
    }

    this.orders.push(newOrder);

    return Promise.resolve(newOrder);
  }

  update(
    id: string | number,
    entity: Order | Partial<Order>
  ): Promise<Order | null> {
    const orderIndex = this.orders.findIndex((order) => order.id === id);

    if (orderIndex === -1) {
      return Promise.resolve(null);
    }

    this.orders[orderIndex] = { ...this.orders[orderIndex], ...entity };

    return Promise.resolve(this.orders[orderIndex]);
  }
}
