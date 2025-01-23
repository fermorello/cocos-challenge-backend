import { MarketData } from '../entities/marketdata.entity';
import IRepository from '../../config/repository.interface';
import { CreateMarketDataDTO } from '../dto/createMarketData.dto';

export interface IMarketDataRepository extends IRepository<MarketData> {
  getLatestPrices(): Promise<Pick<
    MarketData,
    'instrumentId' | 'close' | 'open'
  >[] | null>;
}

export interface IMarketDataService {
  findAll(query?: { [key: string]: unknown }):
    | Promise<MarketData[] | null>
    | Promise<{
        data: MarketData[] | null;
        pagination: { total: number; pages: number };
      }>;
  findOne: (id: MarketData['id']) => Promise<MarketData | null>;
  create: (order: CreateMarketDataDTO) => Promise<MarketData | null>;
  getLatestPrices(): Promise<Pick<
    MarketData,
    'instrumentId' | 'close' | 'open'
  >[] | null>;
}
