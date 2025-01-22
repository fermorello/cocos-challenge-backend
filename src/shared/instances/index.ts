import { PrismaClient } from '@prisma/client';

import { InstrumentService } from '../../instruments/services/instrument.service';
import InstrumentsPostgresRepository from '../../instruments/repository/instrument.postgres.repository';

import UserPostgresRepository from '../../users/repositories/user.postgres.repository';
import { UserService } from '../../users/services/user.service';


const PrismaClientImp = new PrismaClient();

const instrumentRepository = new InstrumentsPostgresRepository(PrismaClientImp);
export const InstrumentServiceImp = new InstrumentService(instrumentRepository);

const userRepository = new UserPostgresRepository(PrismaClientImp);
export const UserServiceImp = new UserService(userRepository);
