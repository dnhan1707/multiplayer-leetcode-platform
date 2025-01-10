import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Room } from "./room";
import { Problem } from "./problem";

@Table({
    tableName: "room_problems",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
})


export class RoomProblem extends Model{

    @ForeignKey(() => Room)
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        field:"room_id"
    })
    declare room_id: string


    @ForeignKey(() => Problem)
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        field: "problem_id"
    })
    declare problem_id: string
}   
