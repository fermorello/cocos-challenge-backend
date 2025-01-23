import IRepository from '../../config/repository.interface';
import { CreateInstrumentDTO } from '../dto/createInstrument.dto';
import { Instrument } from '../entities/instrument.entity';

export interface IInstrumentrService {
  find(query?: { [key: string]: unknown }): Promise<Instrument[] | null>;
  findOne: (id: Instrument['id']) => Promise<Instrument | null>;
  findByNameOrTicker: (
    id: Instrument['name'] | Instrument['ticker']
  ) => Promise<Instrument[] | null>;
  create: (user: CreateInstrumentDTO) => Promise<Instrument | null>;
}

export interface IInstrumentRepository extends IRepository<Instrument> {
  findByNameOrTicker: (
    text: Instrument['name'] | Instrument['ticker']
  ) => Promise<Instrument[] | null>;
}

export enum InstrumentType {
  ACCION = 'ACCION',
  MONEDA = 'MONEDA',
}
