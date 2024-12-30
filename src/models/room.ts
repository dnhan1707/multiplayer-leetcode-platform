import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user";

@Table({
    tableName: "rooms",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
})
export class Room extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        field: "room_id",
    })
    declare id: string;

    @Column({
        type: DataType.STRING(50),
        defaultValue: "testRoomCode",
        allowNull: false,
        unique: true,
        field: "room_code",
    })
    declare room_code: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        field: "created_by",
    })
    declare created_by: string;

    @BelongsTo(() => User)
    declare user: User;

    @Column({
        type: DataType.ENUM("waiting", "ready", "playing", "finished"),
        allowNull: false,
        field: "status",
    })
    declare status: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 2,
        allowNull: false,
        field: "max_players",
    })
    declare max_players: number;
}