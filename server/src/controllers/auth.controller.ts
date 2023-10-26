import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import { IUser } from '../../types';
import { Image } from '../../types';
import { uploadUser, deleteImage } from '../libs/cloudinary';
import fs from 'fs-extra';
import { UploadedFile } from 'express-fileupload';

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, lastname, password, email, role } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json({ message: 'The user is already in use' });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    let image!: Image;
    if (req.files?.image) {
      const file: UploadedFile = req.files?.image as UploadedFile;
      const result = await uploadUser(file.tempFilePath);
      await fs.remove(file.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const newUser: IUser = new User({
      name,
      lastname,
      email,
      password: passwordHash,
      image,
      role,
    });
    const userSaved = await newUser.save();

    res.json({
      id: userSaved._id,
      name: userSaved.name,
      lastname: userSaved.lastname,
      email: userSaved.email,
      image: userSaved.image,
      role: userSaved.role,
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (req.files?.image) {
      const file = req.files?.image as UploadedFile;
      const result = await uploadUser(file.tempFilePath);
      await deleteImage(user.image.public_id);
      await fs.remove(file.tempFilePath);
      req.body.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const userUpdated = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.json(userUpdated);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser)
      return res.status(404).json({ message: 'User not found' });

      if (deletedUser.image.public_id)
      await deleteImage(deletedUser.image.public_id);

    return res.json(deletedUser);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: 'The email does not exist',
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'The password is incorrect',
      });
    }

    res.json({
      id: userFound._id,
      name: userFound.name,
      lastname: userFound.lastname,
      email: userFound.email,
      image: userFound.image,
      role: userFound.role,
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

export { createUser, signin, getUsers, getUser, updateUser, deleteUser };
