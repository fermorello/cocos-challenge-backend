import { BaseService } from '../../config/base.service';
import { CreateMarketDataDTO } from '../dto/createMarketData.dto';
import { MarketData } from '../entities/marketdata.entity';
import {
  IMarketDataRepository,
  IMarketDataService,
} from '../interfaces/marketdata.interface';

export class MarketDataService
  extends BaseService<MarketData, IMarketDataRepository>
  implements IMarketDataService
{
  constructor(repository: IMarketDataRepository) {
    super(repository);
  }

  findAll(query?: { [key: string]: unknown }): Promise<MarketData[] | null> {
    throw new Error('Method not implemented.');
  }
  findOne(id: MarketData['id']): Promise<MarketData | null> {
    throw new Error('Method not implemented.');
  }
  create(order: CreateMarketDataDTO): Promise<MarketData | null> {
    throw new Error('Method not implemented.');
  }
}
