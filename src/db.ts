import mongoose, { ConnectOptions } from 'mongoose';
import logger from './logger';
import config from './config';

const uri = config.mongoURI;

const connectDB = async () => {
  try {
    if (uri !== undefined) {
      const db = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
      logger.info(`MongoDB Connected: ${db.connection.host} ${db.connection.port}`);
    }
  } catch (err) {
    logger.error(`Mongoose error on start: ${err.message}`);
    process.exit(1);
  }
  mongoose.connection.on('error', err => {
    // mongoose will attempt to reconnect
    throw new Error(`Mongoose connection error: ${err.message}`);
  });
};

export default connectDB;
