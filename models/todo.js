"use strict";
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      description: DataTypes.STRING
    },
    {}
  );
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};
