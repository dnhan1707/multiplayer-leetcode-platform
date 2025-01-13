'use strict';

const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('testcases', [
      {
        test_id: uuidv4(),
        problem_id: "5031a283-4b2b-48fc-b07b-17fe4280c0fa",
        input_data: "[[2, 7, 11, 15], 9]",
        expected_output: "[0, 1]",
        is_hidden: false,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id: "4eac358d-c22d-4d5c-bbb9-bb2820d6e320",
        input_data: "[[3, 2, 4], 9]",
        expected_output: "[1, 2]",
        is_hidden: false,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id: "c8440fc3-ecc0-4811-a186-4ba4b35afc81",
        input_data: "[[3, 3], 6]",
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
