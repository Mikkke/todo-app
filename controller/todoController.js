const { Todo } = require("../models");
const { v4: uuidv4 } = require("uuid");

const todoController = {
  addTodo: async description => {
    const newTodo = { uuidv4, description };
    const todoCreate = await Todo.create(newTodo);
    return todoCreate;
  },
  getAllTodo: async () => {
    const todo = await Todo.findAll({
      order: [["createdAt", "DESC"]],
      attributes: ["id", "description"],
      raw: true
    });
    return todo;
  },
  getATodo: async id => {
    const todo = await Todo.findByPk(id, {
      attributes: ["id", "description"],
      raw: true
    });
    return todo;
  },
  updateATodo: async (todoId, description) => {
    /* const [, affectedRow] = await Todo.update(data, {
      where: { id: todoId },
      returning: true,
      plain: true
    });
    const { description } = affectedRow;
    const updateData = { description };
    return updateData; */

    const todo = await Todo.update(id, description, {
      where: { id: todoId },
      returning: true,
      plain: true
    });
    return todo;
  },
  deleteTodo: async id => {
    const todo = await Todo.findOne({ where: { id } });
    if (todo) await todo.destroy();
  },
  updateTodo: async (updates, id) => {
    await Todo.update(updates, { where: { id } });
  }
};

module.exports = todoController;
