import { Order } from '@modules/typeorm/entities/Order';
import { ICustomersRepository } from '@modules/typeorm/IRepositories/ICustomersRepository';
import { IOrdersRepository } from '@modules/typeorm/IRepositories/IOrdersRepository';
import { IProductsRepository } from '@modules/typeorm/IRepositories/IProductsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderUseCase {
  constructor(
    @inject('OrdersRepository')
    private readonly ordersRepository: IOrdersRepository,
    @inject('CustomersRepository')
    private readonly customerRepository: ICustomersRepository,
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute({
    customer_id,
    products,
  }: IRequest): Promise<Order | undefined> {
    const customer = await this.customerRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Could not find custome with the given id!');
    }

    const productsExists = await this.productsRepository.findAllByIds(products);

    if (!productsExists.length) {
      throw new AppError('Could not find any products with the given ids!');
    }

    const existsProductsIds = productsExists.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError('Could not find products!');
    }

    const quantityAvailable = products.filter(
      product =>
        productsExists.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productsExists.filter(p => p.id === product.id)[0].price,
    }));

    const order = await this.ordersRepository.create({
      customer: customer,
      products: serializedProducts,
    });

    if (!order) {
      throw new AppError('Could not create order!');
    }

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        productsExists.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    for (const value of updatedProductQuantity) {
      await this.productsRepository.update(
        { quantity: value.quantity },
        value.id,
      );
    }

    return order;
  }
}

export { CreateOrderUseCase };
