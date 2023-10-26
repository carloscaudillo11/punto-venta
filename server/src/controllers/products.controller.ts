import Product from '../models/product.model';
import { Request, Response } from 'express';
import { uploadProduct, deleteImage } from '../libs/cloudinary';
import fs from 'fs-extra';
import { UploadedFile } from 'express-fileupload';
import { Image } from '../../types';

const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find().populate('provider');
    return res.json(products);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, category, price, provider, amount } = req.body;
    let image!: Image;
    if (req.files?.image) {
      const file: UploadedFile = req.files?.image as UploadedFile;
      const result = await uploadProduct(file.tempFilePath);
      await fs.remove(file.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const newProduct = new Product({
      name,
      description,
      category,
      price,
      provider,
      amount,
      image,
    });
    const productSaved = await newProduct.save();
    return res.json(productSaved);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate('provider');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json(product);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (req.files?.image) {
      const file = req.files?.image as UploadedFile;
      const result = await uploadProduct(file.tempFilePath);
      await deleteImage(product.image.public_id);
      await fs.remove(file.tempFilePath);
      req.body.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.json(updatedProduct);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: 'Product not found' });

    if (deletedProduct.image.public_id)
      await deleteImage(deletedProduct.image.public_id);

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const verifyStock = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find().populate('provider');
    const results = products.filter((product) => {
      product.amount < 50;
    });
    return res.json(results);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

export {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  verifyStock,
};
