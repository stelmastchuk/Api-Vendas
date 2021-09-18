import { ICreateUser } from '@modules/DTOs/ICreateUser';
import { User } from '@modules/typeorm/entities/User';
import { IUsersRepository } from '@modules/typeorm/IRepositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly userRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password, avatar }: ICreateUser): Promise<User> {
    const emailAlreadyExists = await this.userRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError('E-mail Already Exists!');
    }

    const passwordHas = await hash(password, 8);

    const user = this.userRepository.create({
      name,
      email,
      password: passwordHas,
      avatar,
    });

    return user;
  }
}

export { CreateUserUseCase };
