import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "./user";
import { Problem } from "./problem";
import { Room } from "./room";
import { SubmissionResult } from "./submissionResult";

@Table({
    tableName: "submissions",
    timestamps: true,
    createdAt: "submitted_at",
    updatedAt: false
})
export class Submission extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        field: 'submission_id'
    })
    declare submission_id: string;

    @ForeignKey(() => Room)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: 'room_id'
    })
    declare room_id: string;

    @ForeignKey(() => Problem)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: 'problem_id'
    })
    declare problem_id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
        field: 'user_id'
    })
    declare user_id: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        field: 'code_content'
    })
    declare code_content: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        field: 'language'
    })
    declare language: string;

    @Column({
        type: DataType.ENUM('pending', 'running', 'completed', 'error'),
        defaultValue: 'pending',
        field: 'status'
    })
    declare status: string;

    @BelongsTo(() => Room)
    room!: Room;

    @BelongsTo(() => Problem)
    problem!: Problem;

    @BelongsTo(() => User)
    user!: User;

    @HasMany(() => SubmissionResult)
    results!: SubmissionResult[];
}