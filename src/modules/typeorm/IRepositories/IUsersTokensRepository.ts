import { UserToken } from '../entities/UserToken';

interface IUsersTokenRepository {
  create(user_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}

export { IUsersTokenRepository };
