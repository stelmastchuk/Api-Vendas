import { User } from '@modules/typeorm/entities/User';
import { IUsersRepository } from '@modules/typeorm/IRepositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindAllUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly userRepository: IUsersRepository,
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users;
  }
}

export { FindAllUserUseCase };
