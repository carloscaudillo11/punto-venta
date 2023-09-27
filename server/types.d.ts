import { JwtPayload } from 'jsonwebtoken';
import { ObjectId, Document } from 'mongoose';
import { Request } from 'express';

// Definición de tipos

type Role = 'Employed' | 'Admin';
type OrderType = 'room' | 'restaurant';
type CategoryMenu = 'beverage' | 'dish';
type StatusProvider = 'active' | 'inactive';
type PayMethod = 'card' | 'cash';

type Image = {
  url: string;
  public_id: string;
};

type Product = {
  name: string;
  amount: number;
  unit_price: number;
};

// Interfaces

export interface IUser extends Document {
  name: string;
  lastname: string;
  key: string;
  password: string;
  rol: Role;
}

export interface IOrder extends Document {
  table: number | null;
  room: number | null;
  date: Date;
  order_type: OrderType;
  menu_elements: ObjectId[];
  products: ObjectId[];
  total: number;
  paymethod: PayMethod
}

export interface IProduct extends Document {
  name: string;
  description: string;
  category: CategoryMenu;
  price: number;
  provider: ObjectId;
  amount: number;
}

export interface IMenu extends IProduct {
  image: Image;
  category_Menu: CategoryMenu;
}

export interface IProvider extends Document {
  name: string;
  nif_rif: number;
  product: string;
  address: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  contact: {
    contact_name: string;
    contact_position: string;
    email: string;
    phone: number;
  };
  status: StatusProvider;
}

export interface IOrderProvider extends Document {
  order_number: number;
  date: Date;
  provider: ObjectId;
  products: Product[];
  total: number;
}

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
