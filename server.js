require("dotenv").config();
const { Client } = require("pg");
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//ROUTES//
//getAll todo
/* app.use("/", (req, res) => {
  res.send("yoooo");
  console.log("yoooooooooooos");
}); */

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query(
  "SELECT table_schema,table_name FROM information_schema.tables;",
  (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  }
);
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
