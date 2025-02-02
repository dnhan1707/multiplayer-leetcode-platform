'use strict';

const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('testcases', [
      {
        test_id: uuidv4(),
        problem_id: "0c6624da-db6c-41bb-a4e2-901e9ad2d3af",
        input_data: "[[3, 2, 4], 9]",
        expected_output: "[1, 2]",
        is_hidden: false,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id: "0c6624da-db6c-41bb-a4e2-901e9ad2d3af",
        input_data: "[[3, 3], 6]",
        expected_output: "[0, 1]",
        is_hidden: true,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id:"0c6624da-db6c-41bb-a4e2-901e9ad2d3af",
        input_data: "5,6",
        expected_output: "11",
        is_hidden: true,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id: "0c6624da-db6c-41bb-a4e2-901e9ad2d3af",
        input_data: "7,6",
        expected_output: "13",
        is_hidden: true,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id:"0c6624da-db6c-41bb-a4e2-901e9ad2d3af",
        input_data: "[[2, 7, 11, 15], 9]",
        expected_output: "[ 0, 1 ]\n",
        is_hidden: false,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id: "0c6624da-db6c-41bb-a4e2-901e9ad2d3af",
        input_data: "[[3, 2, 4], 6]",
        expected_output: "[ 1, 2 ]\n",
        is_hidden: true,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id: "0c6624da-db6c-41bb-a4e2-901e9ad2d3af",
        input_data: "[[3, 3], 6]",
        expected_output: "[ 0, 1 ]\n",
        is_hidden: true,
        created_at: new Date(),
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('testcases', null, {});
  }
};
