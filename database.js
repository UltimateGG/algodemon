const mongoose = require('mongoose');
const db = mongoose.connection;


const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost/algodemon', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then((res, err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

db.on('open', () => console.log('Successfully connected to database'));

db.on('error', (e) => {
  console.error('MongoDB Error:', e);
  process.exit(1);
});

module.exports = {
  connectToDatabase
}
