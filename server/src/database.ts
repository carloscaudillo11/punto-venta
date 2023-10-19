import mongoose from 'mongoose';
import config from './config';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.ENV.MONGODB_URI);
  } catch (error) {
    console.error(error);
  }
};

mongoose.connection.on('connected', () => {
  console.log('Mongodb is connected to', mongoose.connection.db.databaseName);
});

export default connectDB;
