import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindByIdUserUseCase } from './FindByIdUserUseCase';

class FindByIdUserController {
  async handler(request: Request, response: Response): Promise<Response> {
    const findByIdUserUseCase = container.resolve(FindByIdUserUseCase);

    const users = await findByIdUserUseCase.execute();

    return response.status(200).json(users).send();
  }
}

export { FindByIdUserController };
