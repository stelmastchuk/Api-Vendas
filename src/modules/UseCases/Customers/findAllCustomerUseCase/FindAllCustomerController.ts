import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindAllCostumerUseCase } from './FindAllCostumerUseCase';

class FindAllCustomerController {
  async handler(request: Request, response: Response): Promise<Response> {
    const findAllCostumerUseCase = container.resolve(FindAllCostumerUseCase);

    const users = await findAllCostumerUseCase.execute();

    return response.status(200).json(users).send();
  }
}

export { FindAllCustomerController };
