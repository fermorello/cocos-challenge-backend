import { CreateUserDTO } from '../dto/createUser.dto';
import { User } from '../entities/user.entity';

export interface IUser {
  id: number;
  email: string;
  accountNumber: number;
}

export interface IUserService {
  findAll(query?: { [key: string]: unknown }):
    | Promise<User[] | null>
    | Promise<{
        data: User[] | null;
        pagination: { total: number; pages: number };
      }>;
  findOne: (id: User['id']) => Promise<User | null>;
  create: (user: CreateUserDTO) => Promise<User | null>;
}
