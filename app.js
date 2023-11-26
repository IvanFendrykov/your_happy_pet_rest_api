const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const app = express();



const myPetRout = require("./routes/api/pets/myPet");
const sellRout = require("./routes/api/pets/sellPet");
const lostFound = require("./routes/api/pets/lostFoundPet");
const goodHands = require("./routes/api/pets/inGoodHands");

const ourFriendsRouter = require('./routes/api/ourFriends');
const newsRouter = require("./routes/api/news");
const registerRouter = require('./routes/api/users');
const login = require("./routes/api/users");

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());


app.use('/api/ourfriends', ourFriendsRouter);
app.use('/api/auth', registerRouter);
app.use('/api/auth', login);




app.use("/api/myPet", myPetRout);
app.use("/api/petSale", sellRout);
app.use("/api/lostFound", lostFound);
app.use("/api/inGoodHands", goodHands);

app.use('/api/ourfriends', ourFriendsRouter);
app.use('/api/news', newsRouter);


app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
