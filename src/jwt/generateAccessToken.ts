import { sign, Secret } from 'jsonwebtoken';
import config from '../config';
import IAuthUser from '../user/IAuthUser';

export default function generateAccessToken(user: IAuthUser): string {
  return sign(user, config.jwtSecret as Secret, { expiresIn: config.jwtExpire });
}
