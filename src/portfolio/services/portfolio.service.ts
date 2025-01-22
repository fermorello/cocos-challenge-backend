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
    throw new Error('Method not implemented.');
  }
}
