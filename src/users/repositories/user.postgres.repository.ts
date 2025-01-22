import { PrismaClient } from '@prisma/client';
import IRepository from '../../config/repository.interface';
import { User } from '../entities/user.entity';

export default class UserPostgresRepository implements IRepository<User> {
  constructor(readonly prisma: PrismaClient) {}

  find(query?: { [key: string]: unknown }): Promise<User[] | null> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string | number): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  create(entity: User | Partial<User>): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  update(
    id: string | number,
    entity: User | Partial<User>
  ): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
}
