require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const {
  addTodo,
  getAllTodo,
  getATodo,
  updateTodo,
  deleteTodo
} = require("./controller/todoController");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//ROUTES//
//getAll todo
/* app.use("/", (req, res) => {
  res.send("yoooo");
  console.log("yoooooooooooos");
}); */
app.get("/db", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM test_table");
    const results = { results: result ? result.rows : null };
    res.render("pages/db", results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});
app.get("/todos", async (req, res) => {
  const todo = await getAllTodo();
  res.status(200).json(todo);
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await getATodo(id);
  console.log("todo :>> ", todo);
  console.log("id :>> ", id);
  if (!todo) {
    res.status(404).send("the todo dont exist");
  } else {
    res.status(200).json(todo);
  }
});
//create todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await addTodo(description);
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
  }
});
//update a todo``
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateATodo = await updateTodo({ description }, id);
    res.status(200).json("todo was update");
  } catch (error) {
    console.log("error :>> ", error);
  }
});
//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteTodo(id);
    res.status(200).json("todo deleted");
  } catch (error) {
    console.log("error :>> ", error);
  }
});

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});

module.exports = app;
