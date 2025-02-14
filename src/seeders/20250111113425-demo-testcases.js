'use strict';

const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('testcases', [
      // Two Sum
      {
        test_id: uuidv4(),
        problem_id: "c93d2f45-1f43-42a1-856f-e23cb2873df7",
        input_data: "[[2, 7, 11, 15], 9]",
        expected_output: "[ 0, 1 ]\n",
        is_hidden: false,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id: "c93d2f45-1f43-42a1-856f-e23cb2873df7",
        input_data: "[[3, 2, 4], 6]",
        expected_output: "[ 1, 2 ]\n",
        is_hidden: true,
        created_at: new Date(),
      },
      // Remove Element
      {
        test_id: uuidv4(),
        problem_id: "050b7cb8-5ee9-4c44-aeb8-c96c318efab4",
        input_data: "[[3,2,2,3], 3]",
        expected_output: "2\n",
        is_hidden: true,
        created_at: new Date(),
      }, 
      {
        test_id: uuidv4(),
        problem_id: "050b7cb8-5ee9-4c44-aeb8-c96c318efab4",
        input_data: "[[0, 1, 2, 2, 3, 0, 4, 2], 2]",
        expected_output: "5\n",
        is_hidden: true,
        created_at: new Date(),
      }, 
      //Contain Duplicate
      {
        test_id: uuidv4(),
        problem_id: "9ad8504a-0e04-47dc-84fb-335b4d8c904f",
        input_data: "[[1, 2, 3, 3]]",
        expected_output: "true\n",
        is_hidden: false,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id: "9ad8504a-0e04-47dc-84fb-335b4d8c904f",
        input_data: "[[1, 2, 3, 4]]",
        expected_output: "false\n",
        is_hidden: false,
        created_at: new Date(),
      },
      // Valid Anagram
      {
        test_id: uuidv4(),
        problem_id: "6e422b83-663c-4880-af52-8ee395515b47",
        input_data: "[anagram, nagaram]",
        expected_output: "true\n",
        is_hidden: false,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id: "6e422b83-663c-4880-af52-8ee395515b47",
        input_data: "[rat, car]",
        expected_output: "false\n",
        is_hidden: false,
        created_at: new Date(),
      },
      // Group Anagram
      {
        test_id: uuidv4(),
        problem_id: "79e124d3-fa46-442b-b818-5495b9056513",
        input_data: `[["eat","tea","tan","ate","nat","bat"]]`,
        expected_output: `[["bat"],["nat","tan"],["ate","eat","tea"]]\n`,
        is_hidden: false,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id: "79e124d3-fa46-442b-b818-5495b9056513",
        input_data: `[[""]]`,
        expected_output: `[[""]]\n`,
        is_hidden: false,
        created_at: new Date(),
      },
      {
        test_id: uuidv4(),
        problem_id: "79e124d3-fa46-442b-b818-5495b9056513",
        input_data: `[["a"]]`,
        expected_output: `[["a"]]\n`,
        is_hidden: false,
        created_at: new Date(),
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('testcases', null, {});
  }
};
