import { PrismaClient } from '@prisma/client';

import { InstrumentService } from '../../instruments/services/instrument.service';
import InstrumentsPostgresRepository from '../../instruments/repository/instrument.postgres.repository';

import UserPostgresRepository from '../../users/repositories/user.postgres.repository';
import { UserService } from '../../users/services/user.service';

import OrderPostgresRepository from '../../orders/repositories/order.postgres.repository';

import MarketDataPostgresRepository from '../../marketdata/repositories/marketdata.postgres.repository';

import { PortfolioService } from '../../portfolio/services/portfolio.service';


const PrismaClientImp = new PrismaClient();

const instrumentRepository = new InstrumentsPostgresRepository(PrismaClientImp);
export const InstrumentServiceImp = new InstrumentService(instrumentRepository);

const userRepository = new UserPostgresRepository(PrismaClientImp);
export const UserServiceImp = new UserService(userRepository);

const OrderRepositoryImp = new OrderPostgresRepository(PrismaClientImp);

const MarketDataRepositoryImp = new MarketDataPostgresRepository(PrismaClientImp);

export const PortfolioServiceImp = new PortfolioService(
  OrderRepositoryImp,
  MarketDataRepositoryImp,
  InstrumentServiceImp
);
