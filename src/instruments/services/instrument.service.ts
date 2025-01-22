import { Instrument } from '../entities/instrument.entity';
import { BaseService } from '../../config/base.service';
import {
  IInstrumentRepository,
  IInstrumentrService,
} from '../interfaces/instrument.interface';
import { CreateInstrumentDTO } from '../dto/createInstrument.dto';

export class InstrumentService
  extends BaseService<Instrument, IInstrumentRepository>
  implements IInstrumentrService
{
  constructor(repository: IInstrumentRepository) {
    super(repository);
  }

  findAll(query?: { [key: string]: unknown }): Promise<Instrument[] | null> {
    throw new Error('Not implemented');
  }

  async findOne(id: Instrument['id']): Promise<Instrument | null> {
    return this.repository.findOne(id) as Promise<Instrument> | null;
  }

  async findByNameOrTicker(
    text: Instrument['name'] | Instrument['ticker']
  ): Promise<Instrument[] | null> {
    return this.repository.findByNameOrTicker(text);
  }

  async create(user: CreateInstrumentDTO): Promise<Instrument | null> {
    return this.repository.create(
      user as Partial<Instrument>
    ) as Promise<Instrument> | null;
  }

  async update(
    id: Instrument['id'],
    User: Instrument | Partial<Instrument>
  ): Promise<Instrument | null> {
    return this.repository.update(id, User) as Promise<Instrument> | null;
  }
}
