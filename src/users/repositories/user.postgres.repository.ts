import { Prisma, PrismaClient } from '@prisma/client';
import IRepository from '../../config/repository.interface';
import { User } from '../entities/user.entity';
import { DatabaseError } from '../../shared/errors/app.errors';
import { CreateUserDTO } from '../dto/createUser.dto';

export default class UserPostgresRepository implements IRepository<User> {
  constructor(readonly prisma: PrismaClient) {}

  async find(query?: { [key: string]: unknown }): Promise<User[] | null> {
    return null;
  }
  async findOne(id: number): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) return null;

      return { ...user, accountNumber: user.accountnumber };
    } catch (e) {
      console.error(e);
      throw new DatabaseError('Error retrieving user from database');
    }
  }
  async create(dto: CreateUserDTO): Promise<User | null> {
    try {
      const user = await this.prisma.user.create({
        data: {
          ...dto,
          accountnumber: dto.accountNumber,
        },
      });
      return { ...user, accountNumber: user.accountnumber };
    } catch (e) {
      console.error(e);
      throw new DatabaseError('Error retrieving user from database');
    }
  }
  update(id: string, entity: User): Promise<User | null> {
    throw new Error();
  }
}
