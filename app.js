const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");


const myPetRout = require("./routes/api/myPet");
const notiesRout = require("./routes/api/notices");
const ourFriendsRouter = require("./routes/api/ourFriends");
const newsRouter = require("./routes/api/news");
const registerRouter = require("./routes/api/users");
const login = require("./routes/api/users");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());


app.use('/api/ourfriends', ourFriendsRouter);
app.use('/api/auth', registerRouter);
app.use('/api/auth', login);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.use("/api/myPet", myPetRout);
app.use("/api/notices", notiesRout);



app.use('/api/ourfriends', ourFriendsRouter);
app.use('/api/news', newsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
