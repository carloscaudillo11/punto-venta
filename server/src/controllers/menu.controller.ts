import Menu from '../models/menu.model';
import { uploadImage, deleteImage } from '../libs/cloudinary';
import fs from 'fs-extra';
import { UploadedFile } from 'express-fileupload';
import { Request, Response } from 'express';
import { Image } from '../../types';

const getMenu = async (_req: Request, res: Response) => {
  try {
    const menu = await Menu.find();
    return res.json(menu);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const createMenuElement = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category_Menu } = req.body;
    let image!: Image;
    if (req.files?.image) {
      const file: UploadedFile = req.files?.image as UploadedFile;
      const result = await uploadImage(file.tempFilePath);
      await fs.remove(file.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const newMenuElement = new Menu({ name, description, price, image, category_Menu });
    const menuElementSaved = await newMenuElement.save();
    return res.json(menuElementSaved);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getMenuElement = async (req: Request, res: Response) => {
  try {
    const menuElement = await Menu.findById(req.params.id);
    if (!menuElement) return res.status(404).json({ message: 'Menu Element not found' });
    return res.json(menuElement);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const updateMenuElement = async (req: Request, res: Response) => {
  try {
    const menuElement = await Menu.findById(req.params.id);
    if (!menuElement) return res.status(404).json({ message: 'Product not found' });

    if (req.files?.image) {
      const file: UploadedFile = req.files?.image as UploadedFile;
      const result = await uploadImage(file.tempFilePath);
      await deleteImage(menuElement.image.public_id);
      await fs.remove(file.tempFilePath);
      req.body.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const updatedMenuElement = await Menu.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.json(updatedMenuElement);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const deleteMenuElement = async (req: Request, res: Response) => {
  try {
    const deletedMenuElement = await Menu.findByIdAndDelete(req.params.id);
    if (!deletedMenuElement)
      return res.status(404).json({ message: 'Product not found' });

    if (deletedMenuElement.image.public_id)
      await deleteImage(deletedMenuElement.image.public_id);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export { getMenu, createMenuElement, getMenuElement, updateMenuElement, deleteMenuElement };
