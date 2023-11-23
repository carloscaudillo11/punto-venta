type transactionType = 'Venta' | 'Gasto';

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

export interface Transactions extends Document {
  _id: number;
  type: transactionType;
  description: string;
  date: Date;
  total: number;
  boxCon: number;
  user: number;
}
