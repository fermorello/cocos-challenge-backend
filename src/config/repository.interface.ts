import { BaseEntity } from "./base.entity";

export default interface IRepository<T extends BaseEntity> {
  find(query?: { [key: string]: unknown }):
    | Promise<T[] | null>;
  findOne(id: T['id']): Promise<T | null>;
  create(entity: T | Partial<T>): Promise<T | null>;
  update(id: T['id'], entity: T | Partial<T>): Promise<T | null>;
}
