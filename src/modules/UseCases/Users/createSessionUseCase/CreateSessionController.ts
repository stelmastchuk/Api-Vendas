import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSessionUseCase } from './CreateSessionUseCase';

class CreateSessionController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionUseCase = container.resolve(CreateSessionUseCase);

    const usertoken = await createSessionUseCase.execute({ email, password });

    return response.status(201).json(usertoken);
  }
}

export { CreateSessionController };
