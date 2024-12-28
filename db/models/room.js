'use strict';
const { Model, Sequelize } = require('sequelize');
import { sequelize } from "../../config/database";
module.exports = sequelize.define('Room', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    room_id: {
      type: Sequelize.UUID
    },
    room_code: {
      type: Sequelize.STRING
    },
    room_link: {
      type: Sequelize.STRING
    },
    created_by: {
      type: Sequelize.UUID
    },
    status: {
      type: Sequelize.ENUM
    },
    max_players: {
      type: Sequelize.INTEGER
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at: {
      type: Sequelize.DATE
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    deletedAt: {
      type: Sequelize.DATE
    }
  }, {
    paranoid: true,
    modelName: 'Room',
    freezeTableName: true,
  }
)