const express = require("express");
const cors = require("cors");
const colors = require('colors');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || '5000';

//middleware
app.use(cors());
app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: false }));




  app.listen(port, (err) => {
    if (err) throw err;
    console.log('Server listening on port'.blue, port.yellow);
  });  