import mongoose from 'mongoose';

module.exports = {
  connect: function (mode, callback) {
    let url = 'mongodb://localhost/new-SD';
    if (mode === 'test') {
      url = 'mongodb://localhost/new-SD-test';
    }
    mongoose.connect(url, callback);
  },
  close: function (callback) {
    mongoose.connection.close(callback);
  }
};
