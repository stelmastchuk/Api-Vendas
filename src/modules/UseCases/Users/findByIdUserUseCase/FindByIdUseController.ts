import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindByIdUseUseCase } from './FindByIdUseUseCase';
import { classToClass } from 'class-transformer';

class FindByIdUseController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findByIdUseUseCase = container.resolve(FindByIdUseUseCase);

    const user = await findByIdUseUseCase.execute(id);

    return response.status(201).json(classToClass(user));
  }
}

export { FindByIdUseController };
