import mongoose from 'mongoose';

export const connect = () => {
  mongoose.connect('mongodb://pr_data-store:27017/pr');
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', function () {
    // we're connected!
    console.log('Connected successfully to server');

    // the rest of your app code here
  });
};
