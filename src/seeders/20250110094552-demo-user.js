'use strict';
const { v4: uuidv4 } = require("uuid")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        user_id: uuidv4(),
        username: 'jack',
        email: 'jack@gmail.com',
        password: '12345678',
        created_at: new Date()
      },
      {
        user_id: uuidv4(),
        username: 'jack1',
        email: 'jack1@gmail.com',
        password: '12345678',
        created_at: new Date()
      }
    ])
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  }
};
