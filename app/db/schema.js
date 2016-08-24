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
const Article = mongoose.model('Article', articleSchema);

export {
  User,
  Article
};

