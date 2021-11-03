import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindAllUserUseCase } from './FindAllUserUseCase';

class FindAllUserController {
  async handler(request: Request, response: Response): Promise<Response> {
    const findAllUserUseCase = container.resolve(FindAllUserUseCase);

    const users = await findAllUserUseCase.execute();

    return response.status(200).json(classToClass(users)).send();
  }
}

export { FindAllUserController };
