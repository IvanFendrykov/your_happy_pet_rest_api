require('dotenv').config();
const mongoose = require('mongoose');

const { DB_HOST } = process.env;

const connectMongoDB = async () => {
  mongoose.connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectMongoDB;
