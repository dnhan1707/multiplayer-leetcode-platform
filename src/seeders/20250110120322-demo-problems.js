'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('problems', [
      // {
      //   problem_id: uuidv4(),
      //   title: "Two Sum",
      //   description: "<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>",
      //   difficulty_level: "easy",
      //   created_at: new Date(),
      // }, 
      // {
      //   problem_id: uuidv4(),
      //   title: "Remove Element",
      //   description: "<p>Given an integer array <code>nums</code> and an integer <code>val</code>, remove all occurrences of <code>val</code> in <code>nums</code> <a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\"><strong>in-place</strong></a>. The order of the elements may be changed. Then return <em>the number of elements in </em><code>nums</code><em> which are not equal to </em><code>val</code>.</p>",
      //   difficulty_level: "easy",
      //   created_at: new Date(),
      // },
      {
        problem_id: uuidv4(),
        title: "Contain Duplicate",
        description: "<p>Given an integer array <code>nums</code>, return <code><span>true</span></code> if any value appears <strong>more than once</strong> in the array, otherwise return <code><span>false</span></code>.</p>",
        difficulty_level: "easy",
        created_at: new Date(),
      }, 
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('problems', null, {});
  }
};