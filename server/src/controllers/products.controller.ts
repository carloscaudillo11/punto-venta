import Product from "../models/product.model";
import { uploadImage, deleteImage } from "../libs/cloudinary";
import fs from "fs-extra";
import { UploadedFile } from "express-fileupload";
import { Request, Response } from "express";
import { image } from "../../types";

const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, category, price } = req.body;
    let img!: image;
    if (req.files?.image) {
      const file: UploadedFile = req.files?.image as UploadedFile;
      const result = await uploadImage(file.tempFilePath);
      await fs.remove(file.tempFilePath);
      img = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const newProduct = new Product({ name, description, category, price, img });
    const productSaved = await newProduct.save();
    return res.json(productSaved);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.files?.image) {
      const file: UploadedFile = req.files?.image as UploadedFile;
      const result = await uploadImage(file.tempFilePath);
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
    return res.status(500).json({ message: error });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    if (deletedProduct.image.public_id)
      await deleteImage(deletedProduct.image.public_id);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export { getProducts, createProduct, getProduct, updateProduct, deleteProduct };
