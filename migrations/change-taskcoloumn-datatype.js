'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.changeColumn('tasks', 'task', {
            type: Sequelize.TEXT('MAX')

        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface
            .changeColumn('tasks', 'task', {
                type: Sequelize.STRING
            });
    }
}


