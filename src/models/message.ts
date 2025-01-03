import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { User } from "./user";
import { Room } from "./room";

@Table({
    tableName: "messages",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
})
export class Message extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        field: "message_id",
    })
    declare id: string;

    @ForeignKey(() => Room)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "room_id",
    })
    declare room_id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: "user_id",
    })
    declare user_id: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        field: "message_content",
    })
    declare message_content: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        field: "sent_at",
    })
    declare sent_at: Date;
}