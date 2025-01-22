import { User } from '../entities/user.entity';
import { BaseService } from '../../config/base.service';
import IRepository from '../../config/repository.interface';
import { IUserService } from '../interfaces/user.interface';
import { CreateUserDTO } from '../dto/createUser.dto';

export class UserService
  extends BaseService<User, IRepository<User>>
  implements IUserService
{
  constructor(repository: IRepository<User>) {
    super(repository);
  }

  findAll(query?: { [key: string]: unknown }): Promise<User[] | null> {
    return this.repository.find(query) as Promise<User[] | null>;
  }

  async findOne(id: User['id']): Promise<User | null> {
    return this.repository.findOne(id) as Promise<User> | null;
  }

  async create(user: CreateUserDTO): Promise<User | null> {
    return this.repository.create(
      user as Partial<User>
    ) as Promise<User> | null;
  }

  async update(
    id: User['id'],
    User: User | Partial<User>
  ): Promise<User | null> {
    return this.repository.update(id, User) as Promise<User> | null;
  }
}
