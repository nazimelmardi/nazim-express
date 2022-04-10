import { getByUsernameForLogin, addUser } from './userRepository';
import bcrypt from 'bcryptjs';
import HttpError from '../error/HttpError';
import generateAccessToken from '../jwt/generateAccessToken';
import IAuthUser from './IAuthUser';

export async function isUserExists(username: string) {
  const user = await getByUsernameForLogin(username);
  return !!user;
}

export async function login(username: string, enteredPassword: string) {
  let token = '';
  const user = await getByUsernameForLogin(username);
  if (!user) {
    throw new HttpError('Email is not recognized.');
  }

  const isMatch = await bcrypt.compare(enteredPassword, user.password);
  if (!isMatch) {
    throw new HttpError('Password is not correct');
  }

  if (user._id && user.username) {
    const authUser: IAuthUser = {
      id: user._id,
      username: user.username,
    };
    token = generateAccessToken(authUser);
  }

  return token;
}

export async function createUser(username: string, password: string) {
  return await addUser(username, password);
}
