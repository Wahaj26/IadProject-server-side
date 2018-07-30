'use strict';
module.exports = (sequelize, DataTypes) => {
  var task = sequelize.define('task', {
    task: DataTypes.STRING,
    deadline: DataTypes.DATE,
    status: DataTypes.STRING,
    proj_id: DataTypes.STRING,
    emp_id: DataTypes.STRING,
    owner_id: DataTypes.STRING
  }, {});
  task.associate = function(models) {
    // associations can be defined here
  };
  return task;
};