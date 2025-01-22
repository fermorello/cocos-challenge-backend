import { PrismaClient } from '@prisma/client';
import { MarketData } from '../entities/marketdata.entity';
import { IMarketDataRepository } from '../interfaces/marketdata.interface';

export default class MarketDataPostgresRepository
  implements IMarketDataRepository
{
  constructor(readonly prisma: PrismaClient) {}

  find(query?: { [key: string]: unknown }): Promise<MarketData[] | null> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string | number): Promise<MarketData | null> {
    throw new Error('Method not implemented.');
  }
  create(entity: MarketData | Partial<MarketData>): Promise<MarketData | null> {
    throw new Error('Method not implemented.');
  }
  update(
    id: string | number,
    entity: MarketData | Partial<MarketData>
  ): Promise<MarketData | null> {
    throw new Error('Method not implemented.');
  }
}
