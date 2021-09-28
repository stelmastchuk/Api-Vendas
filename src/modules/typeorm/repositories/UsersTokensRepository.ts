import { AppError } from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';

import { UserToken } from '../entities/UserToken';
import { IUsersTokenRepository } from '../IRepositories/IUsersTokensRepository';

class UsersTokensRepository implements IUsersTokenRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }
  async create(user_id: string): Promise<UserToken> {
    try {
      const userToken = this.repository.create({
        user_id,
      });

      await this.repository.save(userToken);

      return userToken;
    } catch (error) {
      throw new AppError('failed to generate token');
    }
  }
  async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.repository.findOne({ token });
    return userToken;
  }
}

export { UsersTokensRepository };
