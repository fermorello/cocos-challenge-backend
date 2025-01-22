import { BaseService } from '../../config/base.service';
import { MarketData } from '../entities/marketdata.entity';
import { CreateMarketDataDTO } from '../dto/createMarketData.dto';
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

  findAll(query?: { [key: string]: unknown }) {
    return this.repository.find(query) as Promise<MarketData[] | null>;
  }

  async findOne(id: MarketData['id']): Promise<MarketData | null> {
    return this.repository.findOne(id) as Promise<MarketData> | null;
  }

  async create(orderData: CreateMarketDataDTO): Promise<MarketData | null> {
    throw new Error('Not implemented');
  }

  async update(
    id: MarketData['id'],
    md: MarketData | Partial<MarketData>
  ): Promise<MarketData | null> {
    return this.repository.update(id, md) as Promise<MarketData> | null;
  }
}
