import { JwtPayload } from 'jsonwebtoken';
import { ObjectId, Document } from 'mongoose';
import { Request } from 'express';

// Definición de tipos

type Roles = 'User' | 'Admin';
type OrderType = 'Habitación' | 'Restaurante';
type CategoryMenu = 'Bebida Preparada' | 'Platillo';
type Category = 'Bebida' | 'Bebida Alcoholica';
type StatusProvider = 'Activo' | 'Inactivo';
type PayMethod = 'Tarjeta' | 'Efectivo';
type transactionType = 'Venta' | 'Gasto';
type BoxStatus = 'Abierta' | 'Cerrada';

type Image = {
  url: string;
  public_id: string;
};

type TProduct = {
  element: ObjectId;
  amount: number;
};

type Menu_Element = {
  element: ObjectId;
  amount: number;
};

type TProducts = {
  element: ObjectId;
  amount: number;
  unit_price: number;
};

// Interfaces

export interface IUser extends Document {
  name: string;
  lastname: string;
  email: string;
  password: string;
  image: Image;
  role: Roles;
}

export interface IBoxCon extends Document {
  date: Date;
  startingAmount: string;
  finalAmount: string;
  user: ObjectId;
  status: BoxStatus;
  box: ObjectId;
}

export interface IBox extends Document {
  name: string;
  status: BoxStatus;
}

export interface IOrder extends Document {
  table: number | null;
  room: number | null;
  date: Date;
  order_type: OrderType;
  menu_elements: {
    element: ObjectId;
    amount: number;
  }[];
  products: {
    element: ObjectId;
    amount: number;
  }[];
  total: number;
  paymethod: PayMethod;
  box: ObjectId;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  category: Category;
  price: number;
  provider: ObjectId;
  amount: number;
  image: Image;
}

export interface IMenu extends Document {
  name: string;
  description: string;
  category_Menu: CategoryMenu;
  price: number;
  image: Image;
}

export interface IProvider extends Document {
  name: string;
  lastname: string;
  nif_rif: number;
  address: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  contact: {
    contact_name: string;
    email: string;
    phone: number;
  };
  status: StatusProvider;
}

export interface IOrderProvider extends Document {
  order_number: number;
  date: Date;
  provider: ObjectId;
  products: {
    element: ObjectId;
    amount: number;
    unit_price: number;
  }[];
  total: number;
  box: ObjectId;
}

export interface ITransactions extends Document {
  type: transactionType;
  description: string;
  date: Date;
  total: number;
  boxCon: ObjectId;
}

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload
    }
  }
}
