import { User } from '@modules/typeorm/entities/User';
import { IUsersRepository } from '@modules/typeorm/IRepositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindByIdUseUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(user_id: string): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists!');
    }

    return user;
  }
}

export { FindByIdUseUseCase };
