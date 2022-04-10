import jwt, { Secret, decode } from 'jsonwebtoken';
import config from '../config';
import { NextFunction, Response, Request } from 'express';
import HttpError from '../error/HttpError';
import IAuthUser from '../user/IAuthUser';
import { isUserExists } from '../user/userService';

export default async (req: Request, _res: Response, next: NextFunction) => {
  let token;
  const authHeader = req.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer')) {
    [, token] = authHeader.split(' ');
  }

  if (!token) {
    const err = new HttpError('No token found.');
    err.status = 401;
    return next(err);
  }

  const { username } = decode(token) as IAuthUser;
  if (!(await isUserExists(username))) {
    const error = new HttpError('This user no longer exists');
    error.status = 401;
    next(error);
  }

  try {
    req.body.user = jwt.verify(token, config.jwtSecret as Secret);
  } catch (e) {
    const error = new HttpError(e.message);
    error.status = 401;
    next(error);
  }

  next();
};
