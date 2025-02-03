import { Order } from '../entities/order.entity';
import { CreateOrderDTO } from '../dto/createOrder.dto';
import IRepository from '../../config/repository.interface';
import { CancelOrderDTO } from '../dto/cancelOrder.dto';

export interface IOrderRepository extends IRepository<Order> {
  findFilledOrdersByUserId(userId: number): Promise<Order[] | null>;
}

export interface IOrderService {
  findAll(query?: { [key: string]: unknown }):
    | Promise<Order[] | null>
    | Promise<{
        data: Order[] | null;
        pagination: { total: number; pages: number };
      }>;
  findOne: (id: Order['id']) => Promise<Order | null>;
  create: (order: CreateOrderDTO) => Promise<Order | null>;
  findFilledOrdersByUserId(userId: number): Promise<Order[] | null>;
  cancel: (order: CancelOrderDTO) => Promise<Order | null>;
}

export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
  CASH_IN = 'CASH_IN',
  CASH_OUT = 'CASH_OUT'
}

export enum OrderType {
  MARKET = 'MARKET',
  LIMIT = 'LIMIT'
}

export enum OrderStatus {
  NEW = 'NEW',
  FILLED = 'FILLED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED'
}

export const CASH_ID = 66;
export const CASH_PRICE = 1;
