import { ICreateUser } from '@modules/DTOs/ICreateUser';
import { User } from '../entities/User';

interface IUsersRepository {
  create(data: ICreateUser): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  updateAvatar(avatar: string, id: string): Promise<void>;
}

export { IUsersRepository };
