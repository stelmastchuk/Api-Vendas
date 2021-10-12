import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCustomerUseCase } from './CreateCustomerUseCase';

class CreateCustomerController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createUserUseCase = container.resolve(CreateCustomerUseCase);

    const customer = await createUserUseCase.execute({
      name,
      email,
    });

    return response.status(200).json(customer);
  }
}

export { CreateCustomerController };
