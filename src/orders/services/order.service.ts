import { Order } from '../entities/order.entity';
import { BaseService } from '../../config/base.service';
import IRepository from '../../config/repository.interface';
import { IOrderRepository, IOrderService } from '../interfaces/order.interface';
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

    // Validate business rules

    // Get Marketdata price for the instrument

    // Validate User has enough cash to buy the instrument or has enough quantity to sell

    return createOrderDto;
  }

  findFilledOrdersByUserId(userId: number): Promise<Order[] | null> {
    return this.repository.findFilledOrdersByUserId(userId);
  }
}
