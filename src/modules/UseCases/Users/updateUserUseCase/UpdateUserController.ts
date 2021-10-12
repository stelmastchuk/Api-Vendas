import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserUseCase } from './updateUserUseCase';

class UpdateUserController {
  async handler(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { name, email, password, old_password } = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    await updateUserUseCase.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.status(201).send();
  }
}

export { UpdateUserController };
