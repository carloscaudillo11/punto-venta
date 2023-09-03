import { JwtPayload } from "jsonwebtoken";
import { ObjectId, Document } from "mongoose";
import { Request } from "express";

type roles = "Employed" | "Admin"


export interface IUser extends Document {
  name: string;
  lastname: string;
  key: string;
  password: string;
  rol: roles;
}

type status = "pending" | "completed"

export interface IOrder extends Document {
  table: number;
  date: Date;
  order_type: string;
  details: ObjectId[];
  status: status;
  total: number;
}

type image = {
  url: string;
  public_id: string;
};

export interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  price: number;
  image: image;
}

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
