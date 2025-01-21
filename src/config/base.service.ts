import { BaseEntity } from './base.entity';
import { ConfigServer } from './config';
import IRepository from './repository.interface';

export class BaseService<
  T extends BaseEntity,
  R extends IRepository<T> = IRepository<T>
> extends ConfigServer {
  protected repository: R;
  constructor(repository: R) {
    super();
    this.repository = repository;
  }
}
