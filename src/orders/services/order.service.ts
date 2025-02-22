import { Order } from '../entities/order.entity';
import { BaseService } from '../../config/base.service';
import { CreateOrderDTO } from '../dto/createOrder.dto';
import { PortfolioService } from '../../portfolio/services/portfolio.service';
import { MarketDataService } from '../../marketdata/services/marketdata.service';
import {
  IOrderRepository,
  IOrderService,
  OrderSide,
  OrderStatus,
  OrderType,
} from '../interfaces/order.interface';
import { CancelOrderDTO } from '../dto/cancelOrder.dto';

export class OrderService
  extends BaseService<Order, IOrderRepository>
  implements IOrderService
{
  constructor(
    repository: IOrderRepository,
    private marketDataService: MarketDataService,
    private portfolioService: PortfolioService
  ) {
    super(repository);
  }

  findAll(query?: { [key: string]: unknown }): Promise<Order[] | null> {
    throw new Error('Method not implemented.');
  }

  findOne(id: Order['id']): Promise<Order | null> {
    throw new Error('Method not implemented.');
  }

  async create(createOrderDto: CreateOrderDTO): Promise<Order | null> {
    const { instrumentId, side, type, size, price, amount, userId } =
      createOrderDto;

    const latestPrice = await this.marketDataService.getLatestPriceById(
      instrumentId
    );

    if (!latestPrice) {
      throw new Error('No market data available for this instrument');
    }

    if (!size && !amount) {
      throw new Error('Either size or amount must be provided');
    }

    let orderSize: number = 0;

    if (size) {
      orderSize = size;
    }

    if (amount && !size) {
      orderSize = Math.floor(amount / latestPrice.close);
      if (orderSize === 0) {
        throw new Error('Amount too small to buy at least one share');
      }
    }

    if (type === OrderType.LIMIT && !price) {
      throw new Error('Price is required for LIMIT orders');
    }

    await this.validateOrderAvailability(userId, {
      side,
      instrumentId,
      size: orderSize,
      price: type === OrderType.MARKET ? latestPrice.close : price!,
    });

    const order = await this.repository.create({
      userId,
      instrumentId,
      side,
      type,
      size: orderSize,
      price: type === OrderType.MARKET ? latestPrice.close : price,
      status: type === OrderType.MARKET ? OrderStatus.FILLED : OrderStatus.NEW,
      date: new Date(),
    });

    return order;
  }

  findFilledOrdersByUserId(userId: number): Promise<Order[] | null> {
    return this.repository.findFilledOrdersByUserId(userId);
  }

  async cancel(orderDTO: CancelOrderDTO): Promise<Order | null> {
    const { orderId, userId } = orderDTO;
    const order = await this.repository.findOne(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    if (order.userId !== userId) {
      throw new Error('This order does not belong to the user');
    }

    if (order.status !== OrderStatus.NEW) {
      throw new Error('Only NEW orders can be cancelled');
    }

    order.status = OrderStatus.CANCELLED;

    return this.repository.update(orderId, order);
  }

  private async validateOrderAvailability(
    userId: number,
    order: {
      side: OrderSide;
      instrumentId: number;
      size: number;
      price: number;
    }
  ): Promise<void> {
    const portfolio = await this.portfolioService.getUserPortfolio(userId);

    if (order.side === OrderSide.BUY) {
      const orderCost = order.size * order.price;
      if (orderCost > portfolio.availableCash) {
        throw new Error('Insufficient funds');
      }
    } else if (order.side === OrderSide.SELL) {
      const position = portfolio.positions.find(
        (p) => p.instrumentId === order.instrumentId
      );
      if (!position || position.quantity < order.size) {
        throw new Error('Insufficient shares');
      }
    }
  }
}
