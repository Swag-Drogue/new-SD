import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  password: String
});
const User = mongoose.model('User', userSchema);

export {
  User
};

