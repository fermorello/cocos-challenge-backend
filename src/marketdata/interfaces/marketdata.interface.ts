import { MarketData } from "../entities/marketdata.entity";
import IRepository from "../../config/repository.interface";
import { CreateMarketDataDTO } from "../dto/createMarketData.dto";

export interface IMarketDataRepository extends IRepository<MarketData> {}

export interface IMarketDataService {
  findAll(query?: { [key: string]: unknown }):
    | Promise<MarketData[] | null>
    | Promise<{
        data: MarketData[] | null;
        pagination: { total: number; pages: number };
      }>;
  findOne: (id: MarketData['id']) => Promise<MarketData | null>;
  create: (order: CreateMarketDataDTO) => Promise<MarketData | null>;
}