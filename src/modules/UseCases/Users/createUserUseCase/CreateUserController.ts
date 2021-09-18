import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { name, email, password, avatar } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      avatar,
    });

    return response.status(200).json(user);
  }
}

export { CreateUserController };
