import logger from '../logger';
import { NextFunction, Request, Response } from 'express';
import HttpError from '../error/HttpError';

export default (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
  logger.error(`${err.status || 500} - ${err.name}: ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(err.status || 500);
  res.json({
    message:
      req.app.get('env') === 'development' || req.app.get('env') === 'test'
        ? `${err.name}: ${err.message}`
        : 'Unknown error happened',
  });
  next();
};
