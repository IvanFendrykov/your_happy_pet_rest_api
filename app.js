const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const app = express();
const myPetRout = require("./routes/api/pet");

const ourFriendsRouter = require('./routes/api/ourFriends');

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());





// app.use();
app.use("/api/myPet", myPetRout);
app.use('/api/ourfriends', ourFriendsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
