'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('problems', [
      {
        problem_id: uuidv4(),
        title: "Two Sum",
        description: "<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>",
        difficulty_level: "easy",
        created_at: new Date(),
      },
      {
        problem_id: uuidv4(),
        title: "Two Sum 2",
        description: "<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>",
        difficulty_level: "medium",
        created_at: new Date(),
      },
      {
        problem_id: uuidv4(),
        title: "Two Sum 3",
        description: "<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>",
        difficulty_level: "hard",
        created_at: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('problems', null, {});
  }
};