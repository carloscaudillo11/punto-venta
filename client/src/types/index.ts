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

export interface FormData {
  name: string;
  description: string;
  category_Menu: string;
  price: number;
  image: File | null;
}
