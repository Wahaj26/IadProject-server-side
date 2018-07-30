'use strict';
module.exports = (sequelize, DataTypes) => {
  var employee = sequelize.define('employee', {
    emp_name: DataTypes.STRING,
    emp_id: DataTypes.STRING,
    owner_id: DataTypes.STRING,
    proj_name: DataTypes.STRING,
    proj_id: DataTypes.STRING
  }, {});
  employee.associate = function(models) {
    // associations can be defined here
  };
  return employee;
};