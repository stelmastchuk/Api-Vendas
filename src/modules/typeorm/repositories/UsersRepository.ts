import { ICreateUser } from '@modules/DTOs/ICreateUser';
import { AppError } from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { IUsersRepository } from '../IRepositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(data: ICreateUser): Promise<User> {
    try {
      const user = this.repository.create({
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: data.avatar,
      });

      await this.repository.save(user);

      return user;
    } catch (error) {
      throw new AppError('failed to created user');
    }
  }
  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ id });

    return user;
  }
  async findAll(): Promise<User[]> {
    const user = await this.repository.find();

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ email });

    return user;
  }
}

export { UsersRepository };
