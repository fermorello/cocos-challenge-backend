import { PrismaClient } from '@prisma/client';

import { InstrumentService } from '../../instruments/services/instrument.service';
import InstrumentsPostgresRepository from '../../instruments/repository/instrument.postgres.repository';

import UserPostgresRepository from '../../users/repositories/user.postgres.repository';
import { UserService } from '../../users/services/user.service';

import OrderPostgresRepository from '../../orders/repositories/order.postgres.repository';

import MarketDataPostgresRepository from '../../marketdata/repositories/marketdata.postgres.repository';

import { PortfolioService } from '../../portfolio/services/portfolio.service';
import { OrderService } from '../../orders/services/order.service';
import { MarketDataService } from '../../marketdata/services/marketdata.service';

const PrismaClientImp = new PrismaClient();

const instrumentRepository = new InstrumentsPostgresRepository(PrismaClientImp);
export const InstrumentServiceImp = new InstrumentService(instrumentRepository);

const userRepository = new UserPostgresRepository(PrismaClientImp);
export const UserServiceImp = new UserService(userRepository);

const MarketDataRepositoryImp = new MarketDataPostgresRepository(
  PrismaClientImp
);
export const MarketDataServiceImp = new MarketDataService(
  MarketDataRepositoryImp
);

const OrderRepositoryImp = new OrderPostgresRepository(PrismaClientImp);

export const PortfolioServiceImp = new PortfolioService(
  OrderRepositoryImp,
  MarketDataRepositoryImp,
  InstrumentServiceImp
);

export const OrderServiceImp = new OrderService(
  OrderRepositoryImp,
  MarketDataServiceImp,
  PortfolioServiceImp
);
