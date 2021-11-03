import { User } from '@modules/typeorm/entities/User';
import { IUsersRepository } from '@modules/typeorm/IRepositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists!');
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('Ther is already one user with this email!');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password doest not match');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await this.usersRepository.create(user);

    return user;
  }
}

export { UpdateUserUseCase };
