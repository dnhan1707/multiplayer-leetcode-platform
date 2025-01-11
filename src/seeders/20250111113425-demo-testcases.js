'use strict';

const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('testcases', [
      {
        test_id: uuidv4(),
        problem_id: "a9ba14bf-f113-405a-ab62-30f5ee61b1fa",
        expected_output: "[0, 1]",
        is_hidden: false,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id: "d8c8d277-9bc8-44e4-b932-ade3a399198f",
        expected_output: "[1, 2]",
        is_hidden: false,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id: "479c0efc-b5d9-48eb-8001-fbae1ed82894",
        expected_output: "[0, 1]",
        is_hidden: true,
        created_at: new Date(),
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('testcases', null, {});
  }
};
