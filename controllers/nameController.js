const pool = require("../db");

const asyncHandler = require("express-async-handler");
//create name
const setNames = asyncHandler(async (req, res) => {
  const { description } = req.body;
    const newName = await pool.query(
      "INSERT INTO name (description) VALUES($1) RETURNING *",
      [description])

      res.json(newName.rows[0]);
});

//get all names
const getNames = asyncHandler(async (req, res) => {
  const allnames = await pool.query("SELECT * FROM name");
  res.json(allnames.rows);
});

//get name by id
const getOneName = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const name = await pool.query("SELECT * FROM name WHERE name_id = $1", [
    id
  ]);

  res.json(name.rows[0]);
})

//update name by id

const updateName = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const updatedName = await pool.query(
    "UPDATE name SET description = $1 WHERE name_id = $2",
    [description, id]
  );

  res.json("Name was updated!");
});

//delete name by id

const deleteName = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedName = await pool.query(
    "DELETE FROM name WHERE name_id = $1",
    [id]
  );

  res.json("name was deleted!");
});

module.exports = {
  setNames,
  getNames,
  getOneName,
  updateName,
  deleteName
};
