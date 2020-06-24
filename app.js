require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const data = require("./routes/data");
const product = require("./routes/product");
const order = require("./routes/order");
const user = require("./routes/user");

const auth = require("./routes/auth");


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'nviktous admin',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ url: process.env.DB_URL, dbName: 'adminSessions', ttl: 24 * 60 * 60 })
}));


app.use("/data", data);

app.use("/pro", product);

app.use("/order", order);

app.use("/user", user);

app.use("/auth", auth);


if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const dbConnection = mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});



app.listen(process.env.PORT || 4000, () => {
  console.log("Server started.");
});
