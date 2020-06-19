require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');


const data = require("./routes/data");
const product = require("./routes/product");


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));


app.use("/data", data);

app.use("/product", product);


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
