import { v2 as cloudinary } from 'cloudinary';
import config from '../config';

cloudinary.config({
  cloud_name: config.ENV.CLOUD_NAME,
  api_key: config.ENV.API_KEY,
  api_secret: config.ENV.API_SECRET,
});

export const uploadImage = async (filePath: string) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'dishes',
  });
};

export const updateImage = async (tofilePath: string, filePath: string) => {
  return await cloudinary.uploader.rename(filePath, tofilePath);
};

export const deleteImage = async (id: string) => {
  return await cloudinary.uploader.destroy(id);
};
