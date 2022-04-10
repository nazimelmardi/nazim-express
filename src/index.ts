import logger from './logger';
import app from './app';
import config from './config';
import connectDB from './db';

const PORT = config.port || 8080;

connectDB();

app.listen(PORT, () => {
  logger.info(`App is listening on ${PORT}`);
});
