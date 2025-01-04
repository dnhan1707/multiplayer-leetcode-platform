import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user";
import { Room } from "../models/room";
import { RoomParticipant } from "../models/roomParticipant";
import { Message } from "../models/message";

dotenv.config();

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: parseInt(process.env.POSTGRES_PORT || "5433"),
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "",
  database: process.env.POSTGRES_DB || "postgres" ,
  models: [User, Room, RoomParticipant, Message],
  // logging: process.env.NODE_ENV === "development",
  logging: false,
});

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};
