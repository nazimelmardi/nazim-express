import { Schema, model, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import IUser from './IUser';

const UserSchema = new Schema({
  username: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// new user's password is automatically hashed before it will be saved into the database
UserSchema.pre('save', async function(next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User: Model<IUser> = model('User', UserSchema);

export default User;
