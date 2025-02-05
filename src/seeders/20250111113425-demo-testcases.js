'use strict';

const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('testcases', [
      {
        test_id: uuidv4(),
        problem_id: "6257d43d-ef6d-4247-b57d-95a1c792a0e6",
        input_data: "[[2, 7, 11, 15], 9]",
        expected_output: "[ 0, 1 ]\n",
        is_hidden: false,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id: "6257d43d-ef6d-4247-b57d-95a1c792a0e6",
        input_data: "[[3, 2, 4], 6]",
        expected_output: "[ 1, 2 ]\n",
        is_hidden: true,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id: "e69d849f-8173-44ab-9d03-4f8b05ef6276",
        input_data: "[[3,2,2,3], 3]",
        expected_output: "2\n",
        is_hidden: true,
        created_at: new Date(),
      }, 
      {
        test_id: uuidv4(),
        problem_id: "e69d849f-8173-44ab-9d03-4f8b05ef6276",
        input_data: "[[0, 1, 2, 2, 3, 0, 4, 2], 2]",
        expected_output: "5\n",
        is_hidden: true,
        created_at: new Date(),
      }, 
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('testcases', null, {});
  }
};
