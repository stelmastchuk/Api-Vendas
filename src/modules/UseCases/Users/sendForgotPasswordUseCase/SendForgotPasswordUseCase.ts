import EtherealMail from '@config/email/EtherealMail';
import { IUsersRepository } from '@modules/typeorm/IRepositories/IUsersRepository';
import path from 'path';
import { IUsersTokenRepository } from '@modules/typeorm/IRepositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class SendForgotPasswordUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokenRepository,
    @inject('UsersRepository')
    private readonly userRepository: IUsersRepository,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email does not exists!');
    }

    const userToken = await this.usersTokensRepository.create(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Venda] Recuperação de senha!',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3335/reset_password?token=${userToken.token}`,
        },
      },
    });
  }
}

export { SendForgotPasswordUseCase };
