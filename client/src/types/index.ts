type transactionType = 'Venta' | 'Gasto';
type PayMethod = 'Tarjeta' | 'Efectivo';

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
