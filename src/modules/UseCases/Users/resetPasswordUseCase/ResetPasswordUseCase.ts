import { IUsersRepository } from '@modules/typeorm/IRepositories/IUsersRepository';
import { IUsersTokenRepository } from '@modules/typeorm/IRepositories/IUsersTokensRepository';
import { hash } from 'bcryptjs';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokenRepository,
    @inject('UsersRepository')
    private readonly userRepository: IUsersRepository,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token does not exists!');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists!');
    }

    const tokenCreatedAt = userToken.created_at;

    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token Expired');
    }

    user.password = await hash(password, 8);

    await this.userRepository.create({ id: user.id, password: user.password });
  }
}

export { ResetPasswordUseCase };
