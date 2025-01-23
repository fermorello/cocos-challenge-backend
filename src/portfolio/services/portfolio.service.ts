import IRepository from '../../config/repository.interface';
import { IOrderRepository } from '../../orders/interfaces/order.interface';
import { Instrument } from '../../instruments/entities/instrument.entity';
import { IMarketDataRepository } from '../../marketdata/interfaces/marketdata.interface';
import {
  Portfolio,
  IPortfolioService,
  Position,
} from '../interfaces/portolio.interface';
import {
  calculateAvailableCash,
  calculateNetQuantity,
  calculatePerformance,
  groupOrdersByInstrument,
} from '../utils/portfolio.utils';
import { Order } from '../../orders/entities/order.entity';
import { InstrumentType } from '../../instruments/interfaces/instrument.interface';

export class PortfolioService implements IPortfolioService {
  constructor(
    private readonly ordersRepository: IOrderRepository,
    private readonly marketDataRepository: IMarketDataRepository,
    private readonly instrumentsRepository: IRepository<Instrument>
  ) {}

  async getUserPortfolio(userId: number): Promise<Portfolio> {

    const filledOrders = await this.ordersRepository.findFilledOrdersByUserId(
      userId
    );

    if (!filledOrders) {
      return {
        totalValue: 0,
        availableCash: 0,
        positions: [],
      };
    }

    const availableCash = calculateAvailableCash(filledOrders);

    const positions = await this.calculatePositions(filledOrders);

    const totalValue =
      availableCash + positions.reduce((sum, pos) => sum + pos.totalValue, 0);

    return {
      totalValue,
      availableCash,
      positions,
    };
  }

  private async calculatePositions(filledOrders: Order[]): Promise<Position[]> {
    const ordersByInstrument = groupOrdersByInstrument(filledOrders);

    const latestPrices = await this.marketDataRepository.getLatestPrices();

    if (!latestPrices?.length) {
      return [];
    }

    const positions: Position[] = [];

    for (const [instrumentId, orders] of ordersByInstrument.entries()) {

      // Consideración para mejorar el performance: En lugar de hacer llamadas a la base de datos por cada instrumento, hacer una sola llamada con los instrumentos necesarios
      const instrument = await this.instrumentsRepository.findOne(instrumentId);
      if (!instrument) {
        continue;
      }

      if (instrument.type === InstrumentType.MONEDA) continue;

      const quantity = calculateNetQuantity(orders);
      if (quantity === 0) continue;

      const latestPrice = latestPrices.find(
        (p: { instrumentId: number; close: number; open: number }) =>
          p.instrumentId === instrumentId
      );

      if (!latestPrice) continue;

      const totalValue = quantity * (latestPrice?.close ?? 0);
      const performance = calculatePerformance(orders, latestPrice);

      positions.push({
        instrumentId,
        ticker: instrument.ticker,
        name: instrument.name,
        quantity,
        totalValue,
        performance,
      });
    }

    return positions;
  }
}
