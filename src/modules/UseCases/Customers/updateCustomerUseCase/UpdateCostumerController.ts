import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateCustomerUseCase } from './UpdateCostumerUseCase';

class UpdateCostumerController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, email } = request.body;

    const updateCustomerUseCase = container.resolve(UpdateCustomerUseCase);

    await updateCustomerUseCase.execute({
      id,
      name,
      email,
    });

    return response.status(201).send();
  }
}

export { UpdateCostumerController };
