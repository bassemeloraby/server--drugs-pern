const express = require("express");
const cors = require("cors");
const colors = require('colors');
const dotenv = require('dotenv').config();
const pool = require("./db");

const app = express();
const port = process.env.PORT || '5000';
const router = express.Router();

//middleware
app.use(cors());
app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: false }));

//ROUTES//
app.use('/api/names', require('./routes/nameRoutes'));

//test route
app.get('/', (req, res) => {
  res.send(`<h1>Hello World! . that is backend of drugs with PERN</h1>`);
});

  app.listen(port, (err) => {
    if (err) throw err;
    console.log('Server listening on port'.blue, port.yellow);
  });  