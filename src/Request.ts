import { JwtPayload } from 'jsonwebtoken';

export default class MyRequest extends Request {
  user: string | JwtPayload = '';
}
