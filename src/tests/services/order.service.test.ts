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

    it('should create a LIMIT SELL order successfully', async () => {
      const createOrderDto: CreateOrderDTO = {
        userId: 1,
        instrumentId: 1,
        side: OrderSide.SELL,
        type: OrderType.LIMIT,
        size: 5,
        price: 150,
      };

      marketDataService.getLatestPriceById.mockResolvedValue({
        instrumentId: 1,
        close: 100,
        open: 98,
      });

      portfolioService.getUserPortfolio.mockResolvedValue({
        availableCash: 1000,
        totalValue: 5000,
        positions: [
          {
            instrumentId: 1,
            quantity: 10,
            totalValue: 1000,
            name: 'Test',
            ticker: 'TST',
            performance: 0.5,
          },
        ],
      });

      const result = await ordersService.create(createOrderDto);

      expect(result).toMatchObject({
        userId: createOrderDto.userId,
        instrumentId: createOrderDto.instrumentId,
        side: createOrderDto.side,
        type: createOrderDto.type,
        size: createOrderDto.size,
        price: createOrderDto.price,
        status: OrderStatus.NEW,
      });
    });

    it('should reject order when insufficient funds', async () => {
      const userId = 1;
      const createOrderDto: CreateOrderDTO = {
        userId: 1,
        instrumentId: 1,
        side: OrderSide.BUY,
        type: OrderType.MARKET,
        size: 10,
      };

      const latestPrice = [{ instrumentId: 1, close: 100, open: 98 }];
      marketDataService.getLatestPrices.mockResolvedValue(latestPrice);

      marketDataService.getLatestPriceById.mockResolvedValue(latestPrice[0]);

      portfolioService.getUserPortfolio.mockResolvedValue({
        availableCash: 500,
        totalValue: 500,
        positions: [],
      });

      await expect(ordersService.create(createOrderDto)).rejects.toThrow(
        'Insufficient funds'
      );
    });

    it('should reject order when insufficient shares for selling', async () => {
      const userId = 1;
      const createOrderDto: CreateOrderDTO = {
        userId: 1,
        instrumentId: 1,
        side: OrderSide.SELL,
        type: OrderType.MARKET,
        size: 10,
      };

      const latestPrice = [{ instrumentId: 1, close: 100, open: 98 }];

      marketDataService.getLatestPrices.mockResolvedValue(latestPrice);
      marketDataService.getLatestPriceById.mockResolvedValue(latestPrice[0]);

      portfolioService.getUserPortfolio.mockResolvedValue({
        availableCash: 1000,
        totalValue: 2000,
        positions: [
          {
            instrumentId: 1,
            quantity: 5,
            totalValue: 1000,
            name: 'Test',
            ticker: 'TST',
            performance: 0.5,
          },
        ],
      });

      await expect(ordersService.create(createOrderDto)).rejects.toThrow(
        'Insufficient shares'
      );
    });
  });
  
  it('should calculate correct size when amount is provided', async () => {
    const createOrderDto: CreateOrderDTO = {
      userId: 1,
      instrumentId: 1,
      side: OrderSide.BUY,
      type: OrderType.MARKET,
      amount: 1000,
    };

    const latestPrice = [{ instrumentId: 1, close: 60, open: 62 }];

    marketDataService.getLatestPrices.mockResolvedValue(latestPrice);
    marketDataService.getLatestPriceById.mockResolvedValue(latestPrice[0]);

    portfolioService.getUserPortfolio.mockResolvedValue({
      availableCash: 2000,
      totalValue: 2000,
      positions: [],
    });

    const result = await ordersService.create(createOrderDto);

    if (result) {
      expect(result.size).toBe(16); 
      expect(result.status).toBe(OrderStatus.FILLED);
    }
  });
});
