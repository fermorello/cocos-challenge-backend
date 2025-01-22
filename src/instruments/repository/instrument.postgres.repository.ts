import { PrismaClient } from '@prisma/client';
import { IInstrumentRepository } from '../interfaces/instrument.interface';
import { Instrument } from '../entities/instrument.entity';

export default class InstrumentsPostgresRepository
  implements IInstrumentRepository
{
  constructor(readonly prisma: PrismaClient) {}
  find(query?: { [key: string]: unknown }): Promise<Instrument[] | null> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string | number): Promise<Instrument | null> {
    throw new Error('Method not implemented.');
  }
  create(entity: Instrument | Partial<Instrument>): Promise<Instrument | null> {
    throw new Error('Method not implemented.');
  }
  update(
    id: string | number,
    entity: Instrument | Partial<Instrument>
  ): Promise<Instrument | null> {
    throw new Error('Method not implemented.');
  }
  findByNameOrTicker(
    text: Instrument['name'] | Instrument['ticker']
  ): Promise<Instrument[] | null> {
    throw new Error('Method not implemented.');
  }
}
