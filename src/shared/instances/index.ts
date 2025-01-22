import { PrismaClient } from '@prisma/client';
import { InstrumentService } from '../../instruments/services/instrument.service';
import InstrumentsPostgresRepository from '../../instruments/repository/instrument.postgres.repository';


const PrismaClientImp = new PrismaClient();

const instrumentRepository = new InstrumentsPostgresRepository(PrismaClientImp);
export const InstrumentServiceImp = new InstrumentService(instrumentRepository);


