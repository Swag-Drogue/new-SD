import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  password: String
});

const articleSchema = new Schema({
  author: String,
  title: String,
  paragraph: String,
  images: [String]
});

const User = mongoose.model('User', userSchema);
const Articles = mongoose.model('Articles', articleSchema);

export {
  User,
  Articles
};

