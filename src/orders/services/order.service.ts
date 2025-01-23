import { Order } from '../entities/order.entity';
import { BaseService } from '../../config/base.service';
import IRepository from '../../config/repository.interface';
import { IOrderRepository, IOrderService, OrderType } from '../interfaces/order.interface';
import { CreateOrderDTO } from '../dto/createOrder.dto';
import { MarketDataService } from '../../marketdata/services/marketdata.service';

export class OrderService
  extends BaseService<Order, IOrderRepository>
  implements IOrderService
{
  constructor(
    repository: IOrderRepository,
    private marketDataService: MarketDataService
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


    // Validate User has enough cash to buy the instrument or has enough quantity to sell

    return createOrderDto;
  }

  findFilledOrdersByUserId(userId: number): Promise<Order[] | null> {
    return this.repository.findFilledOrdersByUserId(userId);
  }
}
