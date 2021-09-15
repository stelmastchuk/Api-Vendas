import { IProductsRepository } from '@modules/typeorm/IRepositories/IProductsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
  ) {}
  async execute(id: string): Promise<void> {
    if (!id) {
      throw new AppError('Id not existent');
    }

    await this.productsRepository.delete(id);
  }
}

export { DeleteProductUseCase };
