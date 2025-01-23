import { describe, it, expect, beforeEach, jest } from '@jest/globals';

import {
  IOrderRepository,
  OrderSide,
  OrderStatus,
  OrderType,
} from '../../orders/interfaces/order.interface';
import { CreateOrderDTO } from '../../orders/dto/createOrder.dto';
import { OrderService } from '../../orders/services/order.service';
import { PortfolioService } from '../../portfolio/services/portfolio.service';
import { MarketDataService } from '../../marketdata/services/marketdata.service';
import { Order } from '../../orders/entities/order.entity';
import OrderInMemoryRepository from '../../orders/repositories/order.inmemory.repository';

describe('OrdersService', () => {
  let ordersService: OrderService;
  let ordersRepository: IOrderRepository;
  let marketDataService: jest.Mocked<MarketDataService>;
  let portfolioService: jest.Mocked<PortfolioService>;

  beforeEach(async () => {
    marketDataService = {
      getLatestPrices: jest.fn(),
      getLatestPriceById: jest.fn(),
    } as any;

    portfolioService = {
      getUserPortfolio: jest.fn(),
    } as any;

    const ordersRepository = new OrderInMemoryRepository();

    ordersService = new OrderService(
      ordersRepository,
      marketDataService,
      portfolioService
    );
  });

  describe('createOrder', () => {
    it('should create a MARKET BUY order successfully', async () => {
      const createOrderDto: CreateOrderDTO = {
        instrumentId: 1,
        side: OrderSide.BUY,
        type: OrderType.MARKET,
        size: 10,
        userId: 1,
      };

      portfolioService.getUserPortfolio.mockResolvedValue({
        availableCash: 2000,
        totalValue: 5000,
        positions: [],
      });

      const latestPrice = [
        { instrumentId: 1, close: 100, open: 98 },
        { instrumentId: 2, close: 200, open: 198 },
      ];

      marketDataService.getLatestPrices.mockResolvedValue(latestPrice);
      marketDataService.getLatestPriceById.mockResolvedValue({
        instrumentId: 1,
        close: 100,
        open: 98,
      });

      const result = await ordersService.create(createOrderDto);

      expect(result).toMatchObject({
        userId: createOrderDto.userId,
        instrumentId: createOrderDto.instrumentId,
        side: createOrderDto.side,
        type: createOrderDto.type,
        size: createOrderDto.size,
        status: OrderStatus.FILLED,
      });
    });
    //2. CREATE LIMIT SELL TEST
    //3. REJECT INSUFFICIENT FUNDS
    //4. REJECT INSUFFICIENT POSITION
  });
});
