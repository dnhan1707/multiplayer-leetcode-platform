'use strict';

const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('testcases', [
      {
        test_id: uuidv4(),
        problem_id: "5dbee3d8-a71b-4e4e-b606-7c7394b9b42c",
        input_data: "[[3, 2, 4], 9]",
        expected_output: "[1, 2]",
        is_hidden: false,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id: "9a66d3a0-d7dd-4fe6-a4df-798df6c46bba",
        input_data: "[[3, 3], 6]",
        expected_output: "[0, 1]",
        is_hidden: true,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id: "179f3211-c493-4216-acd4-5dc6a5b12c8c",
        input_data: "5,6",
        expected_output: "11",
        is_hidden: true,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id: "179f3211-c493-4216-acd4-5dc6a5b12c8c",
        input_data: "7,6",
        expected_output: "13",
        is_hidden: true,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id: "d80e0eab-11e9-47b1-9226-cf7d9e1ec373",
        input_data: "[[2, 7, 11, 15], 9]",
        expected_output: "[0, 1]",
        is_hidden: false,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id: "d80e0eab-11e9-47b1-9226-cf7d9e1ec373",
        input_data: "[[3, 2, 4], 6]",
        expected_output: "[1, 2]",
        is_hidden: true,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id: "d80e0eab-11e9-47b1-9226-cf7d9e1ec373",
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
