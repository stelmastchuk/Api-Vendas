import { Customer } from '@modules/typeorm/entities/Customer';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

export interface ICreateOrder {
  customer: Customer;
  products: IProduct[];
}
