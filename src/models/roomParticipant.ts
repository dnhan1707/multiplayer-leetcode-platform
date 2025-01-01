import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { User } from "./user";
import { Room } from "./room";

@Table({
    tableName: "room_participants",
    timestamps: true
})
export class RoomParticipant extends Model {
    @ForeignKey(() => Room)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "room_id"
    })
    declare room_id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "user_id"
    })
    declare user_id: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: "joined_at"
    })
    declare joined_at: Date;
}