import { Instrument } from '../entities/instrument.entity';
import { BaseService } from '../../config/base.service';
import { CreateInstrumentDTO } from '../dto/createInstrument.dto';
import {
  IInstrumentRepository,
  IInstrumentrService,
} from '../interfaces/instrument.interface';

export class InstrumentService
  extends BaseService<Instrument, IInstrumentRepository>
  implements IInstrumentrService
{
  constructor(repository: IInstrumentRepository) {
    super(repository);
  }
  findAll(query?: { [key: string]: unknown }): Promise<Instrument[] | null> {
    throw new Error('Method not implemented.');
  }
  findOne(id: Instrument['id']): Promise<Instrument | null> {
    throw new Error('Method not implemented.');
  }
  findByNameOrTicker(
    id: Instrument['name'] | Instrument['ticker']
  ): Promise<Instrument[] | null> {
    throw new Error('Method not implemented.');
  }
  create(user: CreateInstrumentDTO): Promise<Instrument | null> {
    throw new Error('Method not implemented.');
  }
}
