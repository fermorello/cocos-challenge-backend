import { PrismaClient } from '@prisma/client';
import { MarketData } from '../entities/marketdata.entity';
import { DatabaseError } from '../../shared/errors/app.errors';
import { IMarketDataRepository } from '../interfaces/marketdata.interface';

export default class MarketDataPostgresRepository
  implements IMarketDataRepository
{
  constructor(readonly prisma: PrismaClient) {}

  async find(query?: { [key: string]: unknown }): Promise<MarketData[] | null> {
    return null;
  }
  async findOne(id: number): Promise<MarketData | null> {
    try {
      const marketData = await this.prisma.marketData.findUnique({
        where: {
          id,
        },
      });
      if (!marketData) return null;
      return {
        ...marketData,
        instrumentId: marketData?.instrumentid,
        previousClose: marketData.previousclose,
      };
    } catch (e) {
      console.error(e);
      throw new DatabaseError('Error retrieving market data from database');
    }
  }
  async create(instrument: Omit<MarketData, 'id'>): Promise<MarketData | null> {
    try {
      const marketData = await this.prisma.marketData.create({
        data: {
          ...instrument,
          instrumentid: instrument.instrumentId,
          previousclose: instrument.previousClose,
        },
      });

      return {
        ...marketData,
        instrumentId: marketData?.instrumentid,
        previousClose: marketData.previousclose,
      };
    } catch (e) {
      console.error(e);
      throw new DatabaseError('Error creating market data in database');
    }
  }
  update(id: string, entity: MarketData): Promise<MarketData | null> {
    throw new Error();
  }

  async getLatestPrices(): Promise<Pick<
    MarketData,
    'instrumentId' | 'close' | 'open'
  >[] | null> {
    try {
      const latestDate = await this.prisma.marketData.aggregate({
        _max: {
          date: true,
        },
      });

      if (!latestDate) {
        return null;
      }

      const latestPrices = await this.prisma.marketData.findMany({
        where: {
          date: latestDate._max.date as Date,
        },
      });

      return latestPrices.map((lp) => ({
        instrumentId: lp.instrumentid,
        open: lp.open,
        close: lp.close,
      }));
    } catch (e) {
      console.error(e);
      throw new DatabaseError('Error retrieving latest prices from database');
    }
  }
}
