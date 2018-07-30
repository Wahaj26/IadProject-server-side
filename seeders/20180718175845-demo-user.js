'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('userModels', [{
        id:1,
        createdAt:'2018-07-16 12:44:00.9690000 +00:00',
        updatedAt:'2018-07-16 12:44:00.9690000 +00:00'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('userModels', null, {});
  }
};
