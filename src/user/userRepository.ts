import User from './userModel';
import IUser from './IUser';

export async function getByUsernameForLogin(userName: string) {
  const user: IUser | null = await User.findOne({ username: userName }).select('+password');
  return user;
}

export async function addUser(username: string, password: string) {
  const result = await User.create({
    username,
    password,
  });
  return result._id;
}
