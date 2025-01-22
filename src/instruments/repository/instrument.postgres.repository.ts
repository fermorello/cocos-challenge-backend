import { PrismaClient } from '@prisma/client';
import { Instrument } from '../entities/instrument.entity';
import { DatabaseError } from '../../shared/errors/app.errors';
import { CreateInstrumentDTO } from '../dto/createInstrument.dto';
import { IInstrumentRepository } from '../interfaces/instrument.interface';

export default class InstrumentsPostgresRepository
  implements IInstrumentRepository
{
  constructor(readonly prisma: PrismaClient) {}

  async find(query?: { [key: string]: unknown }): Promise<Instrument[] | null> {
    return null;
  }

  async findOne(id: number): Promise<Instrument | null> {
    try {
      const instrument = await this.prisma.instrument.findUnique({
        where: {
          id,
        },
      });
      return instrument;
    } catch (e) {
      console.error(e);
      throw new DatabaseError('Error retrieving instrument from database');
    }
  }

  async findByNameOrTicker(
    text: Instrument['name'] | Instrument['ticker']
  ): Promise<Instrument[] | null> {
    try {
      const instuments = await this.prisma.instrument.findMany({
        where: {
          OR: [
            {
              name: {
                contains: text,
                mode: 'default',
              },
            },
            {
              ticker: {
                contains: text,
                mode: 'default',
              },
            },
          ],
        },
      });
      return instuments;
    } catch (e) {
      console.error(e);
      throw new DatabaseError('Error retrieving instrument from database');
    }
  }

  async create(dto: CreateInstrumentDTO): Promise<Instrument | null> {
    try {
      const instrument = await this.prisma.instrument.create({
        data: {
          ...dto,
        },
      });
      return instrument;
    } catch (e) {
      console.error(e);
      throw new DatabaseError('Error creating instrument in database');
    }
  }
  update(id: string, entity: Instrument): Promise<Instrument | null> {
    throw new Error();
  }
}
