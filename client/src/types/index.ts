type transactionType = 'Venta' | 'Gasto';
type PayMethod = 'Tarjeta' | 'Efectivo';
interface Image {
  url: string;
  public_id: string;
}

type Roles = 'User' | 'Admin';

export interface User {
  _id: number;
  name: string;
  email: string;
  image: {
    url: string;
    public_id: string;
  };
}

export interface Menu {
  _id: number;
  name: string;
  description: string;
  category_Menu: string;
  price: number;
  image: {
    url: string;
    public_id: string;
  };
}

export interface Products {
  _id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  provider: number;
  amount: number;
  image: {
    url: string;
    public_id: string;
  };
}

export interface Provider {
  _id: number;
  name: string;
  lastname: string;
  contact: {
    email: string;
    phone: number;
  };
  status: string;
}

export interface IUser {
  _id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  image: Image;
  role: Roles;
}

export interface Transaction {
  _id: number;
  type: transactionType;
  description: string;
  date: Date;
  total: number;
  boxCon: number;
  user: number;
}

export interface Order {
  _id: number;
  table: number | null;
  date: Date;
  products: Array<{
    element: number;
    amount: number;
  }>;
  total: number;
  paymethod: PayMethod;
  box: number;
  user: number;
}

export interface FormData {
  name: string;
  description: string;
  category_Menu: string;
  price: number;
  image: File | null;
}
