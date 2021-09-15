import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateProductUseCase } from './UpdateProductsUseCase';

class UpdateProductController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const updateProductUseCase = container.resolve(UpdateProductUseCase);

    const product = await updateProductUseCase.execute(
      {
        name,
        price,
        quantity,
      },
      id,
    );

    return response.status(201).json(product);
  }
}

export { UpdateProductController };
