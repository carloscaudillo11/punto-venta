import Order from "../models/order.model";
import Product from "../models/product.model";
import fs from "fs-extra";
import { Request, Response } from "express";

export const createBill = async (req: Request, res: Response) => {
  const { id } = req.body;
  // Aqui va el codigo que impime el ticket necesitamos la impresora termica. 
};
