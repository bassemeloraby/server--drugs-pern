const express = require("express");
const cors = require("cors");
const colors = require('colors');
const dotenv = require('dotenv').config();
const pool = require("./db");

const app = express();
const port = process.env.PORT || '5000';

//middleware
app.use(cors());
app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: false }));

//ROUTES//
//create name
app.post("/names", async (req, res) => {
  try {
    const { description } = req.body;
    const newName = await pool.query(
      "INSERT INTO name (description) VALUES($1) RETURNING *",
      [description])

      res.json(newName.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//get all names
app.get("/names", async (req, res) => {
  try {
    const allnames = await pool.query("SELECT * FROM name");
    res.json(allnames.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//get name by id
app.get("/names/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const name = await pool.query("SELECT * FROM name WHERE name_id = $1", [
      id
    ]);

    res.json(name.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//update name
app.put("/names/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateName = await pool.query(
      "UPDATE name SET description = $1 WHERE name_id = $2",
      [description, id]
    );

    res.json("Name was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete name by id
app.delete("/names/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteName = await pool.query("DELETE FROM name WHERE name_id = $1", [
      id
    ]);
    res.json("name was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

//test route
app.get('/', (req, res) => {
  res.send(`<h1>Hello World! . that is backend of drugs with PERN</h1>`);
});

  app.listen(port, (err) => {
    if (err) throw err;
    console.log('Server listening on port'.blue, port.yellow);
  });  