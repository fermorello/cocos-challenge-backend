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
    throw new Error('Method not implemented.');
  }
  findOne(id: User['id']): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  create(user: CreateUserDTO): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
}
