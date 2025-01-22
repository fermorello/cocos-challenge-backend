import IRepository from '../../config/repository.interface';
import { IOrderRepository } from '../../orders/interfaces/order.interface';
import { Instrument } from '../../instruments/entities/instrument.entity';
import { IMarketDataRepository } from '../../marketdata/interfaces/marketdata.interface';
import { Portfolio, IPortfolioService } from '../interfaces/portolio.interface';

export class PortfolioService implements IPortfolioService {
  constructor(
    private readonly ordersRepository: IOrderRepository,
    private readonly marketDataRepository: IMarketDataRepository,
    private readonly instrumentsRepository: IRepository<Instrument>
  ) {}

  async getUserPortfolio(userId: number): Promise<Portfolio> {

    //TODO: Get all FILLED orders for the user

    //TODO: Use Filled Orders to calculate users avaialble cash balance

    //TODO: Use Filled Orders to calculate users positions

    //TODO: Calculate total value of the portfolio

    return {
      totalValue: 0,
      availableCash: 0,
      positions: [],
    };
  }
}
